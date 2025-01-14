"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const TaskController_1 = require("../../presentation/controllers/TaskController");
const OfferController_1 = require("../../presentation/controllers/OfferController");
const UserController_1 = require("../../presentation/controllers/UserController");
const app = (0, express_1.default)();
exports.app = app;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const taskController = new TaskController_1.TaskController();
const offerController = new OfferController_1.OfferController();
const userController = new UserController_1.UserController();
// API Endpoints
app.post('/tasks', (req, res) => taskController.createTask(req, res));
app.get('/tasks', (req, res) => taskController.getAllTask(req, res));
app.post('/offers', (req, res) => offerController.createOffer(req, res));
app.post('/users', (req, res) => userController.createUser(req, res));
app.get('/hello', (req, res) => {
    console.log('Hello World');
    res.send('Hello World!');
});
