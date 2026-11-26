
import { useState } from 'react'
import { authAPI } from '../services/api'
import { Link, useNavigate } from 'react-router-dom'

function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()

        try {
            await authAPI.post('/register', {
                name,
                email,
                password
            })

            setMessage('Registration successful!')
            navigate('/login')
        } catch (error) {
            setMessage(error.response?.data?.message || 'Registration failed')
        }
    }

    return (
        <div>
            <h1>Register</h1>

            <form onSubmit={handleRegister}>
                <input
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

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

                <button type="submit">Register</button>
            </form>

            <p>{message}</p>
            <p>Already registered? <Link to="/login">Login</Link></p>
        </div>
    )
}

export default Register
