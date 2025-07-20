// src/App.jsx
import { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import Navbar from "./components/Common/Navbar";
import "./App.css";

// BASE is the Vite public base URL (e.g. "/Landingpage/") or "./" for relative
const BASE = import.meta.env.BASE_URL || "./";

function CountUp({ from = 0, to = 0, duration = 1, className = "" }) {
  const motionValue = useMotionValue(from);
  const rounded = useTransform(motionValue, latest => Math.round(latest));

  useEffect(() => {
    const controls = animate(motionValue, to, { duration });
    return controls.stop;
  }, [to, duration, motionValue]);

  return <motion.span className={className}>{rounded}</motion.span>;
}

export default function App() {
  useEffect(() => {
    document.title = "Consultium AI – Slimme transcriptie voor de zorg";
  }, []);

  const reveal = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen relative" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {/* Flowing Gradient Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-cyan-50"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-100/60 to-cyan-100/40"></div>
        <div className="absolute top-0 left-0 w-2/3 h-2/3 bg-gradient-to-br from-blue-200/50 via-cyan-200/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-cyan-300/40 via-blue-200/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-3/4 h-3/4 bg-gradient-to-tr from-blue-300/30 via-cyan-200/40 to-sky-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1/2 h-1/2 bg-gradient-to-tl from-sky-300/50 via-blue-200/40 to-transparent rounded-full blur-2xl"></div>
        
        {/* Custom flowing colors using our palette */}
        <div className="absolute top-10 left-10 w-96 h-96 rounded-full blur-3xl opacity-30 flow-1"
             style={{ background: `radial-gradient(circle, #056FE8, #0580EB, transparent)` }}></div>
        <div className="absolute top-1/3 right-20 w-80 h-80 rounded-full blur-3xl opacity-25 flow-2"
             style={{ background: `radial-gradient(circle, #0693EF, #05BDFB, transparent)` }}></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 rounded-full blur-3xl opacity-30 flow-3"
             style={{ background: `radial-gradient(circle, #05BDFB, #06A6F5, transparent)` }}></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <Navbar />

        <section
          id="hero"
          className="relative pt-32 pb-20"
          style={{ minHeight: "120vh" }}
        >
          {/* Left Content - Desktop: Absolutely positioned left, Mobile: Normal flow */}
          <div className="absolute left-20 top-32 w-1/3 z-20 lg:block hidden">
            {/* Small tagline */}
            <motion.div
              className="text-left px-5 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sm font-medium text-gray-800 tracking-wider uppercase">
                REVOLUTIONEER MEDISCHE DOCUMENTATIE
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              className="text-left md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              style={{ textShadow: '2px 2px 4px rgba(255, 255, 255, 0.8)' }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-gray-900">Jouw consult,</span>
              <br />
              <span className="text-gray-900">nu </span>
              <span 
                style={{ 
                  color: '#056fe8'
                }}
              >
                automated
              </span>
              <br />
              <span className="text-gray-900">met AI</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="bottom left-0 text-left md:text-xl text-gray-700 mb-8 mt-8 leading-relaxed max-w-lg"
              style={{ textShadow: '1px 1px 2px rgba(255, 255, 255, 0.6)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <span className="text-gray-900">Consultium AI transcribeert automatisch je gesprekken en genereert 
              professionele SOEP-verslagen binnen seconden, zodat je je volledig 
              kunt focussen op je patiënt.</span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.button
                className="px-8 py-4 font-semibold rounded-lg text-white text-lg transition-all duration-200"
                style={{ background: 'linear-gradient(135deg, #056FE8 0%, #0580EB 100%)' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 text-white font-bold">Bekijk Demo</span>
              </motion.button>
              
              <motion.button
                className="px-8 py-4 bg-transparent border-2 border-gray-300 text-gray-800 font-semibold rounded-lg hover:border-gray-400 transition-all duration-200 text-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Contact Ons
              </motion.button>
            </motion.div>

            {/* Features list */}
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div className="flex items-center gap-4 bg-white/60 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/40 shadow-lg">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-800 font-semibold text-lg"> Real-time transcriptie tijdens het consult</span>
              </div>
              <div className="flex items-center gap-4 bg-white/60 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/40 shadow-lg">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-800 font-semibold text-lg"> Automatische SOEP-structuur generatie</span>
              </div>
            </motion.div>
          </div>

          {/* Mobile Content - Only visible on mobile */}
          <div className="lg:hidden px-6 pt-8 pb-16">
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sm font-medium text-gray-800 tracking-wider uppercase">
                REVOLUTIONEER MEDISCHE DOCUMENTATIE
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl font-bold mb-6 leading-tight text-center"
              style={{ textShadow: '2px 2px 4px rgba(255, 255, 255, 0.8)' }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-gray-900">Jouw consult,</span>
              <br />
              <span className="text-gray-900">nu </span>
              <span 
                style={{ 
                  color: '#056fe8'
                }}
              >
                automated
              </span>
              <br />
              <span className="text-gray-900">met AI</span>
            </motion.h1>

            <motion.p
              className="text-lg text-gray-700 mb-8 leading-relaxed text-center px-4"
              style={{ textShadow: '1px 1px 2px rgba(255, 255, 255, 0.6)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <span className="text-gray-900">Consultium AI transcribeert automatisch je gesprekken en genereert 
              professionele SOEP-verslagen binnen seconden, zodat je je volledig 
              kunt focussen op je patiënt.</span>
            </motion.p>

            <motion.div
              className="flex flex-col gap-4 mb-8 px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.button
                className="px-8 py-4 font-semibold rounded-lg text-white text-lg transition-all duration-200"
                style={{ background: 'linear-gradient(135deg, #056FE8 0%, #0580EB 100%)' }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-white font-bold">Bekijk Demo</span>
              </motion.button>
              
              <motion.button
                className="w-full px-8 py-4 bg-transparent border-2 border-gray-300 text-gray-800 font-semibold rounded-lg transition-all duration-200 text-lg"
                whileTap={{ scale: 0.98 }}
              >
                Contact Ons
              </motion.button>
            </motion.div>

            <motion.div
              className="space-y-3 px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div className="flex items-center gap-4 bg-white/60 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/40 shadow-lg">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-800 font-semibold">Real-time transcriptie tijdens het consult</span>
              </div>
              <div className="flex items-center gap-4 bg-white/60 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/40 shadow-lg">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-800 font-semibold">Automatische SOEP-structuur generatie</span>
              </div>
            </motion.div>

            {/* Mobile Image */}
            <motion.div
              className="mt-12 px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <img
                src={`${import.meta.env.BASE_URL}images/Screenshot 2025-07-19 144158.png`}
                alt="Consultium AI Interface"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>

          {/* Right Image - Desktop Only */}
          <motion.div
            className="absolute right-0 bottom-100 px-8 z-10 hidden lg:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="relative">
              {/* Main App Screenshot - Large */}
              <img
                src={`${import.meta.env.BASE_URL}images/Screenshot 2025-07-19 144158.png`}
                alt="Consultium AI Interface"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </motion.div>

          {/* Wave Transition to Features */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20">
            <svg
              className="relative block w-full h-24"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              style={{ width: '100%', minWidth: '100vw' }}
            >
              <path
                d="M0,50 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z"
                fill="#ffffff"
              />
            </svg>
          </div>
        </section>

        {/* FEATURES SECTION - WHITE BACKGROUND WITH SUBTLE ACCENTS */}
        <section id="features" className="relative bg-white py-24">
          {/* Subtle Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute top-1/2 right-20 w-80 h-80 bg-cyan-50 rounded-full blur-3xl opacity-40"></div>
            <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-indigo-50 rounded-full blur-3xl opacity-45"></div>
          </div>

          <div className="relative z-10 container mx-auto px-6">

      {/* SOEP VERSLAG */}
          <motion.div
              className="mb-32"
            initial="hidden"
            whileInView="visible"
              variants={staggerContainer}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  className="relative bg-gradient-to-br from-white to-gray-50 border border-gray-100 rounded-3xl p-6 lg:p-10 shadow-xl"
            variants={reveal}
                >
                  {/* Subtle accent background */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full blur-2xl opacity-30"></div>
                  
                  <div className="relative z-10">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900">
                      SOEP <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Verslag</span> in seconden
            </h2>
                    <p className="text-gray-700 mb-8 text-base lg:text-lg">Bespaar kostbare tijd en energie:</p>
                    <ul className="space-y-4 mb-8">
                      {[
                        "Volledig gestructureerd volgens NHG: Subjectief, Objectief, Evaluatie, Plan",
                        "Direct export naar je EPD of als PDF (geen kopiëren/plakken meer!)",
                        "Powered by Whisper V3 INT8 voor 99% nauwkeurigheid",
                        "Minder administratieve rompslomp → meer focus op je patiënt",
                        "Automatische samenvattingen verkleinen je werkdruk en reduceren fouten"
                      ].map((item, index) => (
                        <motion.li
                          key={index}
                          className="flex items-start gap-3 text-gray-600 text-sm lg:text-base"
                          variants={reveal}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span>{item}</span>
                        </motion.li>
                      ))}
            </ul>
            <motion.a
              href="#soep"
                      className="inline-block px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
            >
              Lees meer
            </motion.a>
                  </div>
          </motion.div>

          <motion.div
                  className="relative rounded-3xl overflow-hidden shadow-2xl order-first lg:order-none"
            variants={reveal}
            transition={{ delay: 0.2 }}
          >
            <video
              src={`${BASE}videos/soep-demo.mp4`}
              controls
              autoPlay
              muted
              loop
                    className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
            </motion.div>

      {/* LIVE OPNAME */}
          <motion.div
              className="mb-32"
            initial="hidden"
            whileInView="visible"
              variants={staggerContainer}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  className="relative rounded-3xl overflow-hidden shadow-2xl lg:order-1"
            variants={reveal}
          >
            <img
  src={`${import.meta.env.BASE_URL}images/live-opname-illustration.jpg`}
  alt="Live opname"
                    className="w-full h-full object-cover"
/>
          </motion.div>

          <motion.div
                  className="relative bg-gradient-to-br from-white to-gray-50 border border-gray-100 rounded-3xl p-6 lg:p-10 shadow-xl lg:order-2"
            variants={reveal}
            transition={{ delay: 0.2 }}
                >
                  {/* Subtle accent background */}
                  <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full blur-2xl opacity-30"></div>
                  
                  <div className="relative z-10">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900">
                      Live Opname in <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">real-time</span>
                    </h2>
                    <p className="text-gray-700 mb-8 text-base lg:text-lg">Focus volledig op je patiënt, niet op notities:</p>
                    <ul className="space-y-4">
                      {[
                        "Ultrasnelle transcriptie met minder dan 1 seconde vertraging",
                        "99% nauwkeurig, ook bij achtergrondgeluid",
                        "Herkenning van meerdere sprekers (arts & patiënt)",
                        "Spreek vrijuit, zonder toetsen: meer oogcontact en empathie",
                        "Naadloze export naar EPD of PDF"
                      ].map((item, index) => (
                        <motion.li
                          key={index}
                          className="flex items-start gap-3 text-gray-600 text-sm lg:text-base"
                          variants={reveal}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span>{item}</span>
                        </motion.li>
                      ))}
            </ul>
                  </div>
          </motion.div>
        </div>
            </motion.div>

            {/* LIVE TOLK */}
            <motion.div
              className="mb-32"
              initial="hidden"
              whileInView="visible"
              variants={staggerContainer}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  className="relative bg-gradient-to-br from-white to-gray-50 border border-gray-100 rounded-3xl p-6 lg:p-10 shadow-xl"
                  variants={reveal}
                >
                  {/* Subtle accent background */}
                  <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full blur-2xl opacity-30"></div>
                  
                  <div className="relative z-10">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900">
                      Live <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Tolk</span> functie
                    </h2>
                    <p className="text-gray-700 mb-8 text-base lg:text-lg">Doorbreek taalbarrières met real-time vertaling:</p>
                    <ul className="space-y-4 mb-8">
                      {[
                        "Whisper luistert real-time mee tijdens het gesprek",
                        "Directe vertaling alsof er een professionele tolk aanwezig is",
                        "Ondersteunt 50+ talen en dialecten",
                        "Behoudt medische terminologie en context",
                        "Geen vertraging - natuurlijke gespreksflow",
                        "Transcriptie én vertaling in één systeem"
                      ].map((item, index) => (
                        <motion.li
                          key={index}
                          className="flex items-start gap-3 text-gray-600 text-sm lg:text-base"
                          variants={reveal}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                    <motion.a
                      href="#tolk"
                      className="inline-block px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Meer over Live Tolk
                    </motion.a>
                  </div>
                </motion.div>

                <motion.div
                  className="relative rounded-3xl overflow-hidden shadow-2xl lg:order-2 order-first"
                  variants={reveal}
                  transition={{ delay: 0.2 }}
                >
                  <div className="bg-gradient-to-br from-blue-100 to-cyan-100 p-8 lg:p-12 h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 lg:w-32 lg:h-32 mx-auto mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center">
                        <svg className="w-12 h-12 lg:w-16 lg:h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                          <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                        </svg>
                      </div>
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4">Real-time Vertaling</h3>
                      <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                        Whisper AI luistert continu mee en vertaalt direct wat gezegd wordt, 
                        zodat artsen en patiënten elkaar perfect begrijpen zonder onderbrekingen.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
            {/* AI CHAT ASSISTANT */}
    <motion.div
              className="mb-32"
              initial="hidden"
              whileInView="visible"
              variants={reveal}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="relative bg-gradient-to-br from-white to-gray-50 border border-gray-100 rounded-3xl p-8 lg:p-12 shadow-xl max-w-4xl mx-auto text-center"
                   style={{ boxShadow: '0 25px 50px rgba(5, 111, 232, 0.1), 0 0 50px rgba(5, 189, 251, 0.05)' }}>
                {/* Subtle accent background */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full blur-2xl opacity-30 -z-10"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full blur-2xl opacity-30 -z-10"></div>
                
                <div className="relative z-10">
                  <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900">
                    AI <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Chat Assistant</span>
                  </h2>
                  <p className="text-gray-700 mb-6 text-base lg:text-lg max-w-2xl mx-auto">
        Stel je medische vragen direct in de app en krijg slimme, gevalideerde ondersteuning.
      </p>
                  <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-sm lg:text-base">
        Geen boeken of Google meer opzoeken: vraag het gewoon aan onze chat-bot en ontvang direct een antwoord.
      </p>
      <motion.a
        href="#chat"
                    className="inline-block px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
      >
        Meer over Chat
      </motion.a>
                </div>
              </div>
    </motion.div>


          {/* Diagonal Transition to Coming Soon */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
            <svg
              className="relative block w-full h-20"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M0,0 L1200,40 L1200,120 L0,120 Z"
                fill="#f8f9fa"
              />
            </svg>
  </div>
</section>

        {/* COMING SOON FEATURES - LIGHT GRAY BACKGROUND */}
        <section className="relative bg-gray-50 py-24">
          <div className="container mx-auto px-6">
          <motion.div
              className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            variants={reveal}
            viewport={{ once: true }}
          >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Binnenkort <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">beschikbaar</span>
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                We werken continu aan nieuwe functionaliteiten om uw medische praktijk nog slimmer te maken.
              </p>
            </motion.div>

            <motion.div
              className="grid lg:grid-cols-2 gap-8"
              initial="hidden"
              whileInView="visible"
              variants={staggerContainer}
              viewport={{ once: true }}
            >
              <motion.div
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                variants={reveal}
            >
                <div className="relative mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Kleurcodering & Waarschuwingen
                </span>
                  </h3>
                  <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-semibold relative overflow-hidden">
                    <span className="absolute inset-0 bg-white opacity-20 animate-pulse" />
              <span className="relative z-10">Coming soon</span>
            </div>
                </div>
                <ul className="space-y-3">
                  {[
                    "Markeert urgentie van klachten met kleurcodering",
                    "Automatische waarschuwingen bij kritieke symptomen"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-600">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
            </ul>
          </motion.div>

          <motion.div
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            variants={reveal}
            transition={{ delay: 0.2 }}
              >
                <div className="relative mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  DD's Voorspellings-hulpmiddel
                </span>
                  </h3>
                  <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-semibold relative overflow-hidden">
                    <span className="absolute inset-0 bg-white opacity-20 animate-pulse" />
              <span className="relative z-10">Coming soon</span>
            </div>
                </div>
                <ul className="space-y-3">
                  {[
                    "Geavanceerde differential-diagnose voorspelling",
                    "Realtime analyse op basis van patiëntdata"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-600">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
            </ul>
          </motion.div>
            </motion.div>
          </div>

          {/* Wave Transition to Pricing */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
            <svg
              className="relative block w-full h-20"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M0,80 C300,20 600,60 900,40 C1050,30 1150,50 1200,60 L1200,120 L0,120 Z"
                fill="#ffffff"
              />
            </svg>
        </div>
      </section>

      {/* OVER ONS SECTION */}
      <section id="about" className="relative bg-gray-50 py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            variants={reveal}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Over <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Consultium AI</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Van een idee tot een revolutie in de medische documentatie
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={reveal}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full blur-xl opacity-60"></div>
                <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Het Begin</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Consultium AI is ontstaan uit frustratie. Frustratie van zorgverleners die uren besteden aan 
                    administratie in plaats van aan patiëntenzorg. We zagen hoe artsen overspoeld werden door 
                    paperwork en dachten: "Dit kan anders."
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Met de nieuwste AI-technologie wilden we een oplossing creëren die niet alleen tijd bespaart, 
                    maar ook de kwaliteit van zorg verbetert door artsen meer tijd te geven voor wat echt belangrijk is.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={reveal}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-full blur-xl opacity-60"></div>
                <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Onze Missie</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    We geloven dat technologie de zorg moet ondersteunen, niet compliceren. Daarom ontwikkelen we 
                    intuïtieve AI-tools die naadloos integreren in de dagelijkse praktijk van zorgverleners.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Van real-time transcriptie tot gestructureerde SOEP-verslagen en live vertaling - 
                    elke functie is ontworpen met één doel: meer tijd voor de patiënt.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Development Status */}
          <motion.div
            className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-12 text-center"
      initial="hidden"
      whileInView="visible"
            variants={reveal}
      viewport={{ once: true }}
    >
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 mb-6 shadow-md">
                <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-red-400 rounded-full animate-pulse"></div>
                <span className="text-gray-700 font-semibold">In Ontwikkeling</span>
              </div>
              
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                We bouwen de toekomst van medische documentatie
              </h3>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                Consultium AI bevindt zich momenteel in actieve ontwikkeling. We werken samen met zorgverleners 
                om een platform te creëren dat écht aansluit bij de behoeften van de praktijk. Elke functie wordt 
                getest, verfijnd en verbeterd op basis van echte feedback uit het veld.
              </p>

              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="text-3xl font-bold text-blue-600 mb-2">2024</div>
                  <div className="text-gray-600">Concept</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="text-3xl font-bold text-blue-600 mb-2">2025</div>
                  <div className="text-gray-600"> Prototype & Beta Testing</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="text-3xl font-bold text-blue-600 mb-2">2026</div>
                  <div className="text-gray-600">Officiële Launch</div>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed">
                Wil je deel uitmaken van onze ontwikkelingsreis? Neem contact op voor early access en help ons 
                het perfecte hulpmiddel voor jouw praktijk te bouwen.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Wave Transition to Contact */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            className="relative block w-full h-20"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,40 C300,80 600,20 900,60 C1050,80 1150,40 1200,50 L1200,120 L0,120 Z"
              fill="#ffffff"
            />
          </svg>
        </div>
      </section>

        {/* CONTACT SECTION - REPLACING PRICING */}
        <section id="contact" className="relative bg-white py-24">
          {/* Subtle Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 right-10 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute bottom-20 left-20 w-80 h-80 bg-cyan-50 rounded-full blur-3xl opacity-40"></div>
  </div>

          <div className="relative z-10 container mx-auto px-6">
    <motion.div
              className="text-center mb-16"
      initial="hidden"
      whileInView="visible"
      variants={reveal}
      viewport={{ once: true }}
    >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Word onderdeel van de toekomst
                </span>
              </h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                Sluit je aan bij vooruitstrevende zorgverleners die al gebruik maken van Consultium AI. 
                Neem contact op voor een persoonlijke demo en ontdek hoe wij jouw praktijk kunnen transformeren.
              </p>
    </motion.div>

    <motion.div
              className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto"
      initial="hidden"
      whileInView="visible"
              variants={staggerContainer}
      viewport={{ once: true }}
    >
              {/* Contact Information */}
              <motion.div
                className="space-y-8"
                variants={reveal}
              >
                <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-100 rounded-3xl p-8 shadow-xl">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Neem contact op
                  </h3>
                  
                  <div className="space-y-6">
                    {/* Phone */}
                    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Telefoon</p>
                        <a href="tel:+31850805541" className="text-blue-600 hover:text-blue-700 font-medium">
                          +31 85 080 5541
                        </a>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Email</p>
                        <a href="mailto:info@consultiumai.nl" className="text-blue-600 hover:text-blue-700 font-medium">
                          info@consultium.ai
                        </a>
                      </div>
                    </div>

                    {/* WhatsApp */}
                    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">WhatsApp</p>
                        <a href="https://wa.me/31850805541" className="text-blue-600 hover:text-green-700 font-medium">
                        +31 85 080 5541
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
    </motion.div>

              {/* QR Code and Call-to-Action */}
    <motion.div
                className="space-y-8"
      variants={reveal}
      transition={{ delay: 0.2 }}
              >
                <div className="bg-gradient-to-br rounded-3xl p-8 shadow-xl text-center">
                  <h3 className="text-2xl font-bold mb-4">
                    Direct aan de slag?
                  </h3>
                  <p className=" mb-6">
                    Scan de QR-code voor direct WhatsApp contact
                  </p>
                  
                  {/* QR Code Placeholder */}
                  <div className="bg-white rounded-2xl p-6 mb-6 inline-block">
                    <img
                      src={`${import.meta.env.BASE_URL}images/whatsapp.png`}
                      alt="WhatsApp QR Code"
                      className="w-40 h-40 rounded-xl"
                    />
                  </div>
                  
                  <div className="space-y-3">
      <a
                      href="https://wa.me/31850805541"
                      className="block w-full px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors duration-300"
      >
                      WhatsApp Nu
      </a>
                  </div>
                </div>

              </motion.div>
    </motion.div>
  </div>
</section>

        {/* FOOTER */}
        <footer className="relative bg-gray-900 text-white">
          {/* Top wave transition */}
          <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
            <svg
              className="relative block w-full h-20"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              style={{ width: '100%', minWidth: '100vw' }}
            >
              <path
                d="M0,80 C300,20 600,60 900,40 C1050,30 1150,50 1200,60 L1200,0 L0,0 Z"
                fill="#ffffff"
              />
            </svg>
          </div>

          <div className="relative z-10 pt-20 pb-12">
            <div className="container mx-auto px-6">
              {/* Main Footer Content */}
              <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-12">
                {/* Company Info */}
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-3 mb-6">
                    <img 
                      src={`${import.meta.env.BASE_URL}images/logo.png`}
                      alt="Consultium AI Logo"
                      className="h-36 w-auto -my-12"
                    />
                  </div>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Revolutioneer je medische praktijk met AI-gedreven transcriptie en SOEP-verslaggeving. 
                    Consultium AI helpt zorgverleners om meer tijd te besteden aan wat echt belangrijk is: de patiënt.
                  </p>
                  
                  {/* Social Media */}
                  <div className="flex gap-4">
                    <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-300">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </a>
                    <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-300">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors duration-300">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Quick Links */}
                <div>
                  <h4 className="font-semibold mb-4 text-lg">Navigatie</h4>
                  <ul className="space-y-3">
                    <li><a href="#hero" className="text-gray-300 hover:text-white transition-colors duration-300">Home</a></li>
                    <li><a href="#features" className="text-gray-300 hover:text-white transition-colors duration-300">Features</a></li>
                    <li><a href="#about" className="text-gray-300 hover:text-white transition-colors duration-300">Over Ons</a></li>
                    <li><a href="#contact" className="text-gray-300 hover:text-white transition-colors duration-300">Contact</a></li>
                  </ul>
                </div>

                {/* Contact Info */}
                <div>
                  <h4 className="font-semibold mb-4 text-lg">Contact</h4>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                      </svg>
                      +31 85 080 5541
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                      </svg>
                      info@consultiumai.nl
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                      </svg>
                      <span>Nederland<br />Remote & On-site</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm2 1a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                      </svg>
                      KVK: 96716606
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Footer */}
              <div className="border-t border-gray-800 pt-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="text-gray-400 text-sm">
                    © 2025 Consultium AI. Alle rechten voorbehouden.
                  </div>
                  <div className="flex gap-6 text-sm">
                    <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Privacybeleid</a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Algemene Voorwaarden</a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Cookies</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
        </div>
    </div>
  );
}
