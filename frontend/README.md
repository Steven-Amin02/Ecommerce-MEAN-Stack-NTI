# 🎨 ShopWave Frontend — Angular 22 E-Commerce Storefront & Admin Portal

[![Angular](https://img.shields.io/badge/Angular-22.1.0-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![RxJS](https://img.shields.io/badge/RxJS-7.8-B7178C?style=for-the-badge&logo=reactivex&logoColor=white)](https://rxjs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-22-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![CSS Grid](https://img.shields.io/badge/CSS-Grid%20%26%20Flex-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS/grid)

A modern, **responsive Angular 22 single-page application** that delivers an exceptional customer experience for the ShopWave e-commerce platform. Built with **standalone components**, **reactive RxJS streams**, and a **glassmorphic design system**.

---

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Features](#features)
- [Development](#development)
- [Building & Deployment](#building--deployment)
- [Services & State Management](#services--state-management)
- [Routing](#routing)
- [Design System](#design-system)

---

## ⚡ Quick Start

### Prerequisites

- **Node.js** v22+ ([Download](https://nodejs.org/))
- **Angular CLI** v22.1.5+ (`npm install -g @angular/cli`)
- Backend API running on `http://localhost:5000` (see [Backend README](../Backend/README.md))

### Installation & Setup

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm start
```

**Application opens at:** `http://localhost:4200`

The app will **automatically reload** when you modify any source files.

---

## 📁 Project Structure

```
Frontend/
├── public/                          # Static assets
├── src/
│   ├── main.ts                      # Application bootstrap
│   ├── index.html                   # HTML entry point
│   ├── styles.css                   # Global styles & design tokens
│   └── app/
│       ├── app.ts                   # Root component
│       ├── app-module.ts            # Module declarations (if using modules)
│       ├── app-routing-module.ts    # Route definitions
│       │
│       ├── core/                    # Core singleton services & guards
│       │   ├── guards/
│       │   │   ├── auth.guard.ts    # Redirect unauthenticated users
│       │   │   └── admin.guard.ts   # Restrict routes to admin users
│       │   ├── interceptors/
│       │   │   └── auth.interceptor.ts  # Inject JWT token in requests
│       │   └── services/
│       │       ├── auth.service.ts      # Authentication & user session
│       │       ├── cart.service.ts      # Shopping cart state
│       │       ├── category.service.ts  # Product categories
│       │       ├── product.service.ts   # Product catalog CRUD
│       │       ├── order.service.ts     # Order management
│       │       ├── user.service.ts      # Admin user management
│       │       ├── toast.service.ts     # Toast notifications
│       │       └── wishlist.service.ts  # Wishlist tracking
│       │
│       ├── features/                # Page components & feature modules
│       │   ├── home/                # Home/landing page
│       │   ├── products/            # Product catalog with filters
│       │   ├── product-detail/      # Product detail inspector
│       │   ├── cart/                # Shopping cart page
│       │   ├── auth/                # Login, signup, email verification
│       │   │   ├── login/
│       │   │   ├── register/
│       │   │   └── verify-email/
│       │   ├── orders/              # Customer order history
│       │   ├── dashboard/           # User dashboard
│       │   └── admin/               # Admin portal & management
│       │       ├── admin-overview/  # KPIs & analytics dashboard
│       │       ├── admin-products/  # Product CRUD interface
│       │       ├── admin-categories/# Category management
│       │       ├── admin-users/     # User management & roles
│       │       └── admin-orders/    # Order processing workflow
│       │
│       └── shared/                  # Reusable UI components
│           └── components/
│               ├── navbar/          # Navigation header
│               ├── footer/          # Footer section
│               ├── product-card/    # Product list item
│               ├── cart-summary/    # Cart totals display
│               └── [other components]
│
├── src/assets/                      # Images, icons, placeholders
│   └── images/
├── src/environments/
│   ├── environment.ts               # Development environment config
│   └── environment.prod.ts          # Production environment config
├── src/styles/
│   └── themes.scss                  # SCSS design tokens & variables
├── angular.json                     # Angular CLI configuration
├── tsconfig.json                    # TypeScript configuration
├── proxy.conf.json                  # Dev server API proxy settings
├── package.json                     # Dependencies & NPM scripts
└── README.md                        # This file
```

---

## ✨ Features

### 🛍️ Customer Storefront

#### Product Discovery

- **Advanced Search**: Real-time debounced search with instant results
- **Multi-Facet Filtering**:
  - Category tree navigation with product counters
  - Price range slider
  - Stock availability toggle
  - Active filter tags with single-click removal
- **View Modes**: Toggle between **Grid View** and **List View**
- **Pagination**: Browse products across multiple pages

#### Product Details Page

- **Image Gallery**:
  - Interactive thumbnail selector
  - Full-screen zoom modal with pinch-to-zoom support
  - High-resolution image display
- **Product Information**:
  - Color swatches with glow ring indicators
  - Size/variant buttons with selection state
  - Real-time stock availability status
  - Low-stock urgency alerts ("🔥 Only 3 left!")
  - Star rating display with review count
- **Information Tabs**:
  - Description & Details
  - Technical Specifications
  - Shipping & Returns Policy
- **Related Products**: Category-based "You Might Also Like" grid

#### Shopping Cart

- Add/remove items with quantity adjustments
- Real-time cart total calculation
- Persistent cart state (survives page refresh)
- Cart badge counter in navbar
- Checkout flow with order summary

#### Authentication & User Accounts

- **Signup**: Email-based registration with verification code
- **Email Verification**: Verify ownership before account activation
- **Login**: Secure JWT-based authentication
- **User Profile**: View and update account details
- **Logout**: Clear session and JWT token

### 🛡️ Admin Dashboard (`/admin`)

#### Dashboard Overview

- **Key Performance Indicators (KPIs)**:
  - Total revenue
  - Number of orders
  - Active users count
  - Product inventory status
- **Sales Charts**: Monthly revenue & order trends
- **Recent Activity Log**: Latest orders, product updates, user registrations

#### Product Management

- **Product Table**: View all products with pagination & sorting
- **Create Product**:
  - Form validation for name, description, price, stock
  - Drag-and-drop Cloudinary image uploader
  - Multiple image support with preview gallery
  - Auto-save to cloud storage
- **Edit Product**: Update all product details with image management
- **Delete Product**: Soft/hard delete with confirmation
- **Bulk Actions**: Select multiple products for batch operations

#### Category Management

- View all categories
- Create new categories with auto-slug generation
- Edit category details and images
- Delete categories (with product reassignment option)

#### User Management

- **User List**: View all users with role assignment
- **Create User**: Admin can directly create accounts
- **Edit User**: Update name, email, phone, role
- **Assign Roles**: Set `user` or `admin` permissions
- **Delete User**: Remove user accounts with data cleanup
- **User Metrics**: View login activity, order count, account age

#### Order Management

- **Order List**: View all customer orders with status tracking
- **Order Details**: Full order information including items, shipping, payment status
- **Status Updates**: Change order status (pending → confirmed → shipped → delivered)
- **Order Fulfillment**: Track order processing workflow
- **Customer Details**: View customer info linked to orders

---

## 👨‍💻 Development

### Running the Development Server

```bash
npm start
# or
ng serve
```

Navigate to `http://localhost:4200/` and the app will auto-reload on code changes.

### Code Scaffolding

Generate new components using Angular CLI:

```bash
# Generate component
ng generate component component-name

# Generate service
ng generate service service-name

# Generate module
ng generate module module-name

# View all available schematics
ng generate --help
```

### Project Setup

This project uses:

- **Angular 22** with standalone component architecture
- **TypeScript 5.6** for type safety
- **RxJS 7.8** for reactive state management
- **Reactive Forms** for form handling & validation
- **HTTP Interceptors** for JWT token injection
- **Guards** for route protection (auth & admin)
- **Route Resolvers** for pre-loading data
- **Services** for API communication & state management

---

## 🔨 Building & Deployment

### Development Build

```bash
ng build
```

Build artifacts stored in `dist/frontend/` directory.

### Production Build

```bash
npm run build:prod
# or
ng build --configuration production
```

Optimized production build with:

- ✅ Tree-shaking for unused code removal
- ✅ Minification & compression
- ✅ AOT (Ahead-of-Time) compilation
- ✅ CSS & JS bundling
- ✅ Source maps for debugging

### Running Tests

```bash
# Unit tests with Vitest
npm test
# or
ng test

# End-to-end (E2E) tests
ng e2e
```

### Deployment

Deploy the production build artifacts to:

- **Vercel** (Recommended for Angular SPAs)
- **Netlify**
- **GitHub Pages**
- **AWS S3 + CloudFront**
- **Heroku**
- **Render**

**Environment Configuration**:
Update API base URL in `src/environments/environment.prod.ts` for production backend.

---

## 🔄 Services & State Management

### Core Services

#### AuthService

Manages user authentication state with JWT tokens:

```typescript
- login(email, password): Observable<User>
- signup(payload): Observable<SignupResponse>
- verifyEmail(code): Observable<VerifyResponse>
- logout(): Observable<void>
- getCurrentUser(): Observable<User>
- isAuthenticated(): Observable<boolean>
- currentUser$: BehaviorSubject<User | null>
```

#### CartService

Global shopping cart state:

```typescript
- addToCart(productId, quantity): Observable<CartResponse>
- removeFromCart(itemId): Observable<CartResponse>
- updateItemQuantity(itemId, quantity): Observable<CartResponse>
- getCart(): Observable<CartResponse>
- cartCount$: BehaviorSubject<number>
- cartItems$: BehaviorSubject<CartItem[]>
```

#### ProductService

Product data fetching & filtering:

```typescript
- getProducts(filters): Observable<ProductResponse>
- getProductById(id): Observable<Product>
- createProduct(payload): Observable<Product> // Admin
- updateProduct(id, payload): Observable<Product> // Admin
- deleteProduct(id): Observable<void> // Admin
- products$: BehaviorSubject<Product[]>
```

#### OrderService

Order management:

```typescript
- createOrder(payload): Observable<OrderResponse>
- getOrders(): Observable<OrderResponse>
- getOrderById(id): Observable<Order>
- updateOrderStatus(id, status): Observable<Order> // Admin
```

#### ToastService

Toast notification system:

```typescript
- show(message, type, duration): void
- toast$: Observable<ToastMessage | null>
```

---

## 🛣️ Routing

### Public Routes

- `/` — Home page
- `/products` — Product catalog with filters
- `/products/:id` — Product detail page
- `/login` — User login
- `/register` — User registration
- `/verify-email` — Email verification
- `/cart` — Shopping cart

### Protected Routes (Authenticated Users)

- `/dashboard` — User profile & order history
- `/checkout` — Order creation

### Admin Routes (Admin Only)

- `/admin` — Admin dashboard (redirects to overview)
- `/admin/overview` — KPIs & analytics
- `/admin/products` — Product management
- `/admin/categories` — Category management
- `/admin/users` — User management
- `/admin/orders` — Order processing

### Route Guards

- **AuthGuard**: Protects user-only routes, redirects to login if unauthenticated
- **AdminGuard**: Protects admin routes, redirects if user is not admin

---

## 🎨 Design System

### Design Tokens

Located in `src/styles/themes.scss` and `src/styles.css`:

```css
/* Colors */
--primary:
  #0066cc --secondary: #ff6b6b --success: #51cf66 --warning: #fcc419 --error: #ff6b6b
    --neutral-50: #f9fafb --neutral-900: #111827 /* Spacing */ --spacing-xs: 0.25rem (4px)
    --spacing-sm: 0.5rem (8px) --spacing-md: 1rem (16px) --spacing-lg: 1.5rem (24px)
    --spacing-xl: 2rem (32px) /* Typography */ --font-family: 'Outfit',
  'Inter',
  sans-serif --font-size-sm: 0.875rem --font-size-base: 1rem --font-size-lg: 1.125rem
    --font-size-xl: 1.25rem /* Shadows */ --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05) --shadow-md: 0
    4px 6px rgba(0, 0, 0, 0.1) --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
```

### UI Components

- **Navbar**: Header with search, cart badge, user menu
- **Footer**: Links, copyright, social media
- **Product Card**: Product display with image, price, rating
- **Cart Summary**: Cart totals and checkout button
- **Toast Notification**: Success/error/info feedback
- **Modal Dialogs**: Image zoom, confirmations
- **Form Components**: Input, select, checkbox, radio
- **Loading Spinner**: Page & component loading states
- **Pagination**: Multi-page navigation

---

## 🔗 Related Documentation

- [Backend README](../Backend/README.md) — Express API documentation
- [Root Project README](../README.md) — Full project overview
- [Angular Docs](https://angular.dev/)
- [RxJS Docs](https://rxjs.dev/)
- [TypeScript Docs](https://www.typescriptlang.org/)

---

## 📝 License

This project is part of the NTI Final Project (E-commerce MEAN Stack).

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
