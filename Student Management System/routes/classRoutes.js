import express from 'express';
import { createClass, getAllClasses, updateClass, deleteClass } from '../controllers/classController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/createClass', auth, createClass);
router.get('/', getAllClasses);
router.put('/update/:id',auth, updateClass);
router.delete('/delete/:id',auth, deleteClass);

export default router;
