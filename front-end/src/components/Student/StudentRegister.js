import React, { useState } from 'react';
import { registerStudent } from './../services/studentService';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

const StudentRegister = () => {
  const [formData, setFormData] = useState({
    student_id: '',
    student_name: '',
    phone_no: '',
    department: '',
    marks: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the email ends with @gmail.com
    if (!formData.email.endsWith('@gmail.com')) {
      setError('Email must end with @gmail.com');
      return;
    }

    try {
      const response = await registerStudent(formData);
      alert('Student registered successfully!');
      setFormData({
        student_id: '',
        student_name: '',
        phone_no: '',
        department: '',
        marks: '',
        email: '',
        password: ''
      }); // Clear form
      setError(''); // Clear any existing error
      navigate('/student/login'); // Redirect to student login page
    } catch (error) {
      console.error('There was an error registering the student!', error);
      setError('There was an error registering the student. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="student_id">Student ID</label>
          <input
            type="text"
            className="form-control"
            id="student_id"
            name="student_id"
            value={formData.student_id}
            onChange={handleChange}
            placeholder="Enter Student ID"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="student_name">Student Name</label>
          <input
            type="text"
            className="form-control"
            id="student_name"
            name="student_name"
            value={formData.student_name}
            onChange={handleChange}
            placeholder="Enter Student Name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone_no">Phone Number</label>
          <input
            type="tel"
            className="form-control"
            id="phone_no"
            name="phone_no"
            value={formData.phone_no}
            onChange={handleChange}
            placeholder="Enter Phone Number"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="department">Department</label>
          <input
            type="text"
            className="form-control"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="Enter Department"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="marks">Marks</label>
          <input
            type="number"
            className="form-control"
            id="marks"
            name="marks"
            value={formData.marks}
            onChange={handleChange}
            placeholder="Enter Marks"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter Password"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      </form>
    </div>
  );
};

export default StudentRegister;
