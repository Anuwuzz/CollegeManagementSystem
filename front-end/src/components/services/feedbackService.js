import axios from 'axios';

const API_URL = 'http://localhost:5000'; 

// Submit feedback
export const submitFeedback = (feedbackData) => {
  return axios.post(`${API_URL}/`, feedbackData);
};

// Fetch top 5 faculty ratings
export const fetchTop5 = () => {
  return axios.get(`${API_URL}/top5`);
};

// Fetch visualizations (bar and pie charts)
export const fetchVisualizations = () => {
  return axios.get(`${API_URL}/visualizations`);
};
