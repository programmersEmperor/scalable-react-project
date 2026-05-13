import { useNavigate } from 'react-router'
import { useAuth } from './providers/auth-provider'
import { useEffect } from 'react'

function Login() {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  return (
    <div>
      <h1>Login</h1>
      <button
        className="bg-blue-500 text-white p-2 rounded-md"
        onClick={() =>
          login({ id: '1', name: 'John Doe', email: 'john.doe@example.com' })
        }
      >
        Login
      </button>
    </div>
  )
}

export default Login
