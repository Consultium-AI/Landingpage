import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const features = [
  {
    id: "chat",
    title: "AI Chat",
    subtitle: "Je persoonlijke assistent",
    description: "Stel medische vragen direct in de app en krijg slimme, gevalideerde ondersteuning. Altijd up-to-date met de nieuwste inzichten.",
    details: ["Stel medische vragen in natuurlijke taal", "Gevalideerde antwoorden met bronvermelding", "Context-aware op basis van actuele patiënt", "24/7 beschikbaar voor snelle consultatie"],
    icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
    gradient: "from-rose-500 to-orange-500",
    bgGradient: "from-rose-50 to-orange-50"
  },
  {
    id: "dd",
    title: "Smart DD's",
    subtitle: "AI-ondersteunde diagnose",
    description: "Laat AI je helpen bij het formuleren van differentiaaldiagnoses. Gebaseerd op de nieuwste medische literatuur en richtlijnen.",
    details: ["AI-ondersteunde differentiaaldiagnose suggesties", "Gebaseerd op actuele NHG-standaarden", "Helpt bij het scherpstellen van je overwegingen", "Continue learning van medische updates"],
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    gradient: "from-rose-500 to-orange-500",
    bgGradient: "from-rose-50 to-orange-50"
  },
  {
    id: "alerts",
    title: "Smart Alerts",
    subtitle: "Nooit meer iets missen",
    description: "Krijg intelligente waarschuwingen bij potentieel ernstige symptomen. AI-gestuurde urgentie detectie die je helpt de juiste prioriteiten te stellen.",
    details: ["Real-time analyse van symptomen tijdens het gesprek", "Automatische kleurmarkering voor urgentie van klachten", "Gepersonaliseerde meldingen op basis van patiënthistorie", "Integreert naadloos met bestaande workflows"],
    icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
    gradient: "from-rose-500 to-orange-500",
    bgGradient: "from-rose-50 to-orange-50"
  }
];

export default function ComingSoonSection() {
  const [activeFeature, setActiveFeature] = useState(0);
  const current = features[activeFeature];

  return (
    <section className="relative bg-gradient-to-br from-rose-50 to-orange-50 min-h-screen flex items-center overflow-hidden">

      <div className="w-full max-w-[1800px] mx-auto px-6 lg:px-16 py-24 lg:py-32 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={stagger}
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div variants={fadeIn} >
            </motion.div>

            <motion.h2 variants={fadeIn} className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] mb-6">
              <span className="block">Binnenkort</span>
              <span className="block bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">beschikbaar.</span>
            </motion.h2>
          </div>

          {/* Feature Tabs */}
          <motion.div variants={fadeIn} className="flex justify-center mb-16">
            <div className="inline-flex bg-gray-100 rounded-full p-1.5">
              {features.map((feature, index) => (
                <button
                  key={feature.id}
                  onClick={() => setActiveFeature(index)}
                  className={`relative px-6 py-3 rounded-full text-sm font-medium transition-colors duration-200 ${
                    activeFeature === index ? 'text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {activeFeature === index && (
                    <motion.div
                      layoutId="activeComingSoon"
                      className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-full`}
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{feature.title}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Feature Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-2 gap-16 items-center"
            >
              {/* Left - Description */}
              <div>
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br ${current.gradient} text-white mb-8 shadow-lg`}>
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={current.icon} />
                  </svg>
                </div>

                <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">{current.title}</h3>
                <p className={`text-lg font-medium bg-gradient-to-r ${current.gradient} bg-clip-text text-transparent mb-6`}>{current.subtitle}</p>
                <p className="text-xl text-gray-600 leading-relaxed mb-8">{current.description}</p>

                <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-gray-100">
                  <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">Verwacht: Q3 2026</span>
                </div>
              </div>

              {/* Right - Features list */}
              <div className="bg-white rounded-3xl p-10 shadow-xl shadow-gray-200/50 border border-gray-100">
                <h4 className="text-sm font-semibold tracking-widest text-gray-400 uppercase mb-8">Wat kun je verwachten</h4>
                
                <div className="space-y-6">
                  {current.details.map((detail, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${current.gradient} flex items-center justify-center flex-shrink-0`}>
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700 text-lg">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation dots */}
          <div className="flex justify-center gap-3 mt-16">
            {features.map((feature, index) => (
              <button
                key={feature.id}
                onClick={() => setActiveFeature(index)}
                className={`h-2 rounded-full transition-all duration-200 ${
                  activeFeature === index ? `w-8 bg-gradient-to-r ${feature.gradient}` : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
