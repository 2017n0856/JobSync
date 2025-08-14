import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/authStore'
import { LoginScreen, SignupScreen, ProtectedRoute, useTokenValidation } from '../features/auth'
import { DashboardLayout, ErrorBoundary, AuthInitializer } from '../shared'
import { DashboardHome, StatsPage } from '../features/dashboard'
import { ClientsPage } from '../features/clients'
import { WorkersPage } from '../features/workers'
import { TasksPage } from '../features/tasks'
import { InstitutesPage, InstituteDetailPage } from '../features/institutes'

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  
  useTokenValidation()

  return (
    <ErrorBoundary>
      <AuthInitializer />
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
          </Route>
          <Route
            path="/clients"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<ClientsPage />} />
          </Route>
          <Route
            path="/workers"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<WorkersPage />} />
          </Route>
          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<TasksPage />} />
          </Route>
          <Route
            path="/institutes"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<InstitutesPage />} />
            <Route path=":id" element={<InstituteDetailPage />} />
          </Route>
          <Route
            path="/stats"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<StatsPage />} />
          </Route>
        </Routes>
      </div>
    </Router>
    </ErrorBoundary>
  )
}

export default App
