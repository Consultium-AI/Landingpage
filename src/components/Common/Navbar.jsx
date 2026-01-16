import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);

  // Optimized scroll handler with throttling
  useEffect(() => {
    let ticking = false;
    let lastUpdate = 0;
    const THROTTLE_MS = 100; // Only update active section every 100ms

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const now = Date.now();
          
          // Show/hide navbar based on scroll direction
          if (currentScrollY === 0) {
            setIsVisible(true);
          } else if (currentScrollY > lastScrollYRef.current && currentScrollY > 50) {
            setIsVisible(false);
          } else if (currentScrollY < lastScrollYRef.current) {
            setIsVisible(true);
          }
          
          lastScrollYRef.current = currentScrollY;
          setIsScrolled(currentScrollY > 20);
          
          // Throttle active section updates (expensive DOM queries)
          if (now - lastUpdate > THROTTLE_MS) {
            lastUpdate = now;
            
            // Simplified section detection - just check which section is in view
            const sections = ['demo', 'plan', 'privacy', 'about', 'features', 'hero'];
            const viewportMiddle = currentScrollY + window.innerHeight * 0.4;
            
            for (const id of sections) {
              const el = document.getElementById(id);
              if (el) {
                const top = el.offsetTop;
                const bottom = top + el.offsetHeight;
                if (viewportMiddle >= top && viewportMiddle < bottom) {
                  setActiveSection(id);
                  break;
                }
              }
            }
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  const navLinks = [
    { href: '#features', label: 'Functies', id: 'features' },
    { href: '#about', label: 'Over Ons', id: 'about' },
    { href: '#privacy', label: 'Privacy', id: 'privacy' },
    { href: '#plan', label: 'Plan', id: 'plan' },
    { href: '#demo', label: 'Contact', id: 'demo' },
  ];

  return (
    <motion.nav 
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg shadow-gray-200/50 border-b border-gray-100/50' : 'bg-transparent'
      }`}
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="w-full flex items-center justify-between h-20 px-5 lg:px-8 xl:px-12 2xl:px-16">
        {/* Logo */}
        <a href="#hero" className="flex items-center -my-8">
          <img
            src={`${import.meta.env.BASE_URL}images/logo.png`}
            alt="Consultium AI"
            className="h-28 w-auto"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center">
          <div className="flex items-center gap-1 p-1.5 bg-gray-50/80 rounded-full border border-gray-100/50">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.id); }}
                className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                  activeSection === link.id ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {activeSection === link.id && (
                  <motion.div
                    className="absolute inset-0 bg-white rounded-full shadow-sm"
                    layoutId="activeNavBg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            ))}
          </div>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center">
          <a
            href="https://app.consultiumai.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200"
          >
            <span className="flex items-center gap-2">
              Naar de app
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2.5 rounded-xl text-gray-700 hover:text-gray-900 hover:bg-gray-100/80 focus:outline-none transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="lg:hidden absolute top-full left-0 right-0 bg-white/98 backdrop-blur-sm border-t border-gray-100 shadow-xl"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-5 py-6 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); scrollToSection(link.id); }}
                  className={`block px-4 py-3 rounded-xl font-medium transition-colors duration-200 ${
                    activeSection === link.id ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              
              <a
                href="https://app.consultiumai.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full mt-4 px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl text-center shadow-lg shadow-blue-500/25 block"
              >
                <span className="flex items-center justify-center gap-2">
                  Naar de app
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
