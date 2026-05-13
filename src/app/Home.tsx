import { Themes, useTheme } from './providers/theme-provider'

function Home() {
  const [theme, setTheme] = useTheme()
  return (
    <div className="bg-background h-screen w-screen text-3xl font-bold text-foreground">
      <h1>Theme: {theme}</h1>
      <button
        className="bg-blue-500 text-foreground"
        onClick={() => setTheme(Themes.Light)}
      >
        Light
      </button>
      <button
        className="bg-red-500 text-foreground"
        onClick={() => setTheme(Themes.Dark)}
      >
        Dark
      </button>
    </div>
  )
}

export default Home
