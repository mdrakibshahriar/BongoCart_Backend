# BongoCart Backend

BongoCart Backend is an Express.js + MongoDB REST API built for an e-commerce application. The project provides user authentication, product catalog management, category and brand management, order processing, and review functionality for a storefront backend.

## Overview

This project is structured as a modular Node.js backend. It separates business concerns into modules and keeps route, controller, service, and model logic organized by domain.

Main features:

- User registration and login
- JWT-based authentication and authorization
- Product listing, search, pagination, related products, and top-selling products
- Brand and category management
- Order creation, payment callback handling, and reporting
- Product reviews and rating support

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- CORS
- dotenv
- SSLCommerz

## Project Structure

src/
|-- app.js
|-- server.js
|-- app/
| |-- middlewares/
| | |-- auth.js
| | -- globalErrorHandler.js
| |-- routes.js
| -- shared/
| -- helper.js
|-- config/
| -- config.js
|-- error/
| |-- handleApiError.js
| |-- handleCastError.js
| -- handleValidationError.js
|-- module/
| |-- brand/
| | |-- brandController.js
| | |-- brandModel.js
| | -- brandRoute.js
| |-- category/
| | |-- categoryController.js
| | |-- categoryModel.js
| | -- categoryRoute.js
| |-- order/
| | |-- orderController.js
| | |-- orderModel.js
| | -- orderRoute.js
| |-- products/
| | |-- productController.js
| | |-- productModel.js
| | |-- productRoute.js
| | -- productService.js
| |-- reviews/
| | |-- reviewController.js
| | |-- reviewModel.js
| | |-- reviewRoute.js
| | -- reviewService.js
| -- user/
| |-- userController.js
| |-- userModel.js
| |-- userRoute.js
| -- userService.js

## Application Flow

1. src/server.js starts the application and connects to MongoDB.
2. src/app.js initializes Express, middleware, and route registration.
3. src/app/routes.js mounts each module route under the /api/v1 prefix.
4. Controllers process HTTP requests and delegate business logic to services.
5. Mongoose models interact with the MongoDB collections.
6. auth.js validates JWT tokens and checks the user role before access is granted.

## Environment Variables

Create a .env file at the project root with values similar to the following:

PORT=3000
DATABASE_URL=mongodb://localhost:27017/BongoCart
JWT_SECRET=your_jwt_secret
JWT_EXPIRY=8400000
STORE_ID=your_sslcommerz_store_id
STORE_PASSWORD=your_sslcommerz_store_password

## Install and Run

Install dependencies:

npm install

Run in development mode:

npm run dev

Run in production mode:

npm start

## API Base URL

The API is mounted under /api/v1.

Example:
http://localhost:3000/api/v1/user/user-login

## Authentication

The application uses JWT authentication. After successful login, the server returns a token that must be sent with the Authorization header:

Authorization: Bearer token

The role is embedded in the JWT payload and checked by the auth middleware. Supported roles include User and Admin.

## Module Documentation

### User Module

File location: src/module/user

Responsibilities:

- Create users
- Log in users
- Return user information
- Update profile and address
- List all users for admins

Routes:

- POST /api/v1/user/user-create - Register a user
- POST /api/v1/user/user-login - Login and receive a JWT
- GET /api/v1/user/user-get/:email - Fetch one user
- GET /api/v1/user/admin/user-all - List all users for admin
- GET /api/v1/user/admin/:email - Fetch admin details
- PATCH /api/v1/user/user-update - Update user information
- PATCH /api/v1/user/user-update-address - Update city and address

### Product Module

File location: src/module/products

Responsibilities:

- Add products
- Add multiple products at once
- List products with pagination
- Search for products
- Fetch top-selling and related products
- Update and delete products

Routes:

- POST /api/v1/products/product-add - Add a product
- POST /api/v1/products/product-add-all - Add many products
- GET /api/v1/products/ - Get paginated products
- PATCH /api/v1/products/product-update - Update a product
- GET /api/v1/products/top-selling - Fetch top sellers
- GET /api/v1/products/search - Search products by keyword or filters
- GET /api/v1/products/product-related - Get related products
- GET /api/v1/products/:productId - Get a product by ID
- DELETE /api/v1/products/:productId - Delete a product

### Brand Module

File location: src/module/brand

Routes:

- POST /api/v1/brand/brand-add - Add a brand
- GET /api/v1/brand/ - Get all brands
- DELETE /api/v1/brand/:id - Delete a brand

### Category Module

File location: src/module/category

Routes:

- POST /api/v1/category/category-add - Add a category
- GET /api/v1/category/ - Get all categories
- DELETE /api/v1/category/:id - Delete a category

### Order Module

File location: src/module/order

Responsibilities:

- Place customer orders
- Send payment requests to SSLCommerz
- Handle payment callback and success flow
- Get order summaries and details
- Update delivery status

Routes:

- POST /api/v1/order/add-order - Create a new order
- GET /api/v1/order/get-order-list/:email - View customer orders
- GET /api/v1/order/get-order-details - Get order details
- PATCH /api/v1/order/get-order-list - Update delivery status
- GET /api/v1/order/admin/monthly-order - Monthly order stats
- GET /api/v1/order/admin/monthly-added-product - Monthly product stats
- GET /api/v1/order/admin/get-order-list - Admin order list
- POST /api/v1/order/payment-success/:tranId - Payment success callback

### Review Module

File location: src/module/reviews

Routes:

- POST /api/v1/review/review-add - Add a review
- GET /api/v1/review/product/:productId - Get reviews for a product
- GET /api/v1/review/user/:userId/:userEmail - Get reviews by user
- GET /api/v1/review/reviews - Admin view of all reviews
- PATCH /api/v1/review/review-update - Update a review
- DELETE /api/v1/review/delete-rev/:userId/:userEmail/:revId - Delete a review

## Data Model Summary

This backend uses MongoDB collections for:

- People (users)
- Products
- Brands
- Categories
- Orders
- Reviews

## Error Handling

The project contains centralized error handlers under src/error and a global error middleware under src/app/middlewares/globalErrorHandler.js. These handle validation, casting, and API-level failures in a consistent manner.

## Notes

- This repository is a backend-only project and does not include a frontend.
- A running MongoDB instance is required for the app to function.
- SSLCommerz credentials must be configured for the checkout flow to work properly.
- Some route and validation patterns may need cleanup before production deployment.

## License

This project is licensed under ISC as declared in package.json.
