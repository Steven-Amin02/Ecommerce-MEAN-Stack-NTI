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
  - Low-stock urgency alert indicators (_"🔥 Hurry! Only 3 left in stock"_).
  - Social proof rating stars and review count metrics.
  - Information tabs: _Description & Details_, _Technical Specifications_, and _Shipping & Returns_.
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
- **Styling**: Modern Vanilla CSS Design Tokens, CSS Grid, Glassmorphism, Google Fonts (_Outfit / Inter_), Material Icons
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

- **Node.js** v22+ ([Download](https://nodejs.org/))
- **MongoDB** Local instance or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Cloudinary Account** ([Sign up](https://cloudinary.com/))
- **Mailtrap Account** ([mailtrap.io](https://mailtrap.io/)) for email verification

### 📚 Documentation

Start with the appropriate README for your focus area:

| Section           | Documentation                            | Purpose                                            |
| :---------------- | :--------------------------------------- | :------------------------------------------------- |
| 🎨 **Frontend**   | [Frontend/README.md](Frontend/README.md) | Angular 22 setup, components, routing, services    |
| 🚀 **Backend**    | [Backend/README.md](Backend/README.md)   | Express API, database schemas, endpoints, security |
| 📦 **Full Stack** | This file                                | Project overview, tech stack, deployment           |

### 1. Clone Repository & Environment Setup

Create a `.env` file in the `Backend/config/` directory:

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

### 2. Backend Installation & Server Startup

```bash
# Navigate to Backend folder
cd Backend

# Install backend dependencies
npm install

# Configure environment variables
# Update Backend/config/atlas-credentials.env with your credentials

# Seed database with sample products & categories (optional)
node seeder.js

# Validate server syntax
node -c src/server.js

# Start Express server
npm start
```

**Backend runs on:** `http://localhost:5000`

📖 **Full backend setup:** See [Backend/README.md](Backend/README.md)

### 3. Frontend Installation & Application Startup

```bash
# Navigate to Frontend folder
cd ../Frontend

# Install frontend dependencies
npm install

# Start Angular development server
npm start
# or: ng serve
```

**Frontend opens at:** `http://localhost:4200`

📖 **Full frontend setup:** See [Frontend/README.md](Frontend/README.md)

---

## 🧪 Quick Test

Once both servers are running:

1. **Visit the storefront:** `http://localhost:4200`
2. **Create an account:** Click Register, verify email
3. **Browse products:** Use filters, search, and sorting
4. **Add to cart:** Click product → Add to Cart
5. **Access admin:** Login with admin account → Visit `http://localhost:4200/admin`

---

## 🔄 Workflow & Development

### Starting Development

**Terminal 1 — Backend:**

```bash
cd Backend
npm start
```

**Terminal 2 — Frontend:**

```bash
cd Frontend
npm start
```

### Code Changes & Hot Reload

- **Frontend**: Auto-reloads on file changes (ng serve watches files)
- **Backend**: Requires manual restart on code changes (or use `nodemon` if installed)

### Making API Calls from Frontend

The frontend Angular services automatically communicate with the backend:

```typescript
// src/app/core/services/product.service.ts
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(filters: any): Observable<ProductResponse> {
    // Automatically sends to http://localhost:5000/api/v1/products
    return this.http.get<ProductResponse>(`${environment.apiUrl}/products`, {
      params: filters,
    });
  }
}
```

**API Base URL** is configured in:

- Development: `src/environments/environment.ts`
- Production: `src/environments/environment.prod.ts`

---

## 🚀 Deployment

### Environment-Specific Builds

**Production Frontend Build:**

```bash
cd Frontend
npm run build:prod
# or: ng build --configuration production
```

Optimized artifacts saved to `Frontend/dist/frontend/`

### Deployment Targets

| Platform                | Steps                                |          Recommended          |
| :---------------------- | :----------------------------------- | :---------------------------: |
| **Vercel**              | Upload `Frontend/dist/`              |   ✅ Best for Angular SPAs    |
| **Netlify**             | Connect Git repo, auto-deploy        |         ✅ Easy CI/CD         |
| **GitHub Pages**        | Push dist to `gh-pages` branch       |        ✅ Free hosting        |
| **AWS (S3+CloudFront)** | S3 bucket + CDN distribution         |      ✅ Enterprise scale      |
| **Render**              | Deploy backend & frontend separately | ✅ Full stack on one platform |
| **Heroku**              | Heroku CLI deployment                | ⚠️ Requires buildpack config  |

### Backend Deployment

Deploy backend to:

- **Render.com** (Recommended for Node.js)
- **Railway.app**
- **AWS EC2 / Lightsail**
- **DigitalOcean**
- **Heroku**

**CI/CD Pipeline**: GitHub Actions workflow at `.github/workflows/ci-cd.yml`

---

## 🧠 System Architecture

### Request Flow

```
User Browser
    ↓
[Angular Frontend] (Port 4200)
    ↓
HTTP Interceptor (adds JWT token)
    ↓
[Express Backend API] (Port 5000)
    ↓
[Express Middleware]
  - CORS validation
  - JWT verification
  - Input validation
  - Error handling
    ↓
[Route Controllers]
  - Business logic
  - Validation
  - Data processing
    ↓
[MongoDB Database]
  - User data
  - Products
  - Orders
  - Cart items
    ↓
[External Services]
  - Cloudinary (image storage)
  - Mailtrap (email verification)
    ↓
Response → Frontend → User Browser
```

### State Management

**Frontend (Angular):**

- BehaviorSubjects for reactive state
- Services act as single source of truth
- HTTP Interceptors for JWT injection
- Guards for route protection

**Backend (Express):**

- Stateless API endpoints
- JWT tokens for session management
- MongoDB for persistent data storage
- Middleware for request processing

---

## 🔐 Security Checklist

✅ **Production Deployment**

- [ ] Update `.env` with strong `JWT_SECRET` (min 32 chars)
- [ ] Set `NODE_ENV=production`
- [ ] Configure CORS to allow only your frontend domain
- [ ] Use HTTPS/SSL certificates
- [ ] Set secure MongoDB credentials
- [ ] Configure Cloudinary & Mailtrap API keys
- [ ] Enable rate limiting on API endpoints
- [ ] Review authentication middleware
- [ ] Add logging & monitoring
- [ ] Backup database regularly
- [ ] Use environment variables (never commit .env)

📖 **See [Backend/README.md](Backend/README.md#-authentication--security) for detailed security info**

---

## 📡 API Endpoint Overview

| Method   | Endpoint               | Description                               | Access        |
| :------- | :--------------------- | :---------------------------------------- | :------------ |
| `POST`   | `/api/v1/auth/signup`  | Register new user & send code             | Public        |
| `POST`   | `/api/v1/auth/verify`  | Verify email code & activate account      | Public        |
| `POST`   | `/api/v1/auth/login`   | Authenticate user & return token          | Public        |
| `GET`    | `/api/v1/products`     | Query products with filters & search      | Public        |
| `GET`    | `/api/v1/products/:id` | Get single product details                | Public        |
| `POST`   | `/api/v1/products`     | Create new product with Cloudinary images | Admin         |
| `PUT`    | `/api/v1/products/:id` | Update product details                    | Admin         |
| `DELETE` | `/api/v1/products/:id` | Delete product                            | Admin         |
| `GET`    | `/api/v1/categories`   | Fetch all categories                      | Public        |
| `POST`   | `/api/v1/categories`   | Create category                           | Admin         |
| `GET`    | `/api/v1/cart`         | Get authenticated user cart               | Authenticated |
| `POST`   | `/api/v1/cart`         | Add item to shopping cart                 | Authenticated |
| `GET`    | `/api/v1/users`        | List all users (with pagination)          | Admin         |
| `POST`   | `/api/v1/users`        | Create user account directly              | Admin         |

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

## � Detailed Documentation

### Frontend Development

- [Angular Components](Frontend/README.md#project-structure) — Component architecture & hierarchy
- [Services & State](Frontend/README.md#-services--state-management) — RxJS & BehaviorSubjects
- [Routing & Guards](Frontend/README.md#-routing) — Navigation & protection
- [Design System](Frontend/README.md#-design-system) — Tokens, components, styles
- [Build & Deploy](Frontend/README.md#-building--deployment) — Production builds

### Backend Development

- [API Endpoints](Backend/README.md#-api-endpoints) — Complete REST API reference
- [Database Schemas](Backend/README.md#-database-schemas) — MongoDB models & validation
- [Authentication](Backend/README.md#-authentication--security) — JWT & security
- [Controllers](Backend/README.md#-project-structure) — Business logic
- [Middleware](Backend/README.md) — Request processing

### External Services

- [Cloudinary Docs](https://cloudinary.com/documentation) — Image storage & CDN
- [MongoDB Docs](https://docs.mongodb.com/) — Database & queries
- [Mailtrap Docs](https://mailtrap.io/article/nodemailer-configuration/) — Email service
- [JWT Guide](https://jwt.io/introduction) — Token-based auth

---

## 🛠️ Troubleshooting

### Frontend Issues

**"Cannot find module 'rxjs'"**
→ Run `npm install` in Frontend folder

**"ng serve not found"**
→ Install Angular CLI: `npm install -g @angular/cli@22`

**Port 4200 already in use**
→ Run on different port: `ng serve --port 4300`

**API requests failing**
→ Check Backend is running on port 5000
→ Verify `environment.ts` has correct API URL

### Backend Issues

**"Cannot find module 'express'"**
→ Run `npm install` in Backend folder

**MongoDB connection error**
→ Check MongoDB is running
→ Verify `MONGO_URI` in `.env` file

**Port 5000 already in use**
→ Kill process: `lsof -i :5000` (Mac/Linux) or `netstat -ano | findstr :5000` (Windows)

**Cloudinary upload fails**
→ Verify credentials in `.env`
→ Check Cloudinary account has API access

**Email verification not working**
→ Check Mailtrap credentials
→ Verify `EMAIL_HOST`, `EMAIL_USER`, `EMAIL_PASS` in `.env`

---

## 📊 Technology Stats

| Technology         | Version | Purpose              |
| :----------------- | :------ | :------------------- |
| **Angular**        | 22.1.0+ | Frontend framework   |
| **Node.js**        | 22+     | Runtime environment  |
| **Express**        | 5.2.1+  | Web framework        |
| **MongoDB**        | 6.0+    | NoSQL database       |
| **TypeScript**     | 5.6+    | Type-safe JavaScript |
| **RxJS**           | 7.8+    | Reactive programming |
| **Mongoose**       | 9.1+    | MongoDB ODM          |
| **Cloudinary**     | 1.36+   | Media management     |
| **Bcryptjs**       | 2.4.3+  | Password hashing     |
| **JSON Web Token** | 9.1+    | Authentication       |

---

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make changes and commit: `git commit -m 'Add new feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Submit a Pull Request

---

## 📝 License

This project is distributed under the **MIT License**.

---

## 👨‍💻 Contact & Support

- **Project Repository**: [GitHub](https://github.com/Steven-Amin02/Ecommerce-MEAN-Stack-NTI)
- **Issues & Bug Reports**: [GitHub Issues](https://github.com/Steven-Amin02/Ecommerce-MEAN-Stack-NTI/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Steven-Amin02/Ecommerce-MEAN-Stack-NTI/discussions)

---

<p align="center">
  <strong>Made with ❤️ by Steven Amin & Contributors</strong><br>
  NTI Final Project — E-Commerce MEAN Stack
</p>
