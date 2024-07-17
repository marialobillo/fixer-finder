import express from 'express';
import { TaskController } from '../../presentation/controllers/TaskController';
import cors from 'cors';
import { OfferController } from '../../presentation/controllers/OfferController';

const app = express();
app.use(cors());
app.use(express.json());

const taskController = new TaskController();
const offerController = new OfferController();

app.post('/tasks', (req, res) => taskController.createTask(req, res));
app.get('/tasks', (req, res) => taskController.getAllTask(req, res));

app.post('/offers', (req, res) => offerController.createOffer(req, res));

export { app };