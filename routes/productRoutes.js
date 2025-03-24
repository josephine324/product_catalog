
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');


router.get('/', productController.getProducts);
router.get('/search', productController.searchProducts);
router.get('/low-stock', productController.getLowStock);
router.get('/:id', productController.getProductById);


router.post('/', authMiddleware, adminMiddleware, productController.createProduct);
router.put('/:id', authMiddleware, adminMiddleware, productController.updateProduct);
router.delete('/:id', authMiddleware, adminMiddleware, productController.deleteProduct);
router.patch('/:id/inventory', authMiddleware, adminMiddleware, productController.updateInventory);

module.exports = router;