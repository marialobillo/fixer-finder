"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgreSQLClient = void 0;
const pg_1 = require("pg");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
class PostgreSQLClient {
    constructor() {
        this.pool = new pg_1.Pool({
            user: process.env.PG_USER,
            host: process.env.PG_HOST,
            database: process.env.PG_DATABASE,
            password: process.env.PG_PASSWORD,
            port: process.env.PG_PORT ? parseInt(process.env.PG_PORT, 10) : 5433,
        });
    }
    static getInstance() {
        if (!PostgreSQLClient.instance) {
            PostgreSQLClient.instance = new PostgreSQLClient();
        }
        return PostgreSQLClient.instance;
    }
    async query(query, params) {
        const client = await this.pool.connect();
        try {
            const res = await client.query(query, params);
            return res;
        }
        catch (error) {
            console.log('Error executing query: ', error);
        }
        finally {
            client.release();
        }
    }
}
exports.PostgreSQLClient = PostgreSQLClient;
