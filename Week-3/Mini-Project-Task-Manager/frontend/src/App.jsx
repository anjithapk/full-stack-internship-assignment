
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import './App.css'

function App() {
    const [theme, setTheme] = useState(
        localStorage.getItem('taskly-theme') || 'light'
    )

    useEffect(() => {
        document.body.classList.toggle('dark-mode', theme === 'dark')
        localStorage.setItem('taskly-theme', theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme(current => current === 'light' ? 'dark' : 'light')
    }

    return (
        <BrowserRouter>
            <div className={`app-container ${theme}`}>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/dashboard"
                        element={
                            <Dashboard
                                theme={theme}
                                toggleTheme={toggleTheme}
                            />
                        }
                    />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
