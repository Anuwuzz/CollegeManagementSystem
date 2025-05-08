import React, { useState } from 'react';
import { registerFaculty } from './../services/facultyService';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

const FacultyRegister = () => {
  const [formData, setFormData] = useState({
    faculty_id: '',
    faculty_name: '',
    department: '',
    phone_no: '',  // Added phone number field
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

    // Check if the phone number is exactly 10 digits
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone_no)) {
      setError('Phone number must be exactly 10 digits');
      return;
    }

    try {
      const response = await registerFaculty(formData);
      alert('Faculty registered successfully!');
      setFormData({
        faculty_id: '',
        faculty_name: '',
        department: '',
        phone_no: '',  // Clear phone number field
        email: '',
        password: ''
      }); // Clear form
      setError(''); // Clear any existing error
      navigate('/faculty/login'); // Navigate after successful registration
    } catch (error) {
      console.error('Error registering faculty:', error);
      setError('There was an error registering the faculty. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register Faculty</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="faculty_id">Faculty ID</label>
          <input
            type="text"
            className="form-control"
            id="faculty_id"
            name="faculty_id"
            value={formData.faculty_id}
            onChange={handleChange}
            placeholder="Enter Faculty ID"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="faculty_name">Faculty Name</label>
          <input
            type="text"
            className="form-control"
            id="faculty_name"
            name="faculty_name"
            value={formData.faculty_name}
            onChange={handleChange}
            placeholder="Enter Faculty Name"
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
            placeholder="Enter Department Name"
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
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Email Address"
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

export default FacultyRegister;
