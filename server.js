
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');  // New
const errorHandler = require('./middleware/errorHandler');
const swaggerSpecs = require('./routes/swagger');
const swaggerUi = require('swagger-ui-express');


const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(cors());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});