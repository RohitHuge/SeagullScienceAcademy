import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastProvider } from './components/ui/Toast'
import Home from './pages/Home'
import About from './pages/About'
import Courses from './pages/Courses'
import Mentors from './pages/Mentors'
import Achievements from './pages/Achievements'

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/mentors" element={<Mentors />} />
          <Route path="/achievements" element={<Achievements />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  )
}

export default App
