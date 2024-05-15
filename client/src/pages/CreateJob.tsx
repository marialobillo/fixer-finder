import React, { useState } from 'react';


const CreateJob = () => {
  const [jobTitle, setJobTitle] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJobTitle(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('Job Title:', jobTitle )
  }

  return (
    <div>
      <form action="">
        <input 
          type="text"
          value={jobTitle}
          onChange={handleInputChange} 
          placeholder="Enter job title" />
        <button type="submit">Create Job</button>
      </form>
      
      <p>Job Title: {jobTitle}</p>
    </div>
  )
}

export default CreateJob
