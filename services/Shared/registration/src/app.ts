
import express from 'express';
import staffRouter from './routers/staffRouter';
import userRouter from './routers/userRouter';
import patientRouter from './routers/patientRouter';
import { loginUser } from './controllers/loginController';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 10000;

app.use(express.json());

app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
}));


app.use('/staff', staffRouter);
app.use('/user',userRouter );
app.use('/patient', patientRouter);
app.use('/login', loginUser);


app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});