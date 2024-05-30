import { ChangeEvent, FormEvent, useState } from 'react'
import "./CreateTask.css"
import { Task } from '../types/taskTypes'



const CreateTask = () => {
  const [task, setTask] = useState<Task>({
    title: '',
    description: '',
    location: '',
    price: '',
    dueDate: '',
    images: [],
  })
  const [errors, setErrors] = useState<Partial<Task>>({})

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setTask({ ...task, [name]: value })
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      setTask({ ...task, images: Array.from(files) })
    }
  }

  const validate = (): Partial<Task> => {
    const errors: Partial<Task> = {}
    if (!task.title) errors.title = 'Title is required'
    if (!task.description) errors.description = 'Description is required'
    if (!task.location) errors.location = 'Location is required'
    if (!task.price) errors.price = 'Price is required'
    if (!task.dueDate) errors.dueDate = 'Due date is required'
    return errors
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log('Task data:', task);
      // Proceed with form submission (e.g., API call)
    }
  }


  return (
    <>
      <form onSubmit={handleSubmit} className="create-task">
          <div className='title'>Create Task</div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              className=''
              value={task.title}
              onChange={handleInputChange}
              placeholder="Enter task title"
            />
            {errors.title && <p style={{ color: 'red' }}>{errors.title}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              className=''
              value={task.description}
              onChange={handleInputChange}
              placeholder="Enter task description"
            />
            {errors.description && <p style={{ color: 'red' }}>{errors.description}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              name="location"
              className=''
              value={task.location}
              onChange={handleInputChange}
              placeholder="Enter location"
            />
            {errors.location && <p style={{ color: 'red' }}>{errors.location}</p>}
          </div>

        

        
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              name="price"
              className=''
              value={task.price}
              onChange={handleInputChange}
              placeholder="Enter price"
            />
            {errors.price && <p style={{ color: 'red' }}>{errors.price}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              name="dueDate"
              className=''
              value={task.dueDate}
              onChange={handleInputChange}
              placeholder="By when should it be done"
            />
            {errors.dueDate && <p style={{ color: 'red' }}>{errors.dueDate}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="media">Media</label>
            <input
              type="file"
              name="media"
              className=''
              onChange={handleFileChange}
              multiple
            />
          </div>
        
        <button 
          type="submit"
          className=''
          >Create Task</button>
      </form>
      
      <div className="task-preview">
        <h2>Task Preview</h2>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <p>{task.location}</p>
        <p>{task.price}</p>
        <p>{task.dueDate}</p>
        <div>
          {task.images.map((image, index) => (
            <img
              key={index}
              src={typeof image === 'string' ? image : URL.createObjectURL(image)}
              alt={`Task media ${index + 1}`}
            />
          ))}
        </div>
      </div>
   
    </>
    
  )
}

export default CreateTask
