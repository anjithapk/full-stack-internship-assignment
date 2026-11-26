
import { useState } from 'react'
import { authAPI } from '../services/api'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const response = await authAPI.post('/login', {
                email,
                password
            })

            localStorage.setItem('token', response.data.token)
            localStorage.setItem('user', JSON.stringify(response.data.user))

            navigate('/dashboard')
        } catch (error) {
            setMessage(error.response?.data?.message || 'Login failed')
        }
    }

    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Login</button>
            </form>

            <p>{message}</p>
            <p>New user? <Link to="/register">Register</Link></p>
        </div>
    )
}

export default Login
