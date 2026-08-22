# 🌊 ShopWave — Next-Generation E-Commerce Storefront & Admin Portal

[![Angular](https://img.shields.io/badge/Angular-22.1.0-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.2.1-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose%209.1-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Media%20Uploads-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)](https://cloudinary.com/)
[![CI/CD Pipeline](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)](.github/workflows/ci-cd.yml)

**ShopWave** is a full-stack, enterprise-grade e-commerce application designed to deliver an exceptional Customer Experience (CX) and User Interface (UI). Built with **Angular 22** on the frontend and **Node.js / Express 5 / MongoDB** on the backend, ShopWave combines high-converting storefront interactions with a powerful administrative management console.

---

## ✨ Features & Highlights

### 🛒 Storefront & Customer Experience (UX/CX)
- **Search-First Ambient Hero Header**: Vibrant ambient glassmorphic background with integrated search and brand guarantees.
- **Interactive Product Catalog**:
  - Multi-facet filtering: Live debounced search, category trees with product counters, stock availability toggles, and numeric price sliders.
  - Active filter tags with single-click removal (`✕`).
  - View mode switching between **Grid View** and **List View**.
- **Product Detail Inspector Page**:
  - High-res image gallery with interactive thumbnail selector and full-screen **Zoom Modal**.
  - Color swatches with glow rings and size buttons with active state highlighting.
  - Low-stock urgency alert indicators (*"🔥 Hurry! Only 3 left in stock"*).
  - Social proof rating stars and review count metrics.
  - Information tabs: *Description & Details*, *Technical Specifications*, and *Shipping & Returns*.
  - Category-based **"You Might Also Like"** related products grid.
- **Conversion Boosters**:
  - Live **Flash Sale Countdown Timer** banner.
  - Dismissible promotional top announcement bar with dynamic layout adjustment.
  - VIP Newsletter subscription block with instant user feedback.
- **Navigation & Accessibility**:
  - Responsive navigation header with quick search, cart counter pulse badge, and user avatar profile dropdown menu.
  - Mobile drawer navigation with search integration and theme toggles.

### 🛡️ Admin Management Console (`/admin`)
- **Dashboard Overview**: Key performance indicators (KPIs), sales analytics, order fulfillment status, and recent activity logs.
- **Product Management (CRUD)**:
  - Create, view, edit, and soft/hard delete products.
  - Drag-and-drop Cloudinary multi-image file uploader with instant file list preview.
  - Image gallery preview inspector modal.
- **Category Management (CRUD)**:
  - Create and edit product categories with auto-slug generation.
- **User Management (CRUD)**:
  - Admin controls to create new accounts, assign roles (`admin` / `user`), view user metrics, and edit or delete users.
- **Order Processing**:
  - Real-time customer order updates and status workflow management.

### 🔐 Security & Backend Architecture
- **JWT Bearer Token Authentication**: Secure token verification stored via HTTP-only cookies / local storage.
- **Email Verification Codes**: Account creation with code verification powered by **Nodemailer** and **Mailtrap**.
- **Bcrypt Password Hashing**: Salting and hashing sensitive credentials.
- **Cloudinary Integration**: Direct-to-cloud media upload pipeline via `multer-storage-cloudinary`.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Angular 22 (Standalone & Modular Architecture)
- **State Management**: Reactive RxJS Streams & BehaviorSubjects
- **Styling**: Modern Vanilla CSS Design Tokens, CSS Grid, Glassmorphism, Google Fonts (*Outfit / Inter*), Material Icons
- **HTTP Client**: Angular `@angular/common/http` with Auth Interceptors

### Backend
- **Runtime**: Node.js
- **Framework**: Express 5.x
- **Database**: MongoDB & Mongoose ORM
- **Authentication**: JSON Web Tokens (`jsonwebtoken`) & `bcryptjs`
- **File Storage**: Cloudinary SDK & Multer
- **Validation**: `express-validator`

---

## 📁 Directory Structure

```
project/
├── config/                  # Database & Cloudinary configurations
│   ├── db.js                # MongoDB connection handler
│   └── cloudinary.js        # Cloudinary storage provider setup
├── controllers/             # Express route controllers
│   ├── authController.js    # Auth & verification logic
│   ├── productController.js # Product catalog CRUD & filtering
│   ├── categoryController.js# Category management
│   ├── cartController.js    # User cart state operations
│   ├── orderController.js   # Checkout & order status handlers
│   └── userController.js    # Admin user management CRUD
├── models/                  # Mongoose data schemas
│   ├── User.js              # User schema with roles & validation
│   ├── Product.js           # Product schema with images & metadata
│   ├── Category.js          # Category schema with slugs
│   ├── Cart.js              # User shopping cart schema
│   └── Order.js             # Order transaction schema
├── routes/                  # RESTful API endpoints
├── utils/                   # Helper functions & email dispatchers
├── seeder.js                # Seed script for initial database setup
├── package.json             # Backend dependencies & scripts
└── frontend/                # Angular 22 Single Page Application
    ├── src/
    │   ├── app/
    │   │   ├── core/        # Services (Auth, Cart, Product, Toast, Category)
    │   │   ├── features/    # Page components (Home, Products, Detail, Admin, Auth)
    │   │   └── shared/      # Reusable UI components (Navbar, Footer, ProductCard)
    │   ├── assets/          # Static assets & placeholder SVGs
    │   └── styles.css       # Global design tokens & CSS utilities
    └── package.json         # Frontend dependencies & Angular CLI setup
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas)
- [Cloudinary Account](https://cloudinary.com/) (For product image storage)
- Mailtrap / SMTP Account (For email verification dispatch)

### 1. Clone & Environment Setup

Create a `.env` file in the root `project/` directory:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/shopwave
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Mailtrap / Nodemailer Configuration
EMAIL_HOST=sandbox.smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USER=your_mailtrap_user
EMAIL_PASS=your_mailtrap_password
```

### 2. Backend Installation & Seed Data

```bash
# Navigate to the project root
cd project

# Install backend dependencies
npm install

# Seed initial categories & sample products (Optional)
node seeder.js

# Start backend server
npm start
```
The Express backend server will run on `http://localhost:5000`.

### 3. Frontend Installation & Startup

```bash
# Navigate to the frontend directory
cd frontend

# Install frontend dependencies
npm install

# Start Angular development server
npm start
```
Open your browser and navigate to `http://localhost:4200`.

---

## 📡 API Endpoint Overview

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/signup` | Register new user & send code | Public |
| `POST` | `/api/v1/auth/verify` | Verify email code & activate account | Public |
| `POST` | `/api/v1/auth/login` | Authenticate user & return token | Public |
| `GET` | `/api/v1/products` | Query products with filters & search | Public |
| `GET` | `/api/v1/products/:id` | Get single product details | Public |
| `POST` | `/api/v1/products` | Create new product with Cloudinary images | Admin |
| `PUT` | `/api/v1/products/:id` | Update product details | Admin |
| `DELETE`| `/api/v1/products/:id` | Delete product | Admin |
| `GET` | `/api/v1/categories` | Fetch all categories | Public |
| `POST` | `/api/v1/categories` | Create category | Admin |
| `GET` | `/api/v1/cart` | Get authenticated user cart | Authenticated |
| `POST` | `/api/v1/cart` | Add item to shopping cart | Authenticated |
| `GET` | `/api/v1/users` | List all users (with pagination) | Admin |
| `POST` | `/api/v1/users` | Create user account directly | Admin |

---

## 🎨 Design Tokens & UI Aesthetics

ShopWave utilizes a token-driven design system stored in `frontend/src/app/styles.css`:

```css
:root {
  --color-bg-primary: #0f0f1e;
  --color-bg-secondary: #1a1a2e;
  --color-bg-tertiary: #16213e;
  --color-accent: #e94560;
  --color-accent-dark: #0f3460;
  --color-accent-light: #ff6b81;
  --color-text-primary: #ffffff;
  --color-text-secondary: #a0a5c0;
  --color-success: #00d68f;
  --color-error: #ff4d6d;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;
}
```

---

## 📝 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<p center="align">
Made with ❤️ by Steven Amin & the ShopWave Team.
</p>
