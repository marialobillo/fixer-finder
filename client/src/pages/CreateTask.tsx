import React, { useState } from 'react';


const CreateTask = () => {
  const [taskTitle, setTaskTitle] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <div>
      <form action="">
        <input 
          type="text"
          value={taskTitle}
          onChange={handleInputChange} 
          placeholder="Enter task title" />
        <button type="submit">Create Task</button>
      </form>
      <p>Task Title: {taskTitle}</p>
    </div>
  )
}

export default CreateTask
