import express from 'express';
import { TaskController } from '../../presentation/controllers/TaskController';
import cors from 'cors';
import { OfferController } from '../../presentation/controllers/OfferController';
import { AuthController } from '../../presentation/controllers/AuthController';

const app = express();
app.use(cors());
app.use(express.json());

const taskController = new TaskController();
const offerController = new OfferController();
const authController = new AuthController();

app.post('/tasks', (req, res) => taskController.createTask(req, res));
app.get('/tasks', (req, res) => taskController.getAllTask(req, res));

app.post('/offers', (req, res) => offerController.createOffer(req, res));

app.post('/regiser', (req, res) => authController.registerUser(req, res));

export { app };