import axios from 'axios';

const API_URL = 'http://localhost:3002/api/faculties'; 

export const registerFaculty = (facultyData) => {
  return axios.post(`${API_URL}/register`, facultyData);
};

export const loginFaculty = (credentials) => {
  return axios.post(`${API_URL}/login`, credentials);
};

export const getFaculties = () => {
  return axios.get(API_URL);
};

export const updateFaculty = (facultyData) => {
  return axios.put(`${API_URL}/update`, facultyData);
};


export const deleteFaculty = (facultyData) => {
  return axios.delete(`${API_URL}/delete`, facultyData);
};