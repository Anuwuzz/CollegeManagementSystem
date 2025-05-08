import React, { useState, useEffect } from 'react';
import { loginFaculty } from './../services/facultyService';
import { Table, Container, Spinner, Alert } from 'react-bootstrap';

const FacultyLogin = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [facultyInfo, setFacultyInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Check if the email ends with @gmail.com
    if (!credentials.email.endsWith('@gmail.com')) {
      setError('Email must end with @gmail.com');
      setLoading(false);
      return;
    }

    try {
      const response = await loginFaculty(credentials);
      alert('Login successful!');
      setFacultyInfo(response.data.faculty);
      setError('');
    } catch (error) {
      setError('Check Email and Password!');
      console.error('Error logging in:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('Faculty Info:', facultyInfo);
  }, [facultyInfo]);

  return (
    <Container className="mt-5">
      {!facultyInfo ? (
        <>
          <h2>Faculty Login</h2>
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

            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
          </form>
        </>
      ) : (
        <div className="mt-4">
          <h3>Faculty Details</h3>
          <Table striped bordered hover responsive className="mt-3">
            <thead className="table-dark">
              <tr>
                <th>Attribute</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Faculty ID</td>
                <td>{facultyInfo.faculty_id}</td>
              </tr>
              <tr>
                <td>Name</td>
                <td>{facultyInfo.faculty_name}</td>
              </tr>
              <tr>
                <td>Department</td>
                <td>{facultyInfo.department}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{facultyInfo.email}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
};

export default FacultyLogin;
