import { useEffect } from 'react'
import { useAuth } from './providers/auth-provider'
import { useNavigate } from 'react-router'

function Home() {
  const { logout, isAuthenticated, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, navigate])

  return (
    <div className="bg-background h-screen w-screen text-foreground">
      <h1>Welcome {user?.name}</h1>
      <button
        className="bg-blue-500 text-white p-2 rounded-md"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  )
}

export default Home
