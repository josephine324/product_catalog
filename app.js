const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');

app.use(cors());
app.options('*', cors());

// Middleware
app.use(express.json());
app.use(morgan('tiny'));

// Apply authJwt only to routes that need authentication
const api = process.env.API_URL;
console.log(api);

// Routes
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');

// Use authJwt middleware on routes that need authentication (e.g., /users, /orders, etc.)
app.use("api/v1/users", authJwt(), usersRoutes); // Apply authJwt here for user-related routes that require authentication
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/orders`, ordersRoutes);

// Public route that does not need authentication
app.use(`${api}/register`, usersRoutes); // Register route does not require authJwt

// Database connection
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'eshop-database'
})
.then(() => {
    console.log('Database Connection is ready...');
})
.catch((err) => {
    console.log(err);
});

// Server setup
app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});
