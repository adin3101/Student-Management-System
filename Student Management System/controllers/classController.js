import Class from '../models/class.js';

export const createClass = async (req, res) => {
  try {
    const { name, teacherId } = req.body;
    const newClass = await Class.create({ name, teacherId });
    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllClasses = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; 
    const skip = (page - 1) * limit; 

  
    const total = await Class.countDocuments();

    
    const totalPages = Math.ceil(total / limit);

   
    if (page > totalPages && totalPages > 0) {
      return res.status(400).json({
        error: `Page ${page} exceeds total pages (${totalPages}).`,
      });
    }


    const classes = await Class.find()
      .skip(skip)
      .limit(parseInt(limit))
      .populate('teacherId'); 

    res.status(200).json({
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages,
      data: classes,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateClass = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedClass = await Class.findByIdAndUpdate(id, updatedData, { new: true });
    res.status(200).json(updatedClass);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteClass = async (req, res) => {
  try {
    const { id } = req.params;
    await Class.findByIdAndDelete(id);
    res.status(200).json({ message: 'Class deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
