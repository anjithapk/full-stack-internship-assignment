
import axios from 'axios'

export const todoAPI = axios.create({
    baseURL: 'http://localhost:5000/api/todos'
})

export const authAPI = axios.create({
    baseURL: 'http://localhost:5001/api/auth'
})

// Automatically attach JWT token to To-Do API requests
todoAPI.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})
