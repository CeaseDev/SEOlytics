import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { format } from "date-fns"
import { useAuth } from "../context/AuthContext"

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

interface NavbarProps {
  previousResults: AnalysisResult[]
}


const Navbar: React.FC<NavbarProps> = ({ previousResults}) => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate(); 
  const {logout} = useAuth() ; 

  const togglePanel = () => setIsOpen(!isOpen)

  const handleResultClick = (id: string) => {
    navigate(`/analysis/${id}`)
    setIsOpen(false)
  }

  const onLogout = () =>{
        logout() ; 
  }

  return (
    <nav className="bg-white shadow-md text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-blue-600">SEOlytics</span>
            </div>
          </div>
          <div className="flex items-center">
            <button
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              onClick={togglePanel}
              aria-label="Menu"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <button
              className="ml-4 p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              onClick={onLogout}
              aria-label="Logout"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 w-64 bg-white shadow-xl z-50 overflow-y-auto"
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Previous Results</h2>
                <button
                  className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                  onClick={togglePanel}
                  aria-label="Close menu"
                >
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="space-y-4">
                {previousResults.map((result) => (
                  <div
                    key={result.id}
                    className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
                    onClick={() => handleResultClick(result.id)}
                  >
                    <div className="p-4">
                      <h3 className="text-sm font-medium text-gray-900 truncate">{result.url}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {format(new Date(result.timeStamp._seconds * 1000), "MMM d, yyyy HH:mm")}
                      </p>
                      <div className="flex justify-between text-sm mt-2">
                        <span className="text-blue-600">SEO: {result.seoScore}</span>
                        <span className="text-green-600">Perf: {result.performanceScore}</span>
                        <span className="text-purple-600">Overall: {result.overallScore.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar

