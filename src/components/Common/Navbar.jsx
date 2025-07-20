// src/components/Common/Navbar.jsx
import { motion } from "framer-motion"

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100" 
         style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <div className="max-w-8xl mx-auto flex items-center justify-between h-16 px-8">
        {/* Logo */}
        <a href="#hero" className="flex items-center -my-8 ml-12">
          <img
            src={`${import.meta.env.BASE_URL}images/logo.png`}
            alt="Consultium AI"
            className="h-32 w-auto -my-8"
          />
        </a>

        {/* Center Navigation - Desktop */}
        <nav className="hidden lg:flex items-center space-x-8">
          <a 
            href="#features" 
            className="text-gray-800 font-medium hover:text-gray-900 transition-colors"
          >
            Features
          </a>
          <a 
            href="#about" 
            className="text-gray-800 font-medium hover:text-gray-900 transition-colors"
          >
            Over Ons
          </a>
          <a 
            href="#contact" 
            className="text-gray-800 font-medium hover:text-gray-900 transition-colors"
          >
            Contact
          </a>
        </nav>

        {/* Right Side - Login and CTA */}
        <div className="hidden lg:flex items-center space-x-6 mr-12">

          <motion.a
            href="https://app.consultium.ai"
            className="px-10 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            Neem Contact Op
          </motion.a>
        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <div className="space-y-1.5">
            <span className="block w-5 h-0.5 bg-gray-700"></span>
            <span className="block w-5 h-0.5 bg-gray-700"></span>
            <span className="block w-5 h-0.5 bg-gray-700"></span>
          </div>
        </button>
      </div>
    </nav>
  )
}
