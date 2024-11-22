import Teacher from "../models/teacher.js";
import cloudinary from "../config/cloudinary.js";

export const addTeacher = async (req, res) => {
  try {
    const imageUrl = cloudinary.url("Teacher_xwwghu");
    const { name, email, subject } = req.body;
    const newTeacher = await Teacher.create({
      name,
      email,
      subject,
      profileImageUrl: imageUrl,
    });
    res.status(201).json(newTeacher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllTeachers = async (req, res) => {
  try {
    const { classId, page = 1, limit = 10 } = req.query; 
    const filter = classId ? { classId } : {};


    const skip = (page - 1) * limit;

    const teachers = await Teacher.find(filter)
      .skip(skip)
      .limit(parseInt(limit));
      

    const total = await Teacher.countDocuments(filter); 

    res.status(200).json({
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit),
      data: teachers,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSingleTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: "teacher not found" });
    }
    res.status(200).json({ teacher });
  } catch (error) {
    return console.log(error);
  }
};

export const updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedTeacher = await Teacher.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    res.status(200).json(updatedTeacher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await Teacher.findById(id);
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found.' });
    }
    if (teacher.isDeleted) {
      return res.status(400).json({ error: 'Teacher is already deleted.' });
    }

    teacher.isDeleted = true;
    await teacher.save();

    await Class.updateMany({ teacherId: id }, { $unset: { teacherId: "" } });
    res.status(200).json({ message: 'Teacher deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTeacherProfileImage = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await cloudinary.uploader.upload(req.file.path);
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      id,
      { profileImageUrl: result.secure_url },
      { new: true }
    );
    res.status(200).json(updatedTeacher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
