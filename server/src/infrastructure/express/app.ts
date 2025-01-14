import express from 'express';
import cors from 'cors';

import { TaskController } from '../../presentation/controllers/TaskController';
import { OfferController } from '../../presentation/controllers/OfferController';
import { UserController } from '../../presentation/controllers/UserController';

const app = express();
app.use(cors());
app.use(express.json());

const taskController = new TaskController();
const offerController = new OfferController();
const userController = new UserController();

// API Endpoints
app.post('/tasks', (req, res) => taskController.createTask(req, res));
app.get('/tasks', (req, res) => taskController.getAllTask(req, res));

app.post('/offers', (req, res) => offerController.createOffer(req, res));

app.post('/users', (req, res) => userController.createUser(req, res));

app.get('/hello', (req, res) => {
    console.log('Hello World');
    res.send('Hello World!')
});

export { app };