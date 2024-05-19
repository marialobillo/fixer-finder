export interface TaskProps {
  id?: string
  title: string
  description: string
  location: string
  price: number 
  dueDate: Date 
  media: string[]
  tags: string[]
}

export class Task {
  private id?: string
  public title: string
  public description: string 
  public location: string
  public price: number 
  public dueDate: Date 
  public media: string[]
  public tags: string[]

  constructor({id, title, description, location, price, dueDate, media, tags }: TaskProps) {
    this.id = id
    this.title = title
    this.description = description
    this.location = location
    this.price = price
    this.dueDate = dueDate
    this.media = media
    this.tags = tags
  }
}