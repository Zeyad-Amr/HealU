const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');


dotenv.config(); // Load environment variables from .env file

const connectionModule = require('./Database/connection');

const DeviceRoute = require('./routes/deviceRouter');

const Device_app = express();
Device_app.use(cors());

const PORT = process.env.PORT|| 3000;

//====================================================================================//
Device_app.use(cors({
  origin: 'http://localhost:3000',
  // Other options...
}));


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
