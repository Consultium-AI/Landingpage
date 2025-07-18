// src/components/Common/Navbar.jsx
import { motion } from "framer-motion"

export default function Navbar({ transparent }) {
  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50 backdrop-blur-md h-24
        ${transparent
          ? "bg-white/20"       /* lichte witte tint met 20% opacity */
          : "bg-white/80"}      /* fallback, mocht je het transparant uitzetten */
        rounded-b-[3rem]          /* pill-vorm aan de onderkant */
        transition-colors
      `}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between h-full px-6">
        {/* Logo */}
        <a href="#hero" className="flex items-center h-full">
          <img
            src={`${import.meta.env.BASE_URL}images/logo.png`}
            alt="Consultium AI Logo"
            className="w-24 h-24 md:w-32 md:h-32 object-contain"
          />
        </a>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-8">
          {["Features", "Pricing", "Roadmap", "Contact"].map(item => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-white hover:text-indigo-200 transition"
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <motion.a
            href="https://app.consultium.ai"
            className="inline-flex items-center h-12 px-6 bg-indigo-500 text-white font-semibold rounded-full hover:bg-indigo-600 transition"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            Maak account aan
          </motion.a>
        </div>

        {/* Mobile burger */}
        <button className="md:hidden p-2">
          <span className="block w-6 h-0.5 bg-white mb-1" />
          <span className="block w-6 h-0.5 bg-white mb-1" />
          <span className="block w-6 h-0.5 bg-white" />
        </button>
      </div>
    </nav>
  )
}
