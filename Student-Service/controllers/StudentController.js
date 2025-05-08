const Student = require('../models/StudentModel');
const bcrypt = require('bcryptjs');
require('dotenv').config();

exports.registerStudent = async (req, res) => {
  const { student_id, student_name, phone_no, department, marks, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newStudent = await Student.create({ student_id, student_name, phone_no, department, marks, email, password: hashedPassword });
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.loginStudent = async (req, res) => {
  const { email, password } = req.body;
  try {
    const student = await Student.findOne({ email });
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // If you want to return some data upon successful login, do it here
    
    res.json({ message: 'Login successful',student: {
      student_id: student.student_id,
      student_name: student.student_name,
      phone_no: student.phone_no,
      department: student.department,
      marks: student.marks,
      email: student.email
    } });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteStudent = async (req, res) => {
  const { student_id } = req.params; // or req.params if you prefer using URL parameters
  try {
    await Student.findOneAndDelete({ student_id });
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

exports.updateStudent = async (req, res) => {
    const { student_id, student_name, phone_no, department, marks, email } = req.body;
    try {
      const updatedStudent = await Student.findOneAndUpdate(
        { student_id },  // Ensure this matches existing records
        { student_name, phone_no, department, marks, email },
        { new: true }    // This option returns the updated document
      );
      if (!updatedStudent) {
        return res.status(404).json({ message: 'Student not found' });
      }
      res.json(updatedStudent);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().select('-password'); // Exclude the password field
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
