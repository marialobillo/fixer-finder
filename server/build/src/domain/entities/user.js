"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const node_crypto_1 = require("node:crypto");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class User {
    constructor({ id, email, password, createdAt }) {
        this.id = id || (0, node_crypto_1.randomUUID)();
        this.email = email;
        this.password = password;
        this.createdAt = createdAt ?? new Date();
    }
    async hashPassword() {
        return this.password = await bcryptjs_1.default.hash(this.password, 10);
    }
    async verifyPassword(password) {
        console.log('password', password, this.password);
        return bcryptjs_1.default.compare(password, this.password);
    }
}
exports.User = User;
