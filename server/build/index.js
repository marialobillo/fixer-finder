"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const connectionDB_1 = __importDefault(require("./config/connectionDB"));
const port = process.env.PORT || 3040;
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.get('/', (req, res) => {
    res.send('Hiii!');
});
const start = async () => {
    try {
        await (0, connectionDB_1.default)();
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
    catch (error) {
        console.error('**** Server failed to start ****');
    }
};
start();
