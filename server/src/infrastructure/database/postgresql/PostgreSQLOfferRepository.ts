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
      "INSERT INTO offers (id, offerDescription, offerMedia, offerStatus, price, postingTime, jobId, workerId) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", 
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
    return new Offer(result.rows[0])
  }
}