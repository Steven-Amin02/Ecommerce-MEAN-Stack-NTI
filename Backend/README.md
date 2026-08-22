# 🚀 ShopWave Backend — Node.js / Express 5 / MongoDB API Server

[![Node.js](https://img.shields.io/badge/Node.js-22-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.2.1-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose%209.1-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT Auth](https://img.shields.io/badge/Auth-JWT%20Bearer-FF6B6B?style=for-the-badge)](https://jwt.io/)
[![Cloudinary](https://img.shields.io/badge/Media-Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)](https://cloudinary.com/)

The ShopWave backend is a **RESTful API server** built with Express.js that powers the entire e-commerce platform. It handles user authentication, product management, shopping carts, orders, and admin operations with a robust MongoDB database.

---

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Environment Setup](#environment-setup)
- [API Endpoints](#api-endpoints)
- [Database Schemas](#database-schemas)
- [Authentication & Security](#authentication--security)
- [Error Handling](#error-handling)
- [Development](#development)

---

## ⚡ Quick Start

### Prerequisites

- **Node.js** v22+ ([Download](https://nodejs.org/))
- **MongoDB** Local instance or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Cloudinary Account** for image storage ([Sign up](https://cloudinary.com/))
- **Mailtrap Account** for email verification ([mailtrap.io](https://mailtrap.io/))

### Installation & Setup

```bash
# 1. Install dependencies
npm install

# 2. Create .env file (see Environment Setup section)
# Copy config/atlas-credentials.env and update with your values

# 3. Seed the database with sample data (optional)
node seeder.js

# 4. Start the development server
npm start
```

**Server runs on:** `http://localhost:5000`

---

## 📁 Project Structure

```
Backend/
├── config/
│   ├── atlas-credentials.env    # MongoDB & Cloudinary credentials
│   ├── cloudinary.js            # Cloudinary storage provider config
│   ├── config.env               # Environment variables template
│   └── db.js                    # MongoDB connection handler
├── controllers/
│   ├── authController.js        # Login, signup, email verification
│   ├── productController.js     # Product CRUD & filtering
│   ├── categoryController.js    # Category management
│   ├── cartController.js        # Shopping cart operations
│   ├── orderController.js       # Order creation & status updates
│   └── userController.js        # Admin user management
├── models/
│   ├── user.js                  # User schema with role-based access
│   ├── product.js               # Product schema with images & pricing
│   ├── category.js              # Category schema with slug generation
│   ├── cart.js                  # Cart schema with item tracking
│   └── order.js                 # Order schema with status workflow
├── routes/
│   ├── authRoute.js             # Authentication endpoints
│   ├── productRoute.js          # Product API routes
│   ├── categoryRoute.js         # Category API routes
│   ├── cartRoute.js             # Cart API routes
│   ├── orderRoute.js            # Order API routes
│   └── userRoute.js             # User management routes (admin)
├── middlewares/
│   ├── authMiddleware.js        # JWT verification middleware
│   ├── apiError.js              # Custom error handler class
│   ├── validatorMiddleware.js   # express-validator error processor
│   ├── sanitizeResponse.js      # Response formatting middleware
│   └── upload.js                # Multer + Cloudinary file upload config
├── utils/
│   └── sendEmail.js             # Nodemailer email dispatcher
├── validator/
│   ├── authValidator.js         # Signup/login validation rules
│   ├── productValidator.js      # Product creation/update validation
│   ├── categoryValidator.js     # Category validation rules
│   └── userValidator.js         # User management validation
├── src/
│   ├── app.js                   # Express app initialization & middleware setup
│   └── server.js                # Server entry point (Node.js server listener)
├── seeder.js                    # Database seeding script
├── package.json                 # Dependencies & scripts
└── README.md                    # This file
```

---

## 🔧 Environment Setup

Create a `.env` file in the `config/` directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Connection (Local or Atlas)
MONGO_URI=mongodb://localhost:27017/shopwave
# OR for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/shopwave?retryWrites=true&w=majority

# JWT Security
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d

# Cloudinary (Image Storage)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Service (Mailtrap or SMTP)
EMAIL_HOST=sandbox.smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USER=your_mailtrap_user@example.com
EMAIL_PASS=your_mailtrap_password
EMAIL_FROM=noreply@shopwave.com

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:4200
```

---

## 📡 API Endpoints

### Authentication Routes (`/api/v1/auth`)

| Method | Endpoint        | Description                                | Auth Required | Body                                       |
| :----- | :-------------- | :----------------------------------------- | :-----------: | :----------------------------------------- |
| `POST` | `/signup`       | Register new user & send verification code |      ❌       | `{ FirstName, LastName, email, password }` |
| `POST` | `/verify-email` | Verify email with verification code        |      ❌       | `{ email, verificationCode }`              |
| `POST` | `/login`        | Authenticate user & return JWT token       |      ❌       | `{ email, password }`                      |
| `POST` | `/logout`       | Clear authentication session               |      ✅       | —                                          |
| `GET`  | `/me`           | Get authenticated user profile             |      ✅       | —                                          |

### Product Routes (`/api/v1/products`)

| Method   | Endpoint | Description                        | Auth Required | Role  |
| :------- | :------- | :--------------------------------- | :-----------: | :---- |
| `GET`    | `/`      | Get products with filters & search |      ❌       | —     |
| `GET`    | `/:id`   | Get single product details         |      ❌       | —     |
| `POST`   | `/`      | Create new product with images     |      ✅       | Admin |
| `PUT`    | `/:id`   | Update product details             |      ✅       | Admin |
| `DELETE` | `/:id`   | Delete product (soft delete)       |      ✅       | Admin |

### Category Routes (`/api/v1/categories`)

| Method   | Endpoint | Description          | Auth Required | Role  |
| :------- | :------- | :------------------- | :-----------: | :---- |
| `GET`    | `/`      | Fetch all categories |      ❌       | —     |
| `POST`   | `/`      | Create new category  |      ✅       | Admin |
| `PUT`    | `/:id`   | Update category      |      ✅       | Admin |
| `DELETE` | `/:id`   | Delete category      |      ✅       | Admin |

### Cart Routes (`/api/v1/cart`)

| Method   | Endpoint   | Description               | Auth Required |
| :------- | :--------- | :------------------------ | :-----------: |
| `GET`    | `/`        | Get user's shopping cart  |      ✅       |
| `POST`   | `/add`     | Add item to cart          |      ✅       |
| `PUT`    | `/:itemId` | Update cart item quantity |      ✅       |
| `DELETE` | `/:itemId` | Remove item from cart     |      ✅       |
| `DELETE` | `/clear`   | Clear entire cart         |      ✅       |

### Order Routes (`/api/v1/orders`)

| Method | Endpoint      | Description                 | Auth Required |
| :----- | :------------ | :-------------------------- | :-----------: |
| `POST` | `/`           | Create order from cart      |      ✅       |
| `GET`  | `/`           | Get user's orders           |      ✅       |
| `GET`  | `/:id`        | Get order details           |      ✅       |
| `PUT`  | `/:id/status` | Update order status (Admin) |   ✅ Admin    |

### User Management Routes (`/api/v1/users`) — Admin Only

| Method   | Endpoint | Description                    | Auth Required | Role  |
| :------- | :------- | :----------------------------- | :-----------: | :---- |
| `GET`    | `/`      | List all users with pagination |      ✅       | Admin |
| `POST`   | `/`      | Create user account directly   |      ✅       | Admin |
| `GET`    | `/:id`   | Get user details               |      ✅       | Admin |
| `PUT`    | `/:id`   | Update user profile            |      ✅       | Admin |
| `DELETE` | `/:id`   | Delete user account            |      ✅       | Admin |

---

## 🗄️ Database Schemas

### User Schema

```javascript
{
  FirstName: String,
  LastName: String,
  email: String (unique),
  password: String (hashed with bcrypt),
  phone: String,
  role: String ('user' | 'admin'),
  isVerified: Boolean,
  verificationCode: String,
  profileImage: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Product Schema

```javascript
{
  name: String,
  slug: String (unique),
  description: String,
  price: Number,
  stock: Number,
  category: ObjectId (ref: 'Category'),
  images: [{
    url: String,
    public_id: String (Cloudinary)
  }],
  rating: Number (0-5),
  reviews: [{
    userId: ObjectId,
    comment: String,
    rating: Number
  }],
  isFeatured: Boolean,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Category Schema

```javascript
{
  name: String,
  slug: String (unique, auto-generated),
  description: String,
  image: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Cart Schema

```javascript
{
  userId: ObjectId (ref: 'User'),
  items: [{
    productId: ObjectId (ref: 'Product'),
    quantity: Number,
    price: Number
  }],
  totalPrice: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Order Schema

```javascript
{
  userId: ObjectId (ref: 'User'),
  items: [{
    productId: ObjectId,
    quantity: Number,
    price: Number
  }],
  totalPrice: Number,
  status: String ('pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'),
  shippingAddress: String,
  paymentStatus: String ('pending' | 'completed' | 'failed'),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔐 Authentication & Security

### JWT Authentication Flow

1. **User Signup**: Email verification code sent via Mailtrap
2. **Email Verification**: User confirms code, account is activated
3. **Login**: User receives JWT token (Bearer Token)
4. **Protected Routes**: Token validated via `authMiddleware.js`
5. **Token Storage**: Stored in HTTP-only cookies or localStorage on client

### Security Features

- ✅ **Bcrypt Password Hashing** with 10 salt rounds
- ✅ **JWT Bearer Token** with configurable expiration (default: 7 days)
- ✅ **HTTP-Only Cookies** for token storage (prevents XSS)
- ✅ **Express Validator** for input validation & sanitization
- ✅ **CORS Configuration** to allow specific frontend origins
- ✅ **Email Verification** with time-limited verification codes

### Authorization

- **User Role**: Can browse products, manage own cart, view orders
- **Admin Role**: Full access to CRUD operations, user management, order status updates

---

## ⚠️ Error Handling

All errors follow a standardized JSON response format:

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Validation Error",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### Common Error Codes

| Status | Message      | Cause                                     |
| :----- | :----------- | :---------------------------------------- |
| `400`  | Bad Request  | Invalid input or validation errors        |
| `401`  | Unauthorized | Missing or invalid JWT token              |
| `403`  | Forbidden    | Insufficient permissions (not admin)      |
| `404`  | Not Found    | Resource does not exist                   |
| `409`  | Conflict     | Email already registered, duplicate entry |
| `500`  | Server Error | Unexpected server error                   |

---

## 👨‍💻 Development

### NPM Scripts

```bash
# Start development server with auto-reload
npm start

# Syntax check (run before deployment)
node -c src/server.js

# Seed database with sample data
node seeder.js

# Install dependencies
npm install
```

### Development Tools

- **Express 5.x** — Web framework & routing
- **Mongoose** — MongoDB ODM & schema validation
- **express-validator** — Input validation middleware
- **bcryptjs** — Password hashing
- **jsonwebtoken** — JWT token creation & verification
- **Cloudinary** — Cloud image storage & CDN
- **Multer** — File upload middleware
- **Nodemailer** — Email sending service
- **CORS** — Cross-Origin Resource Sharing

### Best Practices

- Use **environment variables** for sensitive data
- Implement **input validation** on all routes
- Use **try-catch blocks** with proper error handling
- Keep controllers **lean** and delegate to services
- Use **async/await** for cleaner async code
- Validate **JWT tokens** on protected routes
- Use **meaningful HTTP status codes**

---

## 🔗 Related Documentation

- [Frontend README](../Frontend/README.md) — Angular 22 frontend documentation
- [Root Project README](../README.md) — Full project overview
- [MongoDB Docs](https://docs.mongodb.com/)
- [Express Docs](https://expressjs.com/)
- [Cloudinary API Docs](https://cloudinary.com/documentation)

---

## 📝 License

This project is part of the NTI Final Project (E-commerce MEAN Stack).
