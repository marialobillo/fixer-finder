import { useState, useEffect } from 'react'
import { Task } from '../types/taskTypes'
import { getAllTasks } from '../services/taskService'
import './GetAllTasks.css';

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
    <div className="tasks-container">
      <h2>All Tasks</h2>
      <ul className="tasks-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            <h3 className="task-title">{task.title}</h3>
            <p className="task-description">{task.description}</p>
            <p className="task-location">Location: {task.location}</p>
            <p className="task-price">Price: {task.price}</p>
            <p className="task-dueDate">Due Date: {task.dueDate}</p>
            <div className="task-tags">
              {task.tags.map((tag, index) => (
                <span key={index} className="task-tag">{tag}</span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default GetAllTasks
