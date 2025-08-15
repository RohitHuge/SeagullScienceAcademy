import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastProvider } from './components/ui/Toast'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import About from './pages/About'
import Courses from './pages/Courses'
import Mentors from './pages/Mentors'
import Achievements from './pages/Achievements'
import Contact from './pages/Contact'
import Gallery from './pages/Gallery'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import AdminEnquiries from './pages/AdminEnquiries'
import AdminApplications from './pages/AdminApplications'
import AdminSettings from './pages/AdminSettings'

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/mentors" element={<Mentors />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/login" element={<Login />} />
            
            {/* Protected Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/enquiries" element={
              <ProtectedRoute>
                <AdminEnquiries />
              </ProtectedRoute>
            } />
            <Route path="/admin/applications" element={
              <ProtectedRoute>
                <AdminApplications />
              </ProtectedRoute>
            } />
            <Route path="/admin/settings" element={
              <ProtectedRoute>
                <AdminSettings />
              </ProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  )
}

export default App
