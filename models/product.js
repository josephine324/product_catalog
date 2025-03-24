const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
    size: String,
    color: String,
    stock: { type: Number, default: 0 },
    sku: { type: String, required: true }
});

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    discountPrice: Number,
    category: { type: String, required: true },
    productCollection: String, 
    variants: [variantSchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);