import React, { ChangeEvent, FormEvent, useState } from 'react';

interface Task {
  title: string;
  description: string;
  location: string;
  price: string;
  dueDate: string;
  images: (File | string)[]
}

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
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleInputChange}
            placeholder="Enter task title"
          />
          {errors.title && <p style={{ color: 'red' }}>{errors.title}</p>}
        </div>
        <div>
          <textarea
            name="description"
            value={task.description}
            onChange={handleInputChange}
            placeholder="Enter task description"
          />
          {errors.description && <p style={{ color: 'red' }}>{errors.description}</p>}
        </div>
        <div>
          <input
            type="text"
            name="location"
            value={task.location}
            onChange={handleInputChange}
            placeholder="Enter location"
          />
          {errors.location && <p style={{ color: 'red' }}>{errors.location}</p>}
        </div>
        <div>
          <input
            type="text"
            name="price"
            value={task.price}
            onChange={handleInputChange}
            placeholder="Enter price"
          />
          {errors.price && <p style={{ color: 'red' }}>{errors.price}</p>}
        </div>
        <div>
          <input
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={handleInputChange}
            placeholder="By when should it be done"
          />
          {errors.dueDate && <p style={{ color: 'red' }}>{errors.dueDate}</p>}
        </div>
        <div>
          <input
            type="file"
            name="images"
            onChange={handleFileChange}
            multiple
          />
        </div>
        <button type="submit">Create Task</button>
      </form>
      <p>Task Title: {task.title}</p>
      <p>Task Description: {task.description}</p>
      <p>Location: {task.location}</p>
      <p>Price: {task.price}</p>
      <p>Due Date: {task.dueDate}</p>
      <p>Images: {task.images && task.images.map((file, index) => typeof file === 'string' ? file : file.name).join(', ')}</p>
    </div>
  )
}

export default CreateTask
