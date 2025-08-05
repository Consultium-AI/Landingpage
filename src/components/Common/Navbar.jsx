// src/components/Common/Navbar.jsx
import { motion } from "framer-motion";
import { useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100" 
           style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
        <div className="max-w-8xl mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
          {/* Logo */}
          <a href="#hero" className="flex items-center -my-8 ml-4 lg:ml-12">
            <img
              src={`${import.meta.env.BASE_URL}images/logo.png`}
              alt="Consultium AI"
              className="h-32 w-auto"
            />
          </a>

          {/* Center Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a 
              href="#features" 
              className="text-gray-800 font-medium hover:text-gray-900 transition-colors"
            >
              Functies
            </a>
            <a 
              href="#about" 
              className="text-gray-800 font-medium hover:text-gray-900 transition-colors"
            >
              Over Ons
            </a>
            <a 
              href="#privacy" 
              className="text-gray-800 font-medium hover:text-gray-900 transition-colors"
            >
              Privacy
            </a>
            <a 
              href="#plan" 
              className="text-gray-800 font-medium hover:text-gray-900 transition-colors"
            >
              Plan
            </a>
            <a 
              href="#contact" 
              className="text-gray-800 font-medium hover:text-gray-900 transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Right Side - Desktop */}
          <div className="hidden lg:flex items-center space-x-6 mr-12">
            <motion.button
              onClick={() => {
                document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => {
                  // Dispatch custom event to update React state
                  const customEvent = new CustomEvent('fillPilotMessage', {
                    detail: { message: "Hallo, ik ben geïnteresseerd in deelname aan de gratis pilot van Consultium AI en zou graag meer informatie willen ontvangen over de mogelijkheden voor mijn praktijk. Kunnen we een demo inplannen?" }
                  });
                  window.dispatchEvent(customEvent);
                }, 1000);
              }}
              className="px-10 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              Neem Contact Op
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md text-gray-800 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            className="lg:hidden bg-white border-t border-gray-100"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-4 py-4 space-y-3">
              <a
                href="#features"
                className="block px-4 py-2 text-gray-800 font-medium hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Functies
              </a>
              <a
                href="#about"
                className="block px-4 py-2 text-gray-800 font-medium hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Over Ons
              </a>
              <a
                href="#privacy"
                className="block px-4 py-2 text-gray-800 font-medium hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Privacy
              </a>
              <a
                href="#plan"
                className="block px-4 py-2 text-gray-800 font-medium hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Plan
              </a>
              <a
                href="#contact"
                className="block px-4 py-2 text-gray-800 font-medium hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                  setTimeout(() => {
                    // Dispatch custom event to update React state
                    const customEvent = new CustomEvent('fillPilotMessage', {
                      detail: { message: "Hallo, ik ben geïnteresseerd in deelname aan de gratis pilot van Consultium AI en zou graag meer informatie willen ontvangen over de mogelijkheden voor mijn praktijk. Kunnen we een demo inplannen?" }
                    });
                    window.dispatchEvent(customEvent);
                  }, 1000);
                }}
                className="block w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium rounded-lg text-center mt-4"
              >
                Neem Contact Op
              </button>
            </div>
          </motion.div>
        )}
      </nav>
    </>
  );
}
