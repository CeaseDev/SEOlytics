import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import AnalyzePage from "./pages/AnalyzePage"
import ResultsPage from "./pages/ResultsPage"
import { AuthProvider } from "./context/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    
      <Router>
        <AuthProvider>
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-700 text-white">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/analyze"
              element={
                <ProtectedRoute>
                  <AnalyzePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/results"
              element={
                <ProtectedRoute>
                  <ResultsPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        </AuthProvider>
      </Router>
    
  )
}

export default App

