# Finance Dashboard Backend

A clean, modular backend application for a finance dashboard using Node.js, Express, and MongoDB.

## Features

- User management with role and status controls
- Financial record CRUD APIs
- Dashboard analytics APIs
- Role-based access control (RBAC)
- JWT authentication
- Input validation and centralized error handling
- Optional pagination and filtering for record listing

## Tech Stack

- Node.js
- Express
- MongoDB + Mongoose
- express-validator
- JWT (jsonwebtoken)

## Project Structure

```
src/
  app.js
  server.js
  config/
    db.js
  controllers/
    authController.js
    dashboardController.js
    recordController.js
    userController.js
  middleware/
    authMiddleware.js
    errorHandler.js
    notFound.js
    rbacMiddleware.js
    validateRequest.js
    validators.js
  models/
    FinancialRecord.js
    User.js
  routes/
    authRoutes.js
    dashboardRoutes.js
    recordRoutes.js
    userRoutes.js
  services/
    authService.js
    dashboardService.js
    recordService.js
    userService.js
  utils/
    ApiError.js
    asyncHandler.js
```

## Setup Instructions

1. Install dependencies:

```bash
npm install
```

2. Create environment file:

```bash
copy .env.example .env
```

3. Update `.env` values:

- `PORT` - API port
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - secret key for token signing
- `JWT_EXPIRES_IN` - token expiration (example: `1d`)

4. Run the server:

```bash
npm run dev
```

## API Overview

Base URL: `http://localhost:5000`

### Health

- `GET /health`

### Auth

- `POST /api/auth/login`
  - Body:

```json
{
  "email": "admin@example.com",
  "password": "secret123"
}
```

### User Management (Admin only)

- `GET /api/users`
- `POST /api/users`
- `PATCH /api/users/:id`

Create user body:

```json
{
  "name": "Alice",
  "email": "alice@example.com",
  "password": "secret123",
  "role": "viewer",
  "status": "active"
}
```

Update user body (one or both):

```json
{
  "role": "analyst",
  "status": "inactive"
}
```

### Financial Records

- `GET /api/records` (viewer, analyst, admin)
- `GET /api/records/:id` (viewer, analyst, admin)
- `POST /api/records` (admin)
- `PATCH /api/records/:id` (admin)
- `DELETE /api/records/:id` (admin)

Record body:

```json
{
  "amount": 1250.5,
  "type": "income",
  "category": "Salary",
  "date": "2026-03-15",
  "notes": "Monthly salary"
}
```

Filtering query params on `GET /api/records`:

- `type=income|expense`
- `category=...`
- `startDate=YYYY-MM-DD`
- `endDate=YYYY-MM-DD`
- `page=1`
- `limit=10`

### Dashboard APIs (Analyst, Admin)

- `GET /api/dashboard/summary`
  - Returns total income, total expenses, and net balance.
- `GET /api/dashboard/categories`
  - Returns category-wise totals grouped by type.
- `GET /api/dashboard/trends/monthly`
  - Returns monthly aggregates for income and expense.

Optional query parameters for dashboard endpoints:

- `startDate=YYYY-MM-DD`
- `endDate=YYYY-MM-DD`

## RBAC Matrix

- `viewer`: read-only access to financial records
- `analyst`: read access + dashboard access
- `admin`: full access (users + records + dashboard)

## Error Handling

The API returns structured errors:

```json
{
  "message": "Validation failed",
  "details": [
    {
      "msg": "Valid email is required",
      "path": "email"
    }
  ]
}
```

HTTP status codes are used appropriately (`400`, `401`, `403`, `404`, `409`, `500`).
