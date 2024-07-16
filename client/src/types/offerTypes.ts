

export interface OfferData {
  job_id?: string
  worker_id?: string
  offer_description: string
  offer_media: File | null
  offer_status: string
  posting_time: string
  price: string
}