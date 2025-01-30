import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const AnalyzePage: React.FC = () => {
  const [url, setUrl] = useState("")
  const [keyword, setKeyword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const token = localStorage.getItem("token") as string; 
      console.log(token) ;

      const response = await axios.post(
        "http://localhost:8080/api/seo/analyze",
        { url, keyword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      navigate("/results", { state: { results: response.data } })
    } catch (error : unknown) {
      setError(`Failed to analyze the URL : ${error}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-blue-600">Analyze Your Website</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700">
              Website URL
            </label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              placeholder="https://example.com"
            />
          </div>
          <div>
            <label htmlFor="keyword" className="block text-sm font-medium text-gray-700">
              Target Keyword
            </label>
            <input
              type="text"
              id="keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-amber-700"
              placeholder="Enter your target keyword"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AnalyzePage

