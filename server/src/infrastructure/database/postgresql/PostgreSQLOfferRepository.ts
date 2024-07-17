import { OfferRepository } from "../../persistence/OfferRepository";
import { Offer, OfferProps } from "../../../domain/entities/offer";
import { PostgreSQLClient } from "./PostgreSQLClient";


export class PostgreSQLOfferRepository implements OfferRepository {
  private client: PostgreSQLClient

  constructor() {
    this.client = PostgreSQLClient.getInstance()
  }

  async create(offerData: OfferProps): Promise<Offer> {
    const offer = new Offer(offerData)
    const result = await this.client.query(
      "INSERT INTO offers (id, offer_description, offer_media, offer_status, price, posting_time, job_id, worker_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", 
      [
        offer.id,
        offer.offerDescription,
        offer.offerMedia,
        offer.offerStatus,
        offer.price,
        offer.postingTime,
        offer.jobId,
        offer.workerId
      ]
    );
    if (!result || !result.rows || result.rows.length === 0) {
      throw new Error('Failed to create offer, no data returned')
    }
    const dbOffer = result.rows[0];
    const offerRow = {
      id: dbOffer.id,
      offerDescription: dbOffer.offer_description,
      offerMedia: dbOffer.offer_media,
      postingTime: dbOffer.posting_time,
      price: dbOffer.price,
      offerStatus: dbOffer.offer_status,
      jobId: dbOffer.job_id,
      workerId: dbOffer.worker_id,
  };
    return new Offer(offerRow)
  }
}