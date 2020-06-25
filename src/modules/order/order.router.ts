import express from 'express';
var router = express.Router();
import OrderController from './order.controller';
import { verifyAccessToken } from '../../middlewares';

const orderController = new OrderController();

router.post('/', verifyAccessToken(), orderController.create);

router.get('/getall', orderController.getAll);

router.get('/getbychart', orderController.getByChart);

export default router;