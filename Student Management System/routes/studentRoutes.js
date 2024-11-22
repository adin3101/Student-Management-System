import express from "express";
import {
  addStudent,
  deleteStudent,
  getAllStudents,
  getSingleStudent,
  updateStudent,
} from "../controllers/studentController.js";
import upload from '../middleware/upload.js';
import { updateStudentProfileImage } from '../controllers/studentController.js';
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/addStudent", auth,upload.single('image'), addStudent);
router.get("/allStudents",  getAllStudents);
router.get("/:id", getSingleStudent);
router.put("/update/:id", auth, updateStudent);
router.delete("/delete/:id", auth, deleteStudent);
router.put('/:id/profile-image', auth, upload.single('image'), updateStudentProfileImage);
export default router;
