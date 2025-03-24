# Product Catalog API
A RESTful API built with Node.js, Express, and MongoDB for managing a product catalog, including product CRUD operations, inventory tracking, and user authentication. This project supports an e-commerce-like system with category management, search functionality, and role-based access control.
## Installation Steps
1. Clone the Repository
```
git clone https://github.com/josephine324/product_catalog.git
cd product-catalog-api
```
2. Install dependencies
```
npm install
```
3. Set Up Environment Variables
* Create a .env file in the project root.
* Add the following
```
PORT=3000
MONGODB_URI=<mongo-db-connection-string>
JWT_SECRET=<your-secure-secret-key>
```
4. Start your MONGODB
* Ensure MongoDB is running locally (mongod) or update MONGODB_URI to a cloud instance (e.g., MongoDB Atlas).
5. Run the server
```
npm install -g nodemon  # If not installed globally
nodemon server.js
```
6. Access the API:
* API base URL: http://localhost:3000
* Swagger UI documentation: http://localhost:3000/api-docs

## API Documentation
### User EndPoints
| Method  | Endpoint | Description  | Authentication  |
|-----------|-----------|-----------|-----------|
| POST| /api/users/register | Register a new user | None|
| POST | /api/users/login | Login and get JWT token | None |

## Product Endpoints
| Method  | Endpoint  | Description | Authentication  |
|-----------|-----------|-----------|-----------|
| GET | /api/products| Get all products with filters| None |
|GET | /api/products/search | Search products by name/description |None|
GET | /api/products/low-stock|Get products with low stock | None |
| GET | /api/products/{id} | Get a product by ID| None |
| POST | /api/products |Create a new product | Admin (Bearer Token) |
|PUT|/api/products/{id} | Update a product | Admin (Bearer Token) |
|DELETE | /api/products/{id}|Delete a product| Admin (Bearer Token) |
| PATCH| /api/products/{id}/inventory | Update variant stock | Admin (Bearer Token)|

### Query Parameters
* GET /api/products:
    * category: Filter by category (e.g., Clothing)
    * productCollection: Filter by collection (e.g., Summer 2025)
    * minPrice: Minimum price filter
    * maxPrice: Maximum price filter
* GET /api/products/search
   * q: Search term (e.g., t-shirt)
* GET /api/products/low-stock:
    * threshold: Stock threshold (default: 10)

## Authentication
* Protected endpoints require an Authorization header:
```
Authorization: Bearer <jwt-token>
```
* Only users with role: "admin" can access admin-only endpoints.

## Example Requests and Responses

### Register a user
* Request
```
POST http://localhost:3000/api/users/register
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "admin123",
  "role": "admin"
}
```
* Response (201 Created)
```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "67e17aecbd550dcefd887c8e",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```
### Login
* Request 
```
POST http://localhost:3000/api/users/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "admin123"
}
```
* Response(200 OK)
```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "67e17aecbd550dcefd887c8e",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```
### Product Endpoints
### Get All Products
* Request
```
GET http://localhost:3000/api/products?category=Clothing
GET http://localhost:3000/api/products
```
* Response( 200 OK)
```
[
  {
    "_id": "67e17aecbd550dcefd887c8e",
    "name": "Premium T-Shirt",
    "price": 34.99,
    "category": "Clothing",
    "variants": [
      {
        "_id": "67e17aecbd550dcefd887c8f",
        "size": "M",
        "color": "Blue",
        "stock": 75,
        "sku": "TSH-M-BLU"
      }
    ]
  }
]
```
### Create a Product (Admin)
* Request
```
POST http://localhost:3000/api/products
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "name": "Premium T-Shirt",
  "price": 29.99,
  "category": "Clothing",
  "variants": [
    {
      "size": "M",
      "color": "Blue",
      "stock": 100,
      "sku": "TSH-M-BLU"
    }
  ]
}
```
* Response(201 created)
```
{
  "_id": "67e17aecbd550dcefd887c8e",
  "name": "Premium T-Shirt",
  "price": 29.99,
  "category": "Clothing",
  "variants": [
    {
      "_id": "67e17aecbd550dcefd887c8f",
      "size": "M",
      "color": "Blue",
      "stock": 100,
      "sku": "TSH-M-BLU"
    }
  ],
  "createdAt": "2025-03-24T10:11:56.302Z",
  "updatedAt": "2025-03-24T10:11:56.302Z"
}
```
### Update Inventory (Admin)
* Request
```
PATCH http://localhost:3000/api/products/67e17aecbd550dcefd887c8e/inventory
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "variantId": "67e17aecbd550dcefd887c8f",
  "quantity": 75
}
```
* Response(200 OK)
```
{
  "_id": "67e17aecbd550dcefd887c8e",
  "name": "Premium T-Shirt",
  "price": 29.99,
  "category": "Clothing",
  "variants": [
    {
      "_id": "67e17aecbd550dcefd887c8f",
      "size": "M",
      "color": "Blue",
      "stock": 75,
      "sku": "TSH-M-BLU"
    }
  ],
  "createdAt": "2025-03-24T10:11:56.302Z",
  "updatedAt": "2025-03-24T10:11:56.302Z"
}
```
## Assumptions and Limitations
### Assumptions
* Admin Role: Any user can register as an admin by specifying "role": "admin" (for testing). In production, this should be restricted.
* JWT Secret: A secure JWT_SECRET is provided in .env and not hardcoded.
### Limitations
* Basic Authentication: Uses JWT with a simple role system (user/admin). No multi-factor authentication or session management.
* Single Admin Check: Admin-only routes check the role field but don’t enforce additional permissions.
* Error Handling: Basic error responses are implemented, but more detailed error codes/messages could be added.

### Potential Improvements
* Implement stricter admin role assignment (e.g., only existing admins can create new admins).
* Enhance error responses with custom error codes.
* Add input sanitization middleware (e.g., express-validator).


