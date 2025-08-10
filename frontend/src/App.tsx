import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/authStore'
import LoginScreen from './components/auth/LoginScreen'
import SignupScreen from './components/auth/SignupScreen'
import DashboardLayout from './components/layout/DashboardLayout'
import DashboardHome from './components/dashboard/DashboardHome'
import ClientsPage from './components/dashboard/ClientsPage'
import WorkersPage from './components/dashboard/WorkersPage'
import TasksPage from './components/dashboard/TasksPage'
import InstitutesPage from './components/dashboard/InstitutesPage'
import StatsPage from './components/dashboard/StatsPage'
import ProtectedRoute from './components/auth/ProtectedRoute'

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginScreen />
            }
          />
          <Route
            path="/signup"
            element={
              isAuthenticated ? <Navigate to="/dashboard" replace /> : <SignupScreen />
            }
          />
          <Route
            path="/"
            element={
              isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="clients" element={<ClientsPage />} />
            <Route path="workers" element={<WorkersPage />} />
            <Route path="tasks" element={<TasksPage />} />
            <Route path="institutes" element={<InstitutesPage />} />
            <Route path="stats" element={<StatsPage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
