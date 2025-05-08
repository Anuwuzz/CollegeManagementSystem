import axios from 'axios';

const API_URL = 'http://localhost:3001/api/students'; 

// Function to register a new student
export const registerStudent = (studentData) => {
  return axios.post(`${API_URL}/register`, studentData);
};

// Function for student login
export const loginStudent = (credentials) => {
  return axios.post(`${API_URL}/login`, credentials);
};

// Function to get all students
export const getStudents = () => {
  return axios.get(API_URL);
};

// Function to update a student by ID
export const updateStudent = (studentData) => {
  return axios.put(`${API_URL}/update`, studentData);
};


export const deleteStudent = (student_id) => {
  return axios.delete(`${API_URL}/delete`,student_id);
};
