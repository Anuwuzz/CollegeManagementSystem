const express = require('express');
const connectDB = require('./config/db');
const studentRoutes = require('./routes/StudentRoutes');
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
app.use(cors()); // Enable CORS for all origins
 
// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Student API',
      version: '1.0.0',
      description: 'API for managing student data',
    },
    servers: [
      {
        url: 'http://localhost:' + (process.env.PORT || 3001),
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to your API route docs
};
 
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
 
// Routes
app.use('/api/students', studentRoutes);
 
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
const PORT = process.env.PORT || 3001;
 
// Create an instance of the Eureka client
const client = new Eureka({
  instance: {
    app: 'student-service', // Ensure this matches your service name
    hostName: 'localhost',
    ipAddr: '127.0.0.1',
    statusPageUrl: `http://localhost:${PORT}/info`,
    healthCheckUrl: `http://localhost:${PORT}/health`,
    port: {
      '$': PORT,
      '@enabled': 'true',
    },
    vipAddress: 'student-service', // Ensure this matches your service name
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
  console.log(`Server running on http://localhost:${PORT}`);
});
 
// Handle process termination and deregister from Eureka
process.on('SIGINT', () => {
  client.stop(() => {
    console.log('Eureka client stopped');
    process.exit();
  });
});
 