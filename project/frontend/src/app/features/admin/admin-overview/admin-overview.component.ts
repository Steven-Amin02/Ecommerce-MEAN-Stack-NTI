import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductService, Product } from '../../../core/services/product.service';
import { OrderService, Order } from '../../../core/services/order.service';
import { UserService } from '../../../core/services/user.service';
import { CategoryService } from '../../../core/services/category.service';
import { User } from '../../../core/services/auth.service';

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
  categoriesCount = 0;

  totalRevenue = 0;
  pendingOrdersCount = 0;
  lowStockProducts: Product[] = [];
  recentOrders: Order[] = [];

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private userService: UserService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;

    // Load products
    this.productService.getAll().subscribe({
      next: (res) => {
        this.products = res.data ?? [];
        this.lowStockProducts = this.products.filter((p) => p.stock < 5);
        this.checkLoading();
      },
      error: () => this.checkLoading()
    });

    // Load orders
    this.orderService.getAllOrders().subscribe({
      next: (res) => {
        this.orders = res.data ?? [];
        this.recentOrders = this.orders.slice(0, 5);
        this.pendingOrdersCount = this.orders.filter((o) => o.status === 'pending' || o.status === 'processing').length;
        this.totalRevenue = this.orders
          .filter((o) => o.status !== 'cancelled')
          .reduce((sum, o) => sum + (o.totalPrice || 0), 0);
        this.checkLoading();
      },
      error: () => this.checkLoading()
    });

    // Load users
    this.userService.getAll().subscribe({
      next: (res) => {
        this.users = res.data ?? [];
        this.checkLoading();
      },
      error: () => this.checkLoading()
    });

    // Load categories count
    this.categoryService.getAll().subscribe({
      next: (res) => {
        this.categoriesCount = res.data?.length ?? 0;
      }
    });
  }

  private loadedCount = 0;
  private checkLoading(): void {
    this.loadedCount++;
    if (this.loadedCount >= 3) {
      this.isLoading = false;
    }
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
