import { randomUUID } from "node:crypto";

export interface OfferProps {
    id?: string
    offerDescription: string
    offerMedia: string | null
    postingTime: Date
    price: number
    offerStatus: string
    jobId: string
    workerId: number
}

export class Offer {
    public id?: string
    public offerDescription: string
    public offerMedia: string | null
    public postingTime: Date
    public price: number
    public offerStatus: string
    public jobId: string
    public workerId: number

    constructor({ id, offerDescription, offerMedia, postingTime, price, offerStatus, jobId, workerId }: OfferProps) {
        this.id = id ?? randomUUID();
        this.offerDescription = offerDescription;
        this.offerMedia = offerMedia;
        this.postingTime = postingTime;
        this.price = price;
        this.offerStatus = offerStatus;
        this.jobId = jobId;
        this.workerId = workerId;
    }
}