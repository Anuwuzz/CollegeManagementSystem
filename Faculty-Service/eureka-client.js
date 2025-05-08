const { Eureka } = require('eureka-js-client');
require('dotenv').config();
 
// Configuration for Eureka client
const client = new Eureka({
  instance: {
    app: process.env.EUREKA_APP_NAME,
    hostName: 'localhost',
    ipAddr: '127.0.0.1',
    statusPageUrl: `http://localhost:${process.env.PORT}/info`,
    healthCheckUrl: `http://localhost:${process.env.PORT}/health`,
    port: {
      '$': process.env.PORT,
      '@enabled': 'true',
    },
    vipAddress: process.env.EUREKA_VIP_ADDRESS,
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    },
  },
  eureka: {
    host: process.env.EUREKA_SERVER_HOST,
    port: parseInt(process.env.EUREKA_SERVER_PORT, 10),
    servicePath: '/eureka/apps/',
  },
});
 
module.exports = client;