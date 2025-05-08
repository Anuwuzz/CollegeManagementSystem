import axios from 'axios';

const API_URL = 'http://localhost:8080/api/courses'; 

export const registerCourse = (courseData) => {
  return axios.post(`${API_URL}`, courseData);
};

export const getCourses = () => {
  return axios.get(API_URL);
};

export const updateCourse = (id, courseData) => {
  return axios.put(`${API_URL}/${id}`, courseData);
};
