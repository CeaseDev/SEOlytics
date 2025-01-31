import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import AnalyzePage from "./pages/AnalyzePage"
import ResultsPage from "./pages/ResultsPage"
import { AuthProvider } from "./context/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute"
import AnalysisDetailPage from "./pages/AnalysisDetailPage"
import { useEffect, useState } from "react"
import axios from "axios"

interface AnalysisResult {
  id: string
  url: string
  timeStamp: {
    _seconds: number
    _nanoseconds: number
  }
  seoScore: number
  performanceScore: number
  overallScore: number
}


function App() {

  const [history , setHistory] = useState<AnalysisResult[]>([]) ;
  
  const fetchAnalyzed  = async () => {
    const token = localStorage.getItem("token") ; 
    const response = await axios.get(
      "http://localhost:8080/api/seo/analyzedHistory",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    setHistory(response.data);
    console.log(response.data) ; 
  }

  useEffect(() => {
    fetchAnalyzed() ; 
  }, []); 

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
                  <AnalyzePage history={history}/>
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
            <Route
            path="/analysis/:id"
            element={
              <ProtectedRoute>
                <AnalysisDetailPage history={history}/>
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

