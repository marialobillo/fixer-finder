class Comment {
  public id: string
  public jobId: string
  public userId: string
  public workerId: string
  public role: string 
  public comment: string
  public rating: number

  constructor(data: Comment) {
    this.id = data.id
    this.jobId = data.jobId
    this.userId = data.userId
    this.workerId = data.workerId
    this.role = data.role
    this.comment = data.comment
    this.rating = data.rating
  }
}