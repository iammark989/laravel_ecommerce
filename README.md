# E-Commerce Management System

A modern full-stack e-commerce management system built with Laravel and React. The application provides product management, inventory tracking, customer shopping, and an administrative dashboard.

## Features

### Admin
- Dashboard
- Product Management
- Category Management
- Brand Management
- Product Variants
- Product Images
- Inventory Management
- Stock Monitoring
- Customer Management
- Order Management
- Role-Based Authentication

### Customer
- User Registration & Login
- Browse Products
- Search Products
- Product Details
- Shopping Cart
- Checkout
- Order History
- User Profile Management

## Tech Stack

### Backend
- Laravel
- PHP
- MySQL
- REST API
- Laravel Sanctum (if applicable)

### Frontend
- React
- TypeScript
- Tailwind CSS
- Vite
- Axios

## Installation

### Clone the repository

```bash
git clone https://github.com/iammark989/laravel_ecommerce.git
```

### Install backend dependencies

```bash
composer install
```

### Install frontend dependencies

```bash
npm install
```

### Copy environment file

```bash
cp .env.example .env
```

### Generate application key

```bash
php artisan key:generate
```

### Configure database

Update your `.env` file.

```env
DB_DATABASE=your_database
DB_USERNAME=root
DB_PASSWORD=
```

### Run migrations

```bash
php artisan migrate
```

### Start Laravel

```bash
php artisan serve
```

### Start React

```bash
npm run dev
```

## Project Structure

```
app/
resources/
routes/
database/
public/
```

## Future Improvements

- Online Payment Integration
- Order Tracking
- Email Notifications
- Product Reviews
- Wishlist
- Discount Coupons
- Sales Analytics
- AI Product Recommendations

## Author

Mark Arvin Valenzuela

GitHub: https://github.com/iammark989
LinkedIn: https://www.linkedin.com/in/mark-arvin-valenzuela
