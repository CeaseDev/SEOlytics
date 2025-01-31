import type React from "react"
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import axios from "axios"
import Navbar from "../components/Navbar"

interface SEOMetrics {
  uid: string
  url: string
  timeStamp: {
    _seconds: number
    _nanoseconds: number
  }
  title: string
  titleLength: number
  titleHasKeyword: boolean
  metaDescription: string
  metaDescriptionLength: number
  metaDescriptionHasKeyword: boolean
  h1: {
    count: number
    texts: string[]
    rating: "good" | "multiple" | "missing"
  }
  h2: {
    count: number
    texts: string[]
  }
  imageAlts: {
    total: number
    missing: number
    missingList: string[]
  }
  keyword: string
  keywordInTitle: boolean
  keywordInDescription: boolean
  keywordDensity: number
  internalLinks: number
  externalLinks: number
  linksRatio: number
  pageSizeKB: number
  responseTimeMS: number
  compressedImages: boolean
  minifiedCSS: boolean
  minifiedJS: boolean
  secureConnection: boolean
  cacheHeaders: boolean
  directoryListing: boolean
  seoScore: number
  performanceScore: number
  overallScore: number
}


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
  
  
  interface AnalyzePageProps {
    history: AnalysisResult[];
  }

const ScoreCard: React.FC<{ score: number; label: string; color: string }> = ({ score, label, color }) => (
  <motion.div
    className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="relative w-32 h-32">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle className="text-gray-200 stroke-current" strokeWidth="10" cx="50" cy="50" r="40" fill="transparent" />
        <circle
          className="stroke-current"
          strokeWidth="10"
          strokeLinecap="round"
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          stroke={color}
          strokeDasharray={`${score * 2.51327}, 251.327`}
          transform="rotate(-90 50 50)"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-3xl font-bold" style={{ color }}>
          {Math.round(score)}
        </span>
      </div>
    </div>
    <p className="mt-4 text-lg font-medium text-gray-700">{label}</p>
  </motion.div>
)

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
    <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">{title}</h3>
    {children}
  </motion.div>
)

const InfoCard: React.FC<{ title: string; value: string }> = ({ title, value }) => (
  <motion.div
    className="bg-gray-50 p-4 rounded-lg"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <h4 className="text-sm font-medium text-gray-500 mb-1">{title}</h4>
    <p className="text-gray-800">{value}</p>
  </motion.div>
)

const AnalysisDetailPage: React.FC<AnalyzePageProps> = ({history}) => {
  const { id } = useParams<{ id: string }>()
  const [result, setResult] = useState<SEOMetrics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log(history) ; 
    const fetchAnalysisResult = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`http://localhost:8080/api/seo/history/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        console.log(response.data) ; 
        setResult(response.data)
      } catch (error) {
        console.error("Error fetching analysis result:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalysisResult(); 
  }, [id ]); 


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar previousResults={history}/>
        <div className="max-w-5xl mx-auto pt-12 px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar previousResults={history} />
        <div className="max-w-5xl mx-auto pt-12 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xl font-semibold">Analysis result not found.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 ">
      <Navbar previousResults={history} />
      <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">SEO Analysis Results</h2>
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-semibold mb-8 text-center text-gray-800">Overall Scores</h3>
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <ScoreCard score={result.seoScore} label="SEO Score" color="#3b82f6" />
              <ScoreCard score={result.performanceScore} label="Performance Score" color="#10b981" />
              <ScoreCard score={result.overallScore} label="Overall Score" color="#8b5cf6" />
            </div>

            <div className="space-y-8">
              <Section title="Content Analysis">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoCard title="Title" value={result.title} />
                  <InfoCard title="Title Length" value={`${result.titleLength} characters`} />
                  <InfoCard title="Title Has Keyword" value={result.titleHasKeyword ? "Yes" : "No"} />
                  <InfoCard title="Meta Description" value={result.metaDescription} />
                  <InfoCard title="Meta Description Length" value={`${result.metaDescriptionLength} characters`} />
                  <InfoCard
                    title="Meta Description Has Keyword"
                    value={result.metaDescriptionHasKeyword ? "Yes" : "No"}
                  />
                </div>
              </Section>

              <Section title="Headings">
                <div className="space-y-4">
                  <InfoCard title="H1 Count" value={`${result.h1.count} (${result.h1.rating})`} />
                  <InfoCard title="H1 Texts" value={result.h1.texts.join(", ")} />
                  <InfoCard title="H2 Count" value={result.h2.count.toString()} />
                  <InfoCard title="H2 Texts" value={result.h2.texts.join(", ")} />
                </div>
              </Section>

              <Section title="Images">
                <div className="space-y-4">
                  <InfoCard title="Total Images" value={result.imageAlts.total.toString()} />
                  <InfoCard title="Images Missing Alt Text" value={result.imageAlts.missing.toString()} />
                  {result.imageAlts.missingList.length > 0 && (
                    <InfoCard title="Images Without Alt Text" value={result.imageAlts.missingList.join(", ")} />
                  )}
                </div>
              </Section>

              <Section title="Keyword Analysis">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoCard title="Target Keyword" value={result.keyword} />
                  <InfoCard title="Keyword in Title" value={result.keywordInTitle ? "Yes" : "No"} />
                  <InfoCard title="Keyword in Description" value={result.keywordInDescription ? "Yes" : "No"} />
                  <InfoCard title="Keyword Density" value={`${result.keywordDensity.toFixed(2)}%`} />
                  <InfoCard title="Internal Links" value={result.internalLinks.toString()} />
                  <InfoCard title="External Links" value={result.externalLinks.toString()} />
                  <InfoCard title="Links Ratio" value={result.linksRatio.toFixed(2)} />
                </div>
              </Section>

              <Section title="Performance Metrics">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoCard title="Page Size" value={`${result.pageSizeKB.toFixed(2)} KB`} />
                  <InfoCard title="Response Time" value={`${result.responseTimeMS} ms`} />
                  <InfoCard title="Compressed Images" value={result.compressedImages ? "Yes" : "No"} />
                  <InfoCard title="Minified CSS" value={result.minifiedCSS ? "Yes" : "No"} />
                  <InfoCard title="Minified JS" value={result.minifiedJS ? "Yes" : "No"} />
                  <InfoCard title="Secure Connection" value={result.secureConnection ? "Yes" : "No"} />
                  <InfoCard title="Cache Headers" value={result.cacheHeaders ? "Yes" : "No"} />
                  <InfoCard title="Directory Listing" value={result.directoryListing ? "Yes" : "No"} />
                </div>
              </Section>
            </div>
          </div>
        </motion.div>
        <div className="mt-8 text-center">
          <Link
            to="/analyze"
            className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300 inline-block"
          >
            Analyze Another URL
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AnalysisDetailPage

