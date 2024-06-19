import { useState, useEffect } from 'react'
import { Task } from '../types/taskTypes'
import { getAllTasks } from '../services/taskService'

const GetAllTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksData = await getAllTasks();
        setTasks(tasksData);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, [])

  return (
    <div>
      <h2>All Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default GetAllTasks
