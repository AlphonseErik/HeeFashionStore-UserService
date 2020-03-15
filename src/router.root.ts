import express from 'express';
var router = express.Router();

import UserRouter from './modules/user/user.router';
import AuthRouter from './modules/auth/auth.router';
import ProductRouter from './modules/product/product.router';
import OrderRouter from './modules/order/order.router';
import CategoryRouter from './modules/category/category.router';

router.use('/auth', AuthRouter);
router.use('/users', UserRouter);
router.use('/products', ProductRouter);
router.use('/orders', OrderRouter);
router.use('/categories', CategoryRouter);

export default router;