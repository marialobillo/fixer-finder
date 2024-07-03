import { useState, useEffect } from 'react'
import { Task } from '../types/taskTypes'
import { getTasksByCriteria } from '../services/taskService'


const TaskListForProfessionals = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [tags, setTags] = useState<string>('')
  const [search, setSearch] = useState<string>('')

  const loadTasksByCriteria = async () => {
    try {
      const fetchedTasks = await getTasksByCriteria({ tags, search })
      setTasks(fetchedTasks)
    } catch (error) {
      console.log("Error fetching tasks: ", error)
    }
  }

  useEffect(() => {
    loadTasksByCriteria()
  }, [tags, search])
  return (
    <div>
      <h1>Task List for Professionals</h1>

      <div>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tags (comma separated)..."
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>Tags: {task.tags.join(', ')}</p>
            <p>Location: {task.location}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TaskListForProfessionals
