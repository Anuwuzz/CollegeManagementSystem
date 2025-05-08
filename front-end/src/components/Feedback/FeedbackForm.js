import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { submitFeedback } from '../services/feedbackService';

const FeedbackForm = () => {
  const [feedbackData, setFeedbackData] = useState({
    faculty: '',
    subject: '',
    rating: '',
    comments: ''
  });

  const handleChange = (e) => {
    setFeedbackData({ ...feedbackData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitFeedback(feedbackData);
      alert('Feedback submitted successfully!');
      setFeedbackData({ faculty: '', subject: '', rating: '', comments: '' });
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Submit Feedback</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="faculty">
          <Form.Label>Faculty Name</Form.Label>
          <Form.Control
            type="text"
            name="faculty"
            value={feedbackData.faculty}
            onChange={handleChange}
            required
            placeholder="Enter faculty name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="subject">
          <Form.Label>Department</Form.Label>
          <Form.Control
            type="text"
            name="subject"
            value={feedbackData.subject}
            onChange={handleChange}
            required
            placeholder="Enter department"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="rating">
          <Form.Label>Rating</Form.Label>
          <Form.Select
            name="rating"
            value={feedbackData.rating}
            onChange={handleChange}
            required
          >
            <option value="">Select a Rating</option>
            <option value="1">1 - Very Poor</option>
            <option value="2">2 - Poor</option>
            <option value="3">3 - Average</option>
            <option value="4">4 - Good</option>
            <option value="5">5 - Excellent</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="comments">
          <Form.Label>Comments</Form.Label>
          <Form.Control
            as="textarea"
            name="comments"
            value={feedbackData.comments}
            onChange={handleChange}
            rows={3}
            placeholder="Write your feedback here..."
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </div>
  );
};

export default FeedbackForm;
