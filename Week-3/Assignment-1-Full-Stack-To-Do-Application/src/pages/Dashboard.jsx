
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { todoAPI } from '../services/api'

function Dashboard() {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))

    const [tasks, setTasks] = useState([])
    const [task, setTask] = useState('')
    const [editId, setEditId] = useState(null)
    const [message, setMessage] = useState('')

    const fetchTasks = async () => {
        try {
            const response = await todoAPI.get('/')
            setTasks(response.data)
        } catch (error) {
            setMessage(error.response?.data?.message || 'Could not load tasks')
        }
    }

    useEffect(() => {
        fetchTasks()
    }, [])

    const addTask = async () => {
        if (!task.trim()) return

        try {
            if (editId) {
                await todoAPI.put(`/${editId}`, { title: task })
                setEditId(null)
            } else {
                await todoAPI.post('/', { title: task })
            }

            setTask('')
            setMessage('')
            fetchTasks()
        } catch (error) {
            setMessage(error.response?.data?.message || 'Could not save task')
        }
    }

    const editTask = (item) => {
        setTask(item.title)
        setEditId(item._id)
    }

    const deleteTask = async (id) => {
        try {
            await todoAPI.delete(`/${id}`)
            fetchTasks()
        } catch (error) {
            setMessage(error.response?.data?.message || 'Could not delete task')
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/login')
    }

    return (
        <div>
            <h1>Welcome, {user?.name}!</h1>
            <h2>My To-Do Dashboard</h2>

            <button onClick={logout}>Logout</button>

            <hr />

            <input
                type="text"
                placeholder="Enter a task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />

            <button onClick={addTask}>
                {editId ? 'Update Task' : 'Add Task'}
            </button>

            <p>{message}</p>

            <ul>
                {tasks.map((item) => (
                    <li key={item._id}>
                        {item.title}
                        <button onClick={() => editTask(item)}>Edit</button>
                        <button onClick={() => deleteTask(item._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Dashboard
