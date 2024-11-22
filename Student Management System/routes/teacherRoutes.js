import express from 'express';
import { addTeacher, getAllTeachers, updateTeacher, deleteTeacher, getSingleTeacher, updateTeacherProfileImage } from '../controllers/teacherController.js';
import { auth } from '../middleware/auth.js';
import upload from '../middleware/upload.js';
const router = express.Router();

router.post('/addTeacher', auth,upload.single('image'), addTeacher);
router.get('/allTeachers', getAllTeachers);
router.get("/:id", getSingleTeacher)
router.put('/update/:id', auth, updateTeacher);
router.delete('/delete/:id', auth, deleteTeacher);
router.put('/:id/profile-image', auth, upload.single('image'), updateTeacherProfileImage);

export default router;
