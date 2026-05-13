import type { PropsWithChildren } from 'react'
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
} from 'react'

export enum Themes {
  Light = 'light',
  Dark = 'dark',
}

const ThemeContext = createContext<{
  theme: Themes
  setTheme: (theme: Themes) => void
}>({
  theme: Themes.Light,
  setTheme: () => {},
})

const useSystemTheme = () => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  const getCurrentValue = () =>
    mediaQuery.matches ? Themes.Dark : Themes.Light
  const subscriber = (callback: () => void) => {
    mediaQuery.addEventListener('change', callback)
    return () => mediaQuery.removeEventListener('change', callback)
  }

  return useSyncExternalStore(subscriber, getCurrentValue)
}

const useStorageTheme = () => {
  const KEY = 'theme'
  const getStoredTheme = () => localStorage.getItem(KEY) as Themes | null
  const setStoredTheme = (theme: Themes) => {
    localStorage.setItem(KEY, theme)
  }

  return [getStoredTheme, setStoredTheme] as const
}

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [getStoredTheme, setStoredTheme] = useStorageTheme()
  const systemTheme = useSystemTheme()
  const [theme, setTheme] = useState<Themes>(getStoredTheme() ?? systemTheme)

  useEffect(() => {
    document.documentElement.classList.remove(Themes.Light, Themes.Dark)
    document.documentElement.classList.add(theme)
  }, [theme])

  const changeTheme = (theme: Themes) => {
    setStoredTheme(theme)
    setTheme(theme)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme: changeTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const { theme, setTheme } = useContext(ThemeContext)
  return [theme, setTheme] as const
}
