import type React from "react"
import { useLocation, Link } from "react-router-dom"
import { motion } from "framer-motion"

interface SEOMetrics {
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

const ScoreCard: React.FC<{ score: number; label: string; color: string }> = ({ score, label, color }) => (
  <motion.div
    className="flex flex-col items-center p-6 bg-blue-300 rounded-xl shadow-lg"
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

const ResultsPage: React.FC = () => {
  const location = useLocation()
  const results = location.state?.results as SEOMetrics

  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 font-sans">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-blue-600">No Results Found</h2>
          <p className="mb-4 text-gray-600">It seems there are no analysis results available.</p>
          <Link
            to="/analyze"
            className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300"
          >
            Analyze Another URL
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
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
              <ScoreCard score={results.seoScore} label="SEO Score" color="#3b82f6" />
              <ScoreCard score={results.performanceScore} label="Performance Score" color="#c43d33" />
              <ScoreCard score={results.overallScore} label="Overall Score" color="#8b5cf6" />
            </div>

            <div className="space-y-8">
              <Section title="Content Analysis">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoCard title="Title" value={results.title} />
                  <InfoCard title="Title Length" value={`${results.titleLength} characters`} />
                  <InfoCard title="Title Has Keyword" value={results.titleHasKeyword ? "Yes" : "No"} />
                  <InfoCard title="Meta Description" value={results.metaDescription} />
                  <InfoCard title="Meta Description Length" value={`${results.metaDescriptionLength} characters`} />
                  <InfoCard
                    title="Meta Description Has Keyword"
                    value={results.metaDescriptionHasKeyword ? "Yes" : "No"}
                  />
                </div>
              </Section>

              <Section title="Headings">
                <div className="space-y-4">
                  <InfoCard title="H1 Count" value={`${results.h1.count} (${results.h1.rating})`} />
                  <InfoCard title="H1 Texts" value={results.h1.texts.join(", ")} />
                  <InfoCard title="H2 Count" value={results.h2.count.toString()} />
                  <InfoCard title="H2 Texts" value={results.h2.texts.join(", ")} />
                </div>
              </Section>

              <Section title="Images">
                <div className="space-y-4">
                  <InfoCard title="Total Images" value={results.imageAlts.total.toString()} />
                  <InfoCard title="Images Missing Alt Text" value={results.imageAlts.missing.toString()} />
                  {results.imageAlts.missingList.length > 0 && (
                    <InfoCard title="Images Without Alt Text" value={results.imageAlts.missingList.join(", ")} />
                  )}
                </div>
              </Section>

              <Section title="Keyword Analysis">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoCard title="Target Keyword" value={results.keyword} />
                  <InfoCard title="Keyword in Title" value={results.keywordInTitle ? "Yes" : "No"} />
                  <InfoCard title="Keyword in Description" value={results.keywordInDescription ? "Yes" : "No"} />
                  <InfoCard title="Keyword Density" value={`${results.keywordDensity.toFixed(2)}%`} />
                  <InfoCard title="Internal Links" value={results.internalLinks.toString()} />
                  <InfoCard title="External Links" value={results.externalLinks.toString()} />
                  <InfoCard title="Links Ratio" value={results.linksRatio.toFixed(2)} />
                </div>
              </Section>

              <Section title="Performance Metrics">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoCard title="Page Size" value={`${results.pageSizeKB.toFixed(2)} KB`} />
                  <InfoCard title="Response Time" value={`${results.responseTimeMS} ms`} />
                  <InfoCard title="Compressed Images" value={results.compressedImages ? "Yes" : "No"} />
                  <InfoCard title="Minified CSS" value={results.minifiedCSS ? "Yes" : "No"} />
                  <InfoCard title="Minified JS" value={results.minifiedJS ? "Yes" : "No"} />
                  <InfoCard title="Secure Connection" value={results.secureConnection ? "Yes" : "No"} />
                  <InfoCard title="Cache Headers" value={results.cacheHeaders ? "Yes" : "No"} />
                  <InfoCard title="Directory Listing" value={results.directoryListing ? "Yes" : "No"} />
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

export default ResultsPage

