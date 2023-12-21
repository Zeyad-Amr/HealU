const express = require('express');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

const connectionModule = require('./Database/connection');

const DeviceRoute = require('./routes/deviceRouter');

const Device_app = express();
const PORT = 5000;
//====================================================================================//
Device_app.listen(PORT, () => {
  console.log(`SERVER: http://localhost:${PORT}`);
  connectionModule.connect((err) => {
    if (err) {
      console.error('DATABASE CONNECTION ERROR:', err);
      throw err; 
    }
    console.log('DATABASE CONNECTED');
  });
});
//====================================================================================//
Device_app.use(express.json());
Device_app.use('/', DeviceRoute);
