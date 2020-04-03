import express from 'express';
var router = express.Router();
import OrderController from './order.controller';

const orderController = new OrderController();

router.post('/', orderController.create);

router.post('/:userid', orderController.getList);


export default router;