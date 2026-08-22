import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { provideHttpClient, HTTP_INTERCEPTORS, withInterceptorsFromDi } from '@angular/common/http';
import { CommonModule } from '@angular/common';

// Routing
import { AppRoutingModule } from './app-routing-module';

// Root
import { App } from './app';

// Interceptor
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

// Components
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ToastComponent } from './shared/components/toast/toast.component';
import { ProductCardComponent } from './shared/components/product-card/product-card.component';
import { ThemeToggleComponent } from './shared/components/theme-toggle/theme-toggle.component';

// Features
import { RegisterComponent } from './features/auth/register/register.component';
import { LoginComponent } from './features/auth/login/login.component';
import { VerifyEmailComponent } from './features/auth/verify-email/verify-email.component';
import { HomeComponent } from './features/home/home.component';
import { ProductsComponent } from './features/products/products.component';
import { ProductDetailComponent } from './features/products/product-detail/product-detail.component';
import { CartComponent } from './features/cart/cart.component';
import { OrdersComponent } from './features/orders/orders.component';

// Admin
import { AdminComponent } from './features/admin/admin.component';
import { AdminOverviewComponent } from './features/admin/admin-overview/admin-overview.component';
import { AdminProductsComponent } from './features/admin/admin-products/admin-products.component';
import { AdminCategoriesComponent } from './features/admin/admin-categories/admin-categories.component';
import { AdminUsersComponent } from './features/admin/admin-users/admin-users.component';
import { AdminOrdersComponent } from './features/admin/admin-orders/admin-orders.component';

@NgModule({
  declarations: [
    App,
    NavbarComponent,
    ToastComponent,
    ProductCardComponent,
    RegisterComponent,
    LoginComponent,
    VerifyEmailComponent,
    HomeComponent,
    ProductsComponent,
    ProductDetailComponent,
    CartComponent,
    OrdersComponent,
    AdminComponent,
    AdminOverviewComponent,
    AdminProductsComponent,
    AdminCategoriesComponent,
    AdminUsersComponent,
    AdminOrdersComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    ThemeToggleComponent
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [App]
})
export class AppModule {}
