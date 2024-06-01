"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const node_crypto_1 = require("node:crypto");
class Task {
    constructor({ id, title, description, location, price, dueDate, media, tags }) {
        this.id = id ?? (0, node_crypto_1.randomUUID)();
        this.title = title;
        this.description = description;
        this.location = location;
        this.price = price;
        this.dueDate = dueDate;
        this.media = media;
        this.tags = tags;
    }
}
exports.Task = Task;
