"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOfferUseCase = void 0;
class CreateOfferUseCase {
    constructor(offerRepository) {
        this.offerRepository = offerRepository;
    }
    async execute(offerData) {
        const offer = await this.offerRepository.create(offerData);
        return offer;
    }
}
exports.CreateOfferUseCase = CreateOfferUseCase;
