import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastProvider } from './components/ui/Toast'
import Home from './pages/Home'
import About from './pages/About'
import Courses from './pages/Courses'

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  )
}

export default App
