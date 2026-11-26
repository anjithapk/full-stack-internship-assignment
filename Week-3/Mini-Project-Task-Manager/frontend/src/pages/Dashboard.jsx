
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Dashboard({ theme, toggleTheme }) {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    const token = localStorage.getItem('token')

    const [tasks, setTasks] = useState([])
    const [filter, setFilter] = useState('All')
    const [search, setSearch] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [priority, setPriority] = useState('Medium')
    const [showForm, setShowForm] = useState(false)
    const [editingTask, setEditingTask] = useState(null)

    const api = axios.create({
        baseURL: 'http://localhost:5003/api/tasks',
        headers: { Authorization: `Bearer ${token}` }
    })

    const fetchTasks = async () => {
        try {
            const response = await api.get('/')
            setTasks(response.data)
        } catch {
            localStorage.clear()
            navigate('/login')
        }
    }

    useEffect(() => {
        if (!token) {
            navigate('/login')
            return
        }
        fetchTasks()
    }, [])

    const resetForm = () => {
        setTitle('')
        setDescription('')
        setPriority('Medium')
        setEditingTask(null)
        setShowForm(false)
    }

    const addTask = async (e) => {
        e.preventDefault()
        try {
            await api.post('/', { title, description, priority })
            resetForm()
            fetchTasks()
        } catch {
            alert('Could not add task')
        }
    }

    const editTask = async (e) => {
        e.preventDefault()
        try {
            await api.put(`/${editingTask._id}`, {
                title,
                description,
                priority
            })
            resetForm()
            fetchTasks()
        } catch {
            alert('Could not update task')
        }
    }

    const startEditing = (task) => {
        setEditingTask(task)
        setTitle(task.title)
        setDescription(task.description || '')
        setPriority(task.priority || 'Medium')
        setShowForm(true)
    }

    const toggleTask = async (task) => {
        try {
            await api.put(`/${task._id}`, {
                completed: !task.completed
            })
            fetchTasks()
        } catch {
            alert('Could not update task')
        }
    }

    const deleteTask = async (id) => {
        if (!window.confirm('Delete this task?')) return

        try {
            await api.delete(`/${id}`)
            fetchTasks()
        } catch {
            alert('Could not delete task')
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/login')
    }

    const completedCount = tasks.filter(task => task.completed).length
    const pendingCount = tasks.length - completedCount

    const progress = tasks.length
        ? Math.round((completedCount / tasks.length) * 100)
        : 0

    const filteredTasks = tasks.filter(task => {
        const matchesFilter =
            filter === 'All' ||
            (filter === 'Pending' && !task.completed) ||
            (filter === 'Completed' && task.completed)

        const matchesSearch =
            task.title.toLowerCase().includes(search.toLowerCase()) ||
            (task.description || '').toLowerCase().includes(search.toLowerCase())

        return matchesFilter && matchesSearch
    })

    return (
        <div className="dashboard">

            <aside className="sidebar">
                <h2>Taskly<span>.</span></h2>
                <p className="side-label">MENU</p>

                <button className="nav-item active" onClick={() => setFilter('All')}>
                    ▦ Dashboard
                </button>

                <button className="nav-item" onClick={() => setFilter('All')}>
                    ☰ All Tasks
                </button>

                <button className="nav-item" onClick={() => setFilter('Pending')}>
                    ◷ Pending
                </button>

                <button className="nav-item" onClick={() => setFilter('Completed')}>
                    ✓ Completed
                </button>

                <div className="sidebar-bottom">
                    <p>{user.name || 'User'}</p>
                    <button className="logout-btn" onClick={logout}>
                        ↪ Logout
                    </button>
                </div>
            </aside>

            <main className="main-content">

                <header className="topbar">
                    <div>
                        <p className="welcome">YOUR WORKSPACE</p>
                        <h1>Hello, {user.name || 'there'}! 👋</h1>
                        <p className="subtitle">Let's make today productive.</p>
                    </div>

                    <div className="header-actions">
                        <button
                            className="theme-toggle"
                            onClick={toggleTheme}
                            aria-label="Toggle dark mode"
                            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                        >
                            {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
                        </button>

                        <button className="add-button" onClick={() => {
                            resetForm()
                            setShowForm(true)
                        }}>
                            + Add New Task
                        </button>
                    </div>
                </header>

                <section className="progress-card">
                    <div className="progress-heading">
                        <div>
                            <h3>Overall Progress</h3>
                            <p>You're making progress. Keep going!</p>
                        </div>
                        <strong>{progress}%</strong>
                    </div>

                    <div className="progress-track">
                        <div
                            className="progress-fill"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </section>

                {showForm && (
                    <form
                        className="task-form"
                        onSubmit={editingTask ? editTask : addTask}
                    >
                        <h3>{editingTask ? 'Edit Task' : 'Create a new task'}</h3>

                        <input
                            placeholder="Task title"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            required
                        />

                        <textarea
                            placeholder="Description (optional)"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />

                        <label>Task Priority</label>

                        <select
                            value={priority}
                            onChange={e => setPriority(e.target.value)}
                        >
                            <option value="High">High Priority</option>
                            <option value="Medium">Medium Priority</option>
                            <option value="Low">Low Priority</option>
                        </select>

                        <button type="submit">
                            {editingTask ? 'Update Task' : 'Save Task'}
                        </button>

                        <button
                            type="button"
                            className="delete-btn"
                            onClick={resetForm}
                        >
                            Cancel
                        </button>
                    </form>
                )}

                <section className="task-section mobile-tasks">

                    <div className="section-heading">
                        <div>
                            <h2>My Tasks ✨</h2>
                            <p>Manage your daily activities</p>
                        </div>
                    </div>

                    <input
                        className="task-search"
                        type="search"
                        placeholder="🔍 Search your tasks..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />

                    <div className="filter-buttons">
                        {['All', 'Pending', 'Completed'].map(option => (
                            <button
                                key={option}
                                className={filter === option ? 'filter-active' : ''}
                                onClick={() => setFilter(option)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>

                    <div className="task-list">
                        {filteredTasks.length === 0 ? (
                            <p className="empty">
                                No tasks found. Add your first task! ✨
                            </p>
                        ) : (
                            filteredTasks.map(task => (
                                <div className="task-card" key={task._id}>

                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => toggleTask(task)}
                                    />

                                    <div className="task-info">
                                        <h3 className={task.completed ? 'completed' : ''}>
                                            {task.title}
                                        </h3>
                                        {task.description && <p>{task.description}</p>}
                                    </div>

                                    <span className={
                                              task.completed ? 'status done' : 'status pending'
                                          }>
                                        {task.completed ? 'Completed' : 'Pending'}
                                    </span>

                                    <div className={`priority-column priority-${(task.priority || 'Medium').toLowerCase()}`}>
                                        {task.priority || 'Medium'}
                                    </div>

                                    <button
                                        className="edit-btn"
                                        onClick={() => startEditing(task)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={() => deleteTask(task._id)}
                                    >
                                        Delete
                                    </button>

                                </div>
                            ))
                        )}
                    </div>

                </section>

                <section className="stats mobile-stats">
                    <div className="stat-card">
                        <p>Total Tasks</p>
                        <h2>{tasks.length}</h2>
                    </div>

                    <div className="stat-card">
                        <p>Pending Tasks</p>
                        <h2>{pendingCount}</h2>
                    </div>

                    <div className="stat-card">
                        <p>Completed Tasks</p>
                        <h2>{completedCount}</h2>
                    </div>
                </section>

                <button className="mobile-logout" onClick={logout}>
                    ↪ Logout
                </button>

            </main>
        </div>
    )
}

export default Dashboard
