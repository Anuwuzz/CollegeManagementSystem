import React, { useState, useEffect } from 'react';
import { getCourses } from './../services/courseService';

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getCourses();
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Course List</h2>
      {courses.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        <ul className="list-group">
          {courses.map((course) => (
            <li key={course.id} className="list-group-item mb-3">
              <div><strong>Course ID:</strong> {course.id}</div>
              <div><strong>Name:</strong> {course.name}</div>
              <div><strong>Description:</strong> {course.description}</div>
              <div><strong>Credits:</strong> {course.credits}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CourseList;
