class Offer {
  public id: string
  public jobId: string
  public workerId: string
  public description: string
  public media: string[]
  public status: string
  public price: number
  public createdAt: Date
  public updatedAt: Date

  constructor(data: Offer) {
    this.id = data.id
    this.jobId = data.jobId
    this.workerId = data.workerId
    this.description = data.description
    this.media = data.media
    this.status = data.status
    this.price = data.price
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
  }

}