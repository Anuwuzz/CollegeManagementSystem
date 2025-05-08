import React, { useState } from 'react';
import { deleteStudent } from './../services/studentService';
import { useNavigate } from 'react-router-dom';

const StudentDelete = () => {

  const [formData, setFormData] = useState({
    student_id: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await deleteStudent(formData);
      alert('Student deleted successfully!');
      setFormData({
        student_id: ''
      }); // Clear form
      navigate('/student/login');
    } catch (error) {
      console.error('There was an error deleting the student!', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Delete Student</h2>
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
        <button type="submit" className="btn btn-primary">Delete</button>
      </form>
    </div>
  );
};

export default StudentDelete;
