import { Component, OnInit } from '@angular/core';
import { OrderService, Order } from '../../../core/services/order.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-admin-orders',
  standalone: false,
  templateUrl: './admin-orders.component.html',
  styleUrl: './admin-orders.component.css'
})
export class AdminOrdersComponent implements OnInit {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  isLoading = true;
  searchQuery = '';
  selectedStatusFilter = 'all';

  selectedOrder: Order | null = null;

  statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

  constructor(private orderService: OrderService, private toast: ToastService) {}

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe({
      next: (res) => {
        this.orders = res.data ?? [];
        this.applyFilter();
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  applyFilter(): void {
    let result = [...this.orders];

    if (this.selectedStatusFilter !== 'all') {
      result = result.filter((o) => o.status === this.selectedStatusFilter);
    }

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase().trim();
      result = result.filter(
        (o) =>
          o.uuid?.toLowerCase().includes(q) ||
          o.user?.FirstName?.toLowerCase().includes(q) ||
          o.user?.LastName?.toLowerCase().includes(q) ||
          o.user?.email?.toLowerCase().includes(q) ||
          o.shippingAddress?.phone?.toLowerCase().includes(q) ||
          o.shippingAddress?.city?.toLowerCase().includes(q)
      );
    }

    this.filteredOrders = result;
  }

  updateStatus(order: Order, newStatus: string): void {
    if (!newStatus || newStatus === order.status) return;

    this.orderService.updateStatus(order.uuid, newStatus).subscribe({
      next: (res) => {
        if (res.data) {
          order.status = res.data.status;
          order.deliveredAt = res.data.deliveredAt;
          if (this.selectedOrder && this.selectedOrder.uuid === order.uuid) {
            this.selectedOrder.status = res.data.status;
            this.selectedOrder.deliveredAt = res.data.deliveredAt;
          }
        }
        this.toast.show(`Order #${order.uuid.slice(0, 8)} status updated to ${newStatus}`, 'success');
        this.applyFilter();
      },
      error: (err) => {
        this.toast.show(err.error?.message || 'Failed to update status', 'error');
      }
    });
  }

  openOrderDetail(order: Order): void {
    this.selectedOrder = order;
  }

  closeOrderDetail(): void {
    this.selectedOrder = null;
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

  getItemImage(item: any): string {
    if (item.product?.images?.[0]?.url) return item.product.images[0].url;
    if (typeof item.product === 'object' && item.product?.images?.[0]) return item.product.images[0];
    return 'assets/placeholder.png';
  }

  getItemName(item: any): string {
    if (item.product?.name) return item.product.name;
    return 'Product';
  }
}
