import React, { useState } from 'react';
import { updateCourse } from './../services/courseService';

const CourseUpdate = ({ courseId }) => {
  const [courseData, setCourseData] = useState({ title: '', description: '', duration: '' });

  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCourse(courseId, courseData);
      alert('Course updated successfully!');
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Update Course</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={courseData.title}
            onChange={handleChange}
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
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="duration">Duration</label>
          <input
            type="text"
            className="form-control"
            id="duration"
            name="duration"
            value={courseData.duration}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
};

export default CourseUpdate;
