const express = require('express');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

const connectionModule = require('./DataBase/connection');

const RecordRoute = require('./routes/recordRouter');
const PrescriptionRoute = require('./routes/prescriptionRouter');
const medicalHistoryRoute = require('./routes/historyRouter');

const EMR_app = express();
const PORT =  process.env.PORT;

//====================================================================
EMR_app.listen(PORT, () => {
  console.log(`SERVER: http://localhost:${PORT}`);
  connectionModule.connect((err) => {
    if (err) throw err;
    console.log('DATABASE CONNECTED');
  });
});
//====================================================================
EMR_app.use(express.json());
EMR_app.use('/', RecordRoute);
EMR_app.use('/', PrescriptionRoute);
EMR_app.use('/', medicalHistoryRoute);
