const Faculty = require('../models/FacultyModel');
const bcrypt = require('bcryptjs');
require('dotenv').config();

exports.registerFaculty = async (req, res) => {
  const { faculty_id, faculty_name, department, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newFaculty = await Faculty.create({ faculty_id, faculty_name, department, email, password: hashedPassword });
    res.status(201).json(newFaculty);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.loginFaculty = async (req, res) => {
  const { email, password } = req.body;
  try {
    const faculty = await Faculty.findOne({ email });
    if (!faculty) return res.status(404).json({ message: 'Faculty not found' });

    const isMatch = await bcrypt.compare(password, faculty.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    res.json({ message: 'Login successful',faculty: {
      faculty_id: faculty.faculty_id,
      faculty_name: faculty.faculty_name,
      department: faculty.department,
      email: faculty.email
    } });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteFaculty = async (req, res) => {
  const { faculty_id } = req.params;
  try {
    await Faculty.findOneAndDelete({ faculty_id });
    res.json({ message: 'Faculty deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateFaculty = async (req, res) => {
  const { faculty_id, faculty_name, department, email } = req.body;
  try {
    const updatedFaculty = await Faculty.findOneAndUpdate(
      { faculty_id },
      { faculty_name, department, email },
      { new: true }
    );
    if (!updatedFaculty) {
      return res.status(404).json({ message: 'Faculty not found' });
    }
    res.json(updatedFaculty);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllFaculties = async (req, res) => {
  try {
    const faculties = await Faculty.find().select('-password');
    res.json(faculties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
