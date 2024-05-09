class Job {
  public id: string
  public userId: string
  public title: string
  public description: string
  public tags: string[]
  public media: string[]
  public status: string
  public createdAt: Date
  public updatedAt: Date

  constructor(data: Job) {
    this.id = data.id
    this.userId = data.userId
    this.title = data.title
    this.description = data.description
    this.tags = data.tags
    this.media = data.media
    this.status = data.status
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
  }
}