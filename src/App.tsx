import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Profile from './pages/profile'
import NewWorkout from './pages/NewWorkout'
import OldWorkouts from './pages/oldWorkouts'
import NewExcercise from './pages/NewExcercise'
import ShowExercises from './pages/ShowExercises'
import './App.css'

function App() {
  // const [count, setCount] = useState(0)
  const [colorScheme, setColorScheme] = useState('light')

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === 'light' ? 'dark' : 'light')
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', colorScheme)
  }, [colorScheme])

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <h3>Home</h3>
            </Link>
          </li>
          <li>
            <Link to="/about"><h3>About</h3></Link>
          </li>
        </ul>
        <ul>
          <li><h4>Scheme:</h4> </li>
          <li>
            <button type="button" onClick={toggleColorScheme}>
              {" "}
              {colorScheme}
            </button>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/newWorkout" element={<NewWorkout />} />
        <Route path="/oldWorkouts" element={<OldWorkouts />} />
        <Route path="/newExcercise" element={<NewExcercise />} />
        <Route path="/showExercises" element={<ShowExercises />} />
      </Routes>
    </>
  );
}

export default App
