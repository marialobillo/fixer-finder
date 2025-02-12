import { useState, useEffect, useCallback } from 'react'
import { Task } from '../../types/taskTypes'
import { getTasksByCriteria } from '../../services/taskService'
import './TaskFilter.css'
import { debounce } from 'lodash'
import OfferForm from '../OfferForm'
import { OfferData } from '../../types/offerTypes'
import { createOffer } from '../../services/offerService'

const TaskFilter = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [tags, setTags] = useState<string>('')
  const [search, setSearch] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const [showForm, setShowForm] = useState<boolean>(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  const loadTasksByCriteria = useCallback(async (tags: string, search: string) => {
    setLoading(true);
    try {
      const fetchedTasks = await getTasksByCriteria({ tags, search });
      setTasks(fetchedTasks);
    } catch (error) {
      console.log('Error fetching tasks: ', error);
    } finally {
      setLoading(false);
    }
  }, [])

  useEffect(() => {
    const debouncedLoadTasks = debounce((tags: string, search: string) => {
      loadTasksByCriteria(tags, search);
    }, 300);
    debouncedLoadTasks(tags, search);
    return () => {
      debouncedLoadTasks.cancel(); // Cancel the debounced function on cleanup
    };
  }, [tags, search, loadTasksByCriteria]);

  const handleMakeOfferClick = (task: Task) => {
    setSelectedTask(task)
    setShowForm(true)
  }

  const handleFormSubmit = async (offerPayload: OfferData) => {
    try {
      setShowForm(false)
      setSelectedTask(null)
      const response = await createOffer(offerPayload)
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message)
      } else {
        console.error('An unexpected error occurred.')
      }
    }
  }

  const handleFormCancel = () => {
    setShowForm(false)
    setSelectedTask(null)
  }

  return (
    <div className='tasks-container'>
      <h1>Filtered Tasks</h1>

      <div className='filters'>
        <input
          type='text'
          placeholder='Search...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='filter-input'
        />
        <input
          type='text'
          placeholder='Tags (comma separated)...'
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className='filter-input'
        />
      </div>
      <div className='content'>
        <div className='task-list-container'>
          {loading ? (
            <p>Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p>No tasks available.</p>
          ) : (
            <ul className='tasks-list'>
              {tasks.map((task) => (
                <li key={task.id} className='task-item'>
                  <div className='task-details'>
                    <h2 className='task-title'>{task.title}</h2>
                    <p className='task-description'>{task.description}</p>
                    <p className='task-location'>Location: {task.location}</p>
                    <p className='task-price'>Price: {task.price}</p>
                    <p className='task-dueDate'>Due Date: {task.dueDate}</p>
                    <div className='task-tags'>
                      {task.tags.map((tag, index) => (
                        <span key={index} className='task-tag'>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button className='make-offer-btn' onClick={() => handleMakeOfferClick(task)}>
                    Make offer
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {showForm && selectedTask && (
          <div className='offer-form-container'>
            <OfferForm
              task={selectedTask}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default TaskFilter
