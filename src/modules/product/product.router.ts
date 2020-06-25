import express from 'express';

import ProductController from './product.controller';
import { verifyAccessToken } from '../../middlewares';


const router = express.Router();
const productController = new ProductController();

router.post('/',verifyAccessToken(), productController.createProduct);
router.get('/', productController.getAllProduct);
router.get('/newstyle', productController.getNewStyle);
router.get('/:id', productController.getProduct);

router.get('/getbycategory/:categoryname', productController.getProductByCategoryID);

router.patch('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

export default router;