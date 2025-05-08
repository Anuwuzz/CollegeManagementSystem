import React, { useState } from 'react';
import { deleteFaculty } from './../services/facultyService';
import { useNavigate } from 'react-router-dom';

const FacultyDelete = () => {
  const [formData, setFormData] = useState({
    faculty_id: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData.faculty_id)
      const response = await deleteFaculty(formData);
      alert('Faculty deleted successfully!');
      setFormData({
        faculty_id: ''
      }); // Clear form
      navigate('/faculty/login');
    } catch (error) {
      console.error('Error deleting faculty:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Delete Faculty</h2>
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
        <button type="submit" className="btn btn-primary">Delete</button>
      </form>
    </div>
  );
};

export default FacultyDelete;
