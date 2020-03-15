import express from 'express';

import CategoryController from './category.controller';

const router = express.Router();
const categoryController = new CategoryController();

router.post('/', categoryController.createCategory);
router.get('/', categoryController.getAllCategory);
router.get('/:id', categoryController.getCategoryByID);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

export default router;