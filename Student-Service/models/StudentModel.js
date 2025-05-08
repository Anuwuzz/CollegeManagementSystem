const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    student_id: { type: Number, required: true, unique: true },
    student_name: { type: String, required: true },
    phone_no: { type: String, required: true },
    department: { type: String, required: true },
    marks: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

module.exports = mongoose.model('Student', studentSchema);
