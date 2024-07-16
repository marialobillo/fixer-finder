import { Offer, OfferProps } from '../../domain/entities/offer';


export interface OfferRepository {
  create(offerData: OfferProps): Promise<Offer>
}