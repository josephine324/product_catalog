// routes/swagger.js
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Product Catalog API',
            version: '1.0.0',
            description: 'A RESTful API for managing a product catalog with authentication',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                Product: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        name: { type: 'string' },
                        description: { type: 'string' },
                        price: { type: 'number' },
                        discountPrice: { type: 'number' },
                        category: { type: 'string' },
                        productCollection: { type: 'string' },
                        variants: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    _id: { type: 'string' },
                                    size: { type: 'string' },
                                    color: { type: 'string' },
                                    stock: { type: 'number' },
                                    sku: { type: 'string' },
                                },
                            },
                        },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' },
                    },
                },
                ProductInput: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        description: { type: 'string' },
                        price: { type: 'number' },
                        discountPrice: { type: 'number' },
                        category: { type: 'string' },
                        productCollection: { type: 'string' },
                        variants: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    size: { type: 'string' },
                                    color: { type: 'string' },
                                    stock: { type: 'number' },
                                    sku: { type: 'string' },
                                },
                            },
                        },
                    },
                    required: ['name', 'price', 'category'],
                },
                User: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        email: { type: 'string' },
                        role: { type: 'string', enum: ['user', 'admin'] },
                    },
                },
            },
        },
    },
    apis: ['./routes/*.js'], 
};

const specs = swaggerJsdoc(options);

module.exports = specs;