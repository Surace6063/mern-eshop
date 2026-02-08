import express from 'express';
import { getCategories, getCategory } from '../controllers/category.controller.js';

const router = express.Router();

// get categories
router.get('/', getCategories)

// get single category
router.get('/:id', getCategory)


export default router