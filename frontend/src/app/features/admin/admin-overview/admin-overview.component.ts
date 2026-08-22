import { Component, EventEmitter, NgZone, OnInit, Output } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { ProductService, Product } from '../../../core/services/product.service';
import { OrderService, Order } from '../../../core/services/order.service';
import { UserService } from '../../../core/services/user.service';
import { CategoryService, Category } from '../../../core/services/category.service';
import { User } from '../../../core/services/auth.service';

export interface DailyRevenueData {
  dayLabel: string;
  dateStr: string;
  revenue: number;
  ordersCount: number;
  x: number;
  y: number;
}

export interface CategoryMetric {
  name: string;
  count: number;
  revenue: number;
  percentage: number;
}

export interface OrderStatusDistribution {
  status: string;
  label: string;
  count: number;
  percentage: number;
  color: string;
}

@Component({
  selector: 'app-admin-overview',
  standalone: false,
  templateUrl: './admin-overview.component.html',
  styleUrl: './admin-overview.component.css'
})
export class AdminOverviewComponent implements OnInit {
  @Output() navigateTab = new EventEmitter<string>();

  isLoading = true;
  products: Product[] = [];
  orders: Order[] = [];
  users: User[] = [];
  categories: Category[] = [];
  categoriesCount = 0;

  totalRevenue = 0;
  pendingOrdersCount = 0;
  lowStockProducts: Product[] = [];
  recentOrders: Order[] = [];

  // Tech Lead Analytics State
  dailyRevenueList: DailyRevenueData[] = [];
  svgLinePath = '';
  svgAreaPath = '';
  maxDailyRevenue = 100;
  hoveredDataPoint: DailyRevenueData | null = null;

  orderStatusDist: OrderStatusDistribution[] = [];
  topCategories: CategoryMetric[] = [];
  isRestockingMap: Record<string, boolean> = {};

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private userService: UserService,
    private categoryService: CategoryService,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;

    // Hard safety net — NgZone.run ensures Angular CD picks up the change
    const safetyTimer = setTimeout(() => {
      this.zone.run(() => {
        if (this.isLoading) {
          this.isLoading = false;
        }
      });
    }, 3000);

    // take(1) ensures each HTTP observable completes exactly once for forkJoin
    forkJoin({
      products: this.productService.getAll().pipe(take(1), catchError(() => of({ data: [] as Product[], success: false }))),
      orders: this.orderService.getAllOrders().pipe(take(1), catchError(() => of({ data: [] as Order[], success: false }))),
      users: this.userService.getAll().pipe(take(1), catchError(() => of({ data: [] as User[], success: false }))),
      categories: this.categoryService.getAll().pipe(take(1), catchError(() => of({ data: [] as Category[], success: false })))
    }).subscribe({
      next: (results) => {
        clearTimeout(safetyTimer);

        this.products = (results.products as any)?.data ?? [];
        this.lowStockProducts = this.products.filter((p) => (p.stock ?? 0) < 5);

        this.orders = (results.orders as any)?.data ?? [];
        this.recentOrders = this.orders.slice(0, 5);
        this.pendingOrdersCount = this.orders.filter(
          (o) => o.status === 'pending' || o.status === 'processing'
        ).length;
        this.totalRevenue = this.orders
          .filter((o) => o.status !== 'cancelled')
          .reduce((sum, o) => sum + (o.totalPrice || 0), 0);

        this.users = (results.users as any)?.data ?? [];

        this.categories = (results.categories as any)?.data ?? [];
        this.categoriesCount = this.categories.length;

        this.computeRevenueTrends();
        this.computeOrderStatusDistribution();
        this.computeCategoryMetrics();

        // Guaranteed inside zone
        this.zone.run(() => {
          this.isLoading = false;
        });
      },
      error: (err) => {
        clearTimeout(safetyTimer);
        console.error('Admin overview load error:', err);
        this.zone.run(() => {
          this.isLoading = false;
        });
      }
    });
  }

  /** Calculate last 7 days revenue curve and generate smooth SVG chart paths */
  private computeRevenueTrends(): void {
    const days: DailyRevenueData[] = [];
    const now = new Date();

    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayLabel = d.toLocaleDateString('en-US', { weekday: 'short' });

      // Match orders for this day
      const dayOrders = this.orders.filter((o) => {
        if (!o.createdAt || o.status === 'cancelled') return false;
        return o.createdAt.startsWith(dateStr);
      });

      const revenue = dayOrders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);
      days.push({
        dayLabel,
        dateStr,
        revenue,
        ordersCount: dayOrders.length,
        x: 0,
        y: 0
      });
    }

    // Determine Y max
    const maxRev = Math.max(...days.map((d) => d.revenue), 100);
    this.maxDailyRevenue = Math.ceil(maxRev * 1.15); // Add 15% headroom

    // Calculate SVG coordinate points (Width: 600, Height: 200, PaddingX: 45, PaddingBottom: 45, PaddingTop: 20)
    const svgWidth = 600;
    const svgHeight = 200;
    const paddingX = 45;
    const paddingTop = 20;
    const paddingBottom = 45;
    const usableW = svgWidth - paddingX * 2;
    const usableH = svgHeight - paddingTop - paddingBottom;
    const baselineY = svgHeight - paddingBottom; // 155

    days.forEach((item, idx) => {
      item.x = paddingX + (idx / 6) * usableW;
      const normalizedRatio = item.revenue / this.maxDailyRevenue;
      item.y = baselineY - normalizedRatio * usableH;
    });

    this.dailyRevenueList = days;

    // Generate SVG path strings
    if (days.length > 0) {
      let linePath = `M ${days[0].x} ${days[0].y}`;
      for (let i = 1; i < days.length; i++) {
        // Cubic bezier smoothing
        const prev = days[i - 1];
        const curr = days[i];
        const cp1x = prev.x + (curr.x - prev.x) / 2;
        const cp1y = prev.y;
        const cp2x = prev.x + (curr.x - prev.x) / 2;
        const cp2y = curr.y;
        linePath += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
      }
      this.svgLinePath = linePath;

      const lastX = days[days.length - 1].x;
      const firstX = days[0].x;
      this.svgAreaPath = `${linePath} L ${lastX} ${baselineY} L ${firstX} ${baselineY} Z`;
    }
  }

  /** Compute order status breakdown percentages for visualization */
  private computeOrderStatusDistribution(): void {
    const statuses = [
      { status: 'delivered', label: 'Delivered', color: '#10b981' },
      { status: 'processing', label: 'Processing', color: '#3b82f6' },
      { status: 'pending', label: 'Pending', color: '#f59e0b' },
      { status: 'shipped', label: 'Shipped', color: '#8b5cf6' },
      { status: 'cancelled', label: 'Cancelled', color: '#f43f5e' }
    ];

    const total = this.orders.length || 1;
    this.orderStatusDist = statuses.map((s) => {
      const count = this.orders.filter((o) => o.status === s.status).length;
      return {
        ...s,
        count,
        percentage: Math.round((count / total) * 100)
      };
    }).filter((s) => s.count > 0 || total === 1);
  }

  /** Compute revenue breakdown per category */
  private computeCategoryMetrics(): void {
    if (this.categories.length === 0 || this.products.length === 0) return;

    const catMap = new Map<string, { name: string; count: number; revenue: number }>();
    this.categories.forEach((cat) => {
      catMap.set(cat._id || cat.uuid, { name: cat.name, count: 0, revenue: 0 });
    });

    this.products.forEach((p) => {
      const catObj = p.category;
      const catId = typeof catObj === 'object' ? catObj?._id || catObj?.uuid : catObj;
      if (catId && catMap.has(catId)) {
        const item = catMap.get(catId)!;
        item.count += 1;
        item.revenue += (p.price || 0) * (p.stock > 0 ? 5 : 1); // Estimated contribution
      }
    });

    const totalCatRevenue = Array.from(catMap.values()).reduce((sum, c) => sum + c.revenue, 0) || 1;

    this.topCategories = Array.from(catMap.values())
      .map((c) => ({
        name: c.name,
        count: c.count,
        revenue: c.revenue,
        percentage: Math.round((c.revenue / totalCatRevenue) * 100)
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }

  /** Tech Lead Action: Inline Quick Restock for Low Stock items */
  quickRestock(product: Product, addAmount: number = 10): void {
    if (!product.uuid || this.isRestockingMap[product.uuid]) return;

    this.isRestockingMap[product.uuid] = true;
    const updatedStock = (product.stock ?? 0) + addAmount;

    this.productService.update(product.uuid, { stock: updatedStock }).subscribe({
      next: () => {
        product.stock = updatedStock;
        this.lowStockProducts = this.products.filter((p) => (p.stock ?? 0) < 5);
        this.isRestockingMap[product.uuid] = false;
      },
      error: () => {
        this.isRestockingMap[product.uuid] = false;
      }
    });
  }

  goToTab(tab: string): void {
    this.navigateTab.emit(tab);
  }

  getStatusColor(status: string): string {
    const map: Record<string, string> = {
      pending: 'var(--color-warning)',
      processing: '#3b82f6',
      shipped: '#8b5cf6',
      delivered: 'var(--color-success)',
      cancelled: 'var(--color-error)'
    };
    return map[status] || '#9ca3af';
  }
}

