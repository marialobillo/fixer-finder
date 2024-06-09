"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const TaskController_1 = require("../../presentation/controllers/TaskController");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
exports.app = app;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const taskController = new TaskController_1.TaskController();
app.post('/tasks', (req, res) => taskController.createTask(req, res));
app.get('/tasks', (req, res) => taskController.getAllTask(req, res));
