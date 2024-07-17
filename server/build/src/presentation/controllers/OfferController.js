"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferController = void 0;
const joi_1 = __importDefault(require("joi"));
const createOfferUseCase_1 = require("../../application/use-cases/createOfferUseCase");
const PostgreSQLOfferRepository_1 = require("../../infrastructure/database/postgresql/PostgreSQLOfferRepository");
function isError(error) {
    return error instanceof Error;
}
const OfferSchema = joi_1.default.object({
    id: joi_1.default.string().optional(),
    offerDescription: joi_1.default.string().required(),
    offerMedia: joi_1.default.string().optional(),
    offerStatus: joi_1.default.string().required(),
    price: joi_1.default.number().required(),
    postingTime: joi_1.default.date().required(),
    jobId: joi_1.default.string().required(),
    workerId: joi_1.default.string().required()
});
class OfferController {
    constructor() {
        const offerRepository = new PostgreSQLOfferRepository_1.PostgreSQLOfferRepository();
        this.createOfferUseCase = new createOfferUseCase_1.CreateOfferUseCase(offerRepository);
    }
    async createOffer(req, res) {
        try {
            const { error } = OfferSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ message: error.message });
            }
            const offerData = req.body;
            const offer = await this.createOfferUseCase.execute(offerData);
            res.status(201).json(offer);
        }
        catch (error) {
            if (isError(error)) {
                return res.status(500).json({ message: error.message });
            }
            else {
                return res.status(500).json({ message: 'An unexpected error occurred.' });
            }
        }
    }
}
exports.OfferController = OfferController;
