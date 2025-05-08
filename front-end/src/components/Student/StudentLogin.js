import React, { useState, useEffect } from 'react';
import { loginStudent } from './../services/studentService';
import { Table, Container, Spinner, Alert } from 'react-bootstrap';

const StudentLogin = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [studentInfo, setStudentInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!credentials.email.endsWith('@gmail.com')) {
      setError('Email must end with @gmail.com');
      setLoading(false);
      return;
    }

    try {
      const response = await loginStudent(credentials);
      alert('Login successful!');
      setStudentInfo(response.data.student);
      setError('');
    } catch (error) {
      if (!error.response) {
        // Network error or server not reachable
        setError('Service temporarily unavailable, server under maintenance.');
      } else if (error.response.status >= 500) {
        // Server error
        setError('Server error, please try again later.');
      } else {
        // Other errors (like validation errors)
        setError('Check Email and Password!');
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('Student Info:', studentInfo);
  }, [studentInfo]);

  return (
    <Container className="mt-5">
      {!studentInfo ? (
        <>
          <h2>Student Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
          {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        </>
      ) : (
        <div className="mt-4">
          <h3>Student Details</h3>
          <Table striped bordered hover responsive className="mt-3">
            <thead className="table-dark">
              <tr>
                <th>Attribute</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Student ID</td>
                <td>{studentInfo.student_id}</td>
              </tr>
              <tr>
                <td>Name</td>
                <td>{studentInfo.student_name}</td>
              </tr>
              <tr>
                <td>Phone Number</td>
                <td>{studentInfo.phone_no}</td>
              </tr>
              <tr>
                <td>Department</td>
                <td>{studentInfo.department}</td>
              </tr>
              <tr>
                <td>Marks</td>
                <td>{studentInfo.marks}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{studentInfo.email}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
};

export default StudentLogin;
