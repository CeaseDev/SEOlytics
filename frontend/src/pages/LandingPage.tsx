import type React from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 text-white overflow-hidden">
      <div className="container mx-auto px-4 py-16">
        <nav className="flex justify-between items-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold"
          >
            SEOlytics
          </motion.div>
          <div className="space-x-4">
            <Link to="/login" className="text-white hover:text-blue-200 transition duration-300">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-white text-blue-600 px-4 py-2 rounded-full hover:bg-blue-100 transition duration-300"
            >
              Register
            </Link>
          </div>
        </nav>

        <div className="flex flex-col lg:flex-row items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:w-1/2 mb-12 lg:mb-0"
          >
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Boost Your SEO with Advanced Analytics
            </h1>
            <p className="text-xl mb-8">
              Analyze your website's SEO performance and get actionable insights to improve your search engine rankings.
            </p>
            <Link
              to="/register"
              className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-100 transition duration-300 inline-block"
            >
              Get Started
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:w-1/2"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg transform rotate-3"></div>
              <img
                src="/dashboard-mockup.png"
                alt="SEOlytics Dashboard"
                className="relative z-10 rounded-lg shadow-2xl"
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-24"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-slate-800">
            {[
              {
                title: "Comprehensive Analysis",
                description: "Get in-depth insights into your website's SEO performance.",
              },
              {
                title: "Keyword Optimization",
                description: "Optimize your content with targeted keyword suggestions.",
              },
              {
                title: "Performance Metrics",
                description: "Track and improve your website's loading speed and performance.",
              },
              { title: "Competitor Analysis", description: "Compare your SEO efforts with your top competitors." },
              {
                title: "Mobile Optimization",
                description: "Ensure your website is fully optimized for mobile devices.",
              },
              {
                title: "Regular Reports",
                description: "Receive scheduled reports to track your SEO progress over time.",
              },
            ].map((feature, index) => (
              <div key={index} className="bg-white bg-opacity-10 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-green-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default LandingPage

