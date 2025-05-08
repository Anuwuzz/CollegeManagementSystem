import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Visualizations = () => {
  const [barChart, setBarChart] = useState('');
  const [pieChart, setPieChart] = useState('');

  useEffect(() => {
    // Fetch visualizations (bar and pie charts) from the Flask backend
    axios.get('http://localhost:5000/visualizations')
      .then(response => {
        setBarChart(response.data.bar_image);
        setPieChart(response.data.pie_image);
      })
      .catch(error => {
        console.error('Error fetching visualizations:', error);
      });
  }, []);

  const styles = {
    container: {
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    heading: {
      textAlign: 'center',
      marginBottom: '30px',
      fontSize: '2rem',
      color: '#333',
    },
    chartsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px',
    },
    chartCard: {
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    },
    chartImage: {
      width: '100%',
      height: 'auto',
      display: 'block',
      transition: 'opacity 0.3s ease-in-out',
    },
    chartCardHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
    },
    chartImageHover: {
      opacity: '0.9',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Feedback Visualizations</h2>
      <div style={styles.chartsGrid}>
        {barChart && (
          <div 
            style={styles.chartCard} 
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = styles.chartCardHover.transform;
              e.currentTarget.style.boxShadow = styles.chartCardHover.boxShadow;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = styles.chartCard.boxShadow;
            }}
          >
            <img 
              src={`data:image/png;base64,${barChart}`} 
              alt="Bar Chart" 
              style={styles.chartImage} 
              onMouseEnter={(e) => e.currentTarget.style.opacity = styles.chartImageHover.opacity}
              onMouseLeave={(e) => e.currentTarget.style.opacity = ''}
            />
          </div>
        )}
        {pieChart && (
          <div 
            style={styles.chartCard} 
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = styles.chartCardHover.transform;
              e.currentTarget.style.boxShadow = styles.chartCardHover.boxShadow;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = styles.chartCard.boxShadow;
            }}
          >
            <img 
              src={`data:image/png;base64,${pieChart}`} 
              alt="Pie Chart" 
              style={styles.chartImage} 
              onMouseEnter={(e) => e.currentTarget.style.opacity = styles.chartImageHover.opacity}
              onMouseLeave={(e) => e.currentTarget.style.opacity = ''}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Visualizations;
