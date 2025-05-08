import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Container, Spinner, Alert } from 'react-bootstrap';

const Top5Faculty = () => {
  const [top5Faculty, setTop5Faculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/top5')
      .then(response => {
        setTop5Faculty(response.data.top5);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch top 5 faculty data.');
        setLoading(false);
        console.error(error);
      });
  }, []);

  return (
    <Container className="mt-5 text-center">
      <h2 className="mb-4">Top 5 Faculty Ratings</h2>

      {loading && <Spinner animation="border" variant="primary" />}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && (
        <Table striped bordered hover responsive className="mt-3">
          <thead className="table-dark">
            <tr>
              <th>Faculty Name</th>
              <th>Average Rating</th>
            </tr>
          </thead>
          <tbody>
            {top5Faculty.length > 0 ? (
              top5Faculty.map(([faculty, rating], index) => (
                <tr key={index}>
                  <td>{faculty}</td>
                  <td>{rating.toFixed(2)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No data available</td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Top5Faculty;
