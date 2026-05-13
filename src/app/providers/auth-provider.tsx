import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { PropsWithChildren } from 'react'
import { createContext, useContext, useEffect, useState } from 'react'

type User = {
  id: string
  name: string
  email: string
}

const AuthContext = createContext<{
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => Promise<void>
  logout: () => Promise<void>
}>({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  logout: async () => {},
})

const getUser = async () => {
  return new Promise<User>((resolve) => {
    setTimeout(() => {
      resolve({ id: '1', name: 'John Doe', email: 'john.doe@example.com' })
    }, 2000)
  })
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null)
  const result = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(),
  })

  useEffect(() => {
    if (result.data) {
      setUser(result.data as User)
    }
  }, [result.data])

  const isAuthenticated = !!user
  const login = async (user: User) => {
    setUser(user)
  }
  const logout = async () => {
    setUser(null)
  }

  if (result.isLoading) return <div>Loading...</div>

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
