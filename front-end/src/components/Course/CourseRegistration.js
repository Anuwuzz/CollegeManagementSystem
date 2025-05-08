import React, { useState } from 'react';
import { registerCourse } from './../services/courseService';

const CourseRegistration = () => {
  // Initialize state with id, name, description, and credits
  const [courseData, setCourseData] = useState({ id: '', name: '', description: '', credits: 0 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerCourse(courseData);
      alert('Course registered successfully!');
      setCourseData({ id: '', name: '', description: '', credits: 0 }); // Reset form after submission
    } catch (error) {
      console.error('Error registering course:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register Course</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="id">ID</label>
          <input
            type="text"
            className="form-control"
            id="id"
            name="id"
            value={courseData.id}
            onChange={handleChange}
            placeholder='Enter Course Id'
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={courseData.name}
            onChange={handleChange}
            placeholder='Enter Course Name'
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={courseData.description}
            onChange={handleChange}
            placeholder='Enter Course Description'
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="credits">Credits</label>
          <input
            type="number"
            className="form-control"
            id="credits"
            name="credits"
            value={courseData.credits}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default CourseRegistration;
