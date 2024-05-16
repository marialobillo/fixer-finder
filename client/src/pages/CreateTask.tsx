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
    <div className="container">
      <h3 className="text-5xl font-extrabold dark:text-white my-6">Create Task</h3>
      <form onSubmit={handleSubmit} className="">
        <div className="grid md:grid-cols-2 md:gap-6">
        <div>
          <label 
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Title</label>
          <input
            type="text"
            name="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={task.title}
            onChange={handleInputChange}
          />
          {errors.title && <p style={{ color: 'red' }}>{errors.title}</p>}
        </div>
        <div>
          <label 
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="description">Description</label>
          <textarea
            name="description"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={task.description}
            onChange={handleInputChange}
          />
          {errors.description && <p style={{ color: 'red' }}>{errors.description}</p>}
        </div>
        <div>
          <label 
            htmlFor="location"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Location</label>
          <input
            type="text"
            name="location"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={task.location}
            onChange={handleInputChange}
          />
          {errors.location && <p style={{ color: 'red' }}>{errors.location}</p>}
        </div>
        <div>
          <label 
            htmlFor="price"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Price</label>
          <input
            type="text"
            name="price"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={task.price}
            onChange={handleInputChange}
          />
          {errors.price && <p style={{ color: 'red' }}>{errors.price}</p>}
        </div>
        <div>
          <label 
            htmlFor="dueDate"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Due Date</label>
          <input
            type="date"
            name="dueDate"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={task.dueDate}
            onChange={handleInputChange}
          />
          {errors.dueDate && <p style={{ color: 'red' }}>{errors.dueDate}</p>}
        </div>
        <div>
          <label 
            htmlFor="images"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Media</label>
          <input
            type="file"
            name="images"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleFileChange}
            multiple
          />
        </div>
        </div>
        
        <button 
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto my-3 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >Create Task</button>
      </form>
    </div>
  )
}

export default CreateTask
