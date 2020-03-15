import express from 'express';

import ProductController from './product.controller';


const router = express.Router();
const productController = new ProductController();

router.post('/', productController.createProduct);
router.get('/', productController.getAllProduct);
router.get('/newstyle', productController.getNewStyle);
router.get('/getproductbycategory', productController.getProductByCategoryID);
router.get('/:id', productController.getProduct);
router.patch('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

export default router;