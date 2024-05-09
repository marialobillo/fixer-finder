
class User {
  public id: string
  public name: string
  public email: string 
  public password: string
  public phone: string
  public createdAt: Date
  public updatedAt: Date

  constructor(data: User) {
    this.id = data.id
    this.name = data.name
    this.email = data.email
    this.password = data.password
    this.phone = data.phone
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
  }
}