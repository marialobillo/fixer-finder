"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Offer = void 0;
const node_crypto_1 = require("node:crypto");
class Offer {
    constructor({ id, offerDescription, offerMedia, postingTime, price, offerStatus, jobId, workerId }) {
        this.id = id ?? (0, node_crypto_1.randomUUID)();
        this.offerDescription = offerDescription;
        this.offerMedia = offerMedia;
        this.postingTime = postingTime;
        this.price = price;
        this.offerStatus = offerStatus;
        this.jobId = jobId;
        this.workerId = workerId;
    }
}
exports.Offer = Offer;
