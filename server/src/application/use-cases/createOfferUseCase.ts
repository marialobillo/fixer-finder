import { Offer, OfferProps } from '../../domain/entities/offer';
import { OfferRepository } from '../../infrastructure/persistence/OfferRepository';

export class CreateOfferUseCase {
  private offerRepository: OfferRepository;

  constructor(offerRepository: OfferRepository) {
    this.offerRepository = offerRepository;
  }

  async execute(offerData: OfferProps): Promise<Offer> {
    const offer = await this.offerRepository.create(offerData);
    return offer;
  }
}