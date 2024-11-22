
import Student from "../models/student.js";
import Class from "../models/class.js";
import cloudinary from '../config/cloudinary.js';

export const addStudent = async (req, res) => {
  try {
    const { name, email, classId } = req.body;

    if (!name || !email || !classId) {
      return res.status(400).json({
        error: 'All fields (name, email, classId) are required.',
      });
    }
    const classExists = await Class.findById(classId);
    if (!classExists) {
      return res.status(400).json({
        error: 'Invalid classId. The specified class does not exist.',
      });
    }

    let profileImageUrl = null;
    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path);
        profileImageUrl = result.secure_url;
      } catch (uploadError) {
        return res.status(500).json({
          error: 'Failed to upload profile image.',
        });
      }
    }
    const newStudent = await Student.create({
      name,
      email,
      classId,
      profileImageUrl,
    });

    await Class.findByIdAndUpdate(classId, { $inc: { studentCount: 1 } });

    res.status(201).json(newStudent);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Internal server error.' });
  }
};

export const getAllStudents = async (req, res) => {
  try {
    const { classId, page = 1, limit = 10 } = req.query; 
    const filter = classId ? { classId } : {};


    const skip = (page - 1) * limit;

    const students = await Student.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .populate("classId");

    const total = await Student.countDocuments(filter); 

    res.status(200).json({
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit),
      data: students,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSingleStudent = async (req, res) => {
    try{
        const student = await Student.findById(req.params.id);
    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({student});
    }catch(error){
        return console.log(error)
    }
  };

  export const updateStudent = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;
      
      const updatedStudent = await Student.findByIdAndUpdate(id, updatedData, {
        new: true,
      }).populate("classId");
      
      res.status(200).json(updatedStudent);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const deleteStudent = async (req, res) => {
    try {
      const { id } = req.params;
      const student = await Student.findById(id);
      if (!student) {
        return res.status(404).json({ error: 'Student not found.' });
      }
  
      if (student.isDeleted) {
        return res.status(400).json({ error: 'Student is already deleted.' });
      }
  
      student.isDeleted = true;
      await student.save();
      await Class.findByIdAndUpdate(student.classId, { $inc: { studentCount: -1 } });
      res.status(200).json({ message: 'Student deleted successfully.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  export const updateStudentProfileImage = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await cloudinary.uploader.upload(req.file.path);
      const updatedStudent = await Student.findByIdAndUpdate(id, { profileImageUrl: result.secure_url }, { new: true });
      res.status(200).json(updatedStudent);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  