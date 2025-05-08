const express = require('express');
const connectDB = require('./config/db');
const facultyRoutes = require('./routes/FacultyRoutes');
const Eureka = require('eureka-js-client').Eureka;
require('dotenv').config();
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
 
const app = express();
 
// Connect to DB
connectDB();
 
// Middleware
app.use(express.json());
app.use(cors());
 
// Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Faculty Feedback API',
      version: '1.0.0',
      description: 'API documentation for faculty feedback system'
    },
    servers: [
      {
        url: 'http://localhost:3002'
      }
    ]
  },
  apis: ['./routes/*.js'], // Location of your route files
};
 
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
 
// Routes
app.use('/api/faculties', facultyRoutes);
 
// Health Check Endpoints
app.get('/health', (req, res) => {
  res.status(200).send('Healthy'); // Simple health status response
});
 
app.get('/info', (req, res) => {
  res.send({
    status: 'UP',
  });
});
 
// Define the port from environment or default
const PORT = process.env.PORT || 3002;
 
// Create an instance of the Eureka client
const client = new Eureka({
  instance: {
    app: 'faculty-service', // Ensure this matches your service name
    hostName: 'localhost',
    ipAddr: '127.0.0.1',
    statusPageUrl: `http://localhost:${PORT}/info`,
    healthCheckUrl: `http://localhost:${PORT}/health`,
    port: {
      '$': PORT,
      '@enabled': 'true',
    },
    vipAddress: 'faculty-service', // Ensure this matches your service name
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    },
  },
  eureka: {
    host: 'localhost',
    port: 8761,
    servicePath: '/eureka/apps/',
  },
});
 
// Start the Eureka client
client.start((error) => {
  if (error) {
    console.log('Eureka client failed to start:', error);
  } else {
    console.log('Eureka client started successfully');
  }
});
 
// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
 
// Handle process termination and deregister from Eureka
process.on('SIGINT', () => {
  client.stop(() => {
    console.log('Eureka client stopped');
    process.exit();
  });
});