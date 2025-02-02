import express from 'express';
import cors from 'cors';

import { TaskController } from '../../presentation/controllers/TaskController';
import { OfferController } from '../../presentation/controllers/OfferController';
import { UserController } from '../../presentation/controllers/UserController';
import compression from 'compression';
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
import { loggerMiddleware } from './../../logger';
import actuator from 'express-actuator';

const swaggerDocument = YAML.load('./swagger.yaml')
const swaggerOptions = {
    explorer: true,
    swaggerOptions: {
        url: '/api-docs/swagger.json'
    }
}

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Compress all responses
app.use(compression({
    level: 6,
    threshold: 1
}))
// Swagger docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(loggerMiddleware);
app.use(actuator());


const taskController = new TaskController();
const offerController = new OfferController();
const userController = new UserController();

// API Endpoints
app.post('/tasks', (req, res) => taskController.createTask(req, res));
app.get('/tasks', (req, res) => taskController.getAllTask(req, res));

app.post('/offers', (req, res) => offerController.createOffer(req, res));

app.post('/users', (req, res) => userController.createUser(req, res));
app.post('/users/login', (req, res) => userController.loginUser(req, res));

app.get('/hello', (req, res) => {
    console.log('Hello World');
    res.send('Hello World!')
});

export { app };