import express from 'express';

import CategoryController from './category.controller';
import { verify } from 'jsonwebtoken';
import { verifyAccessToken } from '../../middlewares';

const router = express.Router();
const categoryController = new CategoryController();

router.post('/', verifyAccessToken(), categoryController.createCategory);
router.get('/', categoryController.getAllCategory);
router.get('/:id', categoryController.getCategoryByID);
router.put('/:id', verifyAccessToken(), categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

export default router;