import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService, Cart } from '../../core/services/cart.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cart: Cart | null = null;
  isLoading = true;
  isCheckingOut = false;

  shippingAddress = {
    street: '',
    city: '',
    country: '',
    postalCode: '',
  };

  paymentMethod = 'cash';
  showCheckoutForm = false;

  constructor(
    private cartService: CartService,
    private toast: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe((cart) => {
      this.cart = cart;
      if (cart) this.isLoading = false;
    });

    this.cartService.loadCart().subscribe({
      next: (res) => {
        this.cart = res.data ?? null;
        this.isLoading = false;
      },
      error: () => (this.isLoading = false),
    });
  }

  updateQuantity(itemId: string, qty: number): void {
    this.cartService.updateItem(itemId, qty).subscribe({
      error: () => this.toast.show('Failed to update quantity', 'error'),
    });
  }

  removeItem(itemId: string): void {
    this.cartService.removeItem(itemId).subscribe({
      next: () => this.toast.show('Item removed', 'success'),
      error: () => this.toast.show('Failed to remove item', 'error'),
    });
  }

  checkout(): void {
    if (!this.shippingAddress.street || !this.shippingAddress.city) {
      this.toast.show('Please fill in all shipping details', 'error');
      return;
    }
    this.isCheckingOut = true;
    this.cartService.checkout(this.shippingAddress, this.paymentMethod).subscribe({
      next: () => {
        this.toast.show('Order placed successfully! 🎉', 'success');
        this.isCheckingOut = false;
        this.showCheckoutForm = false;
        this.router.navigate(['/orders']);
      },
      error: () => {
        this.toast.show('Failed to place order', 'error');
        this.isCheckingOut = false;
      },
    });
  }

  get totalItems(): number {
    return this.cart?.items.reduce((s, i) => s + i.quantity, 0) ?? 0;
  }

  getItemName(item: any): string {
    if (typeof item.product === 'object' && item.product?.name) {
      return item.product.name;
    }
    return 'Item';
  }

  getItemImage(item: any): string {
    if (typeof item.product === 'object' && item.product?.images?.[0]?.url) {
      return item.product.images[0].url;
    }
    return 'assets/placeholder.png';
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="400" height="400" fill="%231a1a2e"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%236495ed" font-family="sans-serif" font-size="20">ShopWave</text></svg>';
  }
}
