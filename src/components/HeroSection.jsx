import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function HeroSection({ onShowVideoModal }) {
  return (
    <section id="hero" className="relative w-full overflow-hidden">
      {/* Desktop Layout */}
      <div className="hidden lg:flex items-center justify-between w-full max-w-[1800px] mx-auto px-8 xl:px-16 2xl:px-20 relative z-20 min-h-screen py-24">
        {/* Left Content */}
        <div className="w-full max-w-[620px] 2xl:max-w-[700px] flex-shrink-0">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2.5 2xl:px-6 2xl:py-3 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100/50 mb-7 2xl:mb-8"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
          >
            <span className="relative flex h-2.5 w-2.5 2xl:h-3 2xl:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 2xl:h-3 2xl:w-3 bg-blue-500"></span>
            </span>
            <span className="text-sm 2xl:text-base font-semibold text-blue-700 tracking-wide">
              De volgende stap in medische AI
            </span>
          </motion.div>

          {/* Main heading with staggered animation */}
          <motion.h1
            className="hero-title text-left text-5xl xl:text-6xl 2xl:text-7xl font-extrabold mb-7 2xl:mb-9 leading-[1.1]"
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
          >
            <motion.span 
              className="block text-gray-900 pb-1 2xl:pb-2"
              variants={fadeInUp}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Minder typen
            </motion.span>
            <motion.span 
              className="block text-gray-900 pb-1 2xl:pb-2"
              variants={fadeInUp}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Meer luisteren
            </motion.span>
            <motion.span 
              className="block bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent pb-2 2xl:pb-3"
              style={{ paddingTop: '0.1em', paddingBottom: '0.15em' }}
              variants={fadeInUp}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Betere zorg
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-left text-lg xl:text-xl 2xl:text-2xl text-gray-600 mb-9 2xl:mb-11 leading-relaxed max-w-[580px] 2xl:max-w-[660px]"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            Consultium AI luistert live mee tijdens het consult en zet alles om in een professioneel SOEP-verslag — automatisch, accuraat en actueel.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-row gap-4 2xl:gap-5"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.button
              onClick={onShowVideoModal}
              className="group relative px-8 py-4 2xl:px-9 2xl:py-5 font-semibold rounded-2xl text-white text-base 2xl:text-lg shadow-lg shadow-blue-500/25 bg-gradient-to-r from-blue-600 to-cyan-600 overflow-hidden"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center gap-2 2xl:gap-3">
                <svg className="w-5 h-5 2xl:w-6 2xl:h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Bekijk Demo
              </span>
              {/* Subtle shimmer effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>
            
            <motion.button
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  const offset = 100;
                  const elementPosition = contactSection.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - offset;
                  window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                  setTimeout(() => {
                    window.dispatchEvent(new CustomEvent('fillPilotMessage', {
                      detail: { message: "Hallo, ik ben geïnteresseerd in deelname aan de gratis pilot van Consultium AI en zou graag meer informatie willen ontvangen over de mogelijkheden voor mijn praktijk." }
                    }));
                  }, 800);
                }
              }}
              className="group px-8 py-4 2xl:px-9 2xl:py-5 bg-white/80 border-2 border-gray-200 text-gray-700 font-semibold rounded-2xl text-base 2xl:text-lg hover:border-blue-300 hover:bg-white transition-all duration-200"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center gap-2 2xl:gap-3">
                Contact Opnemen
                <svg className="w-4 h-4 2xl:w-5 2xl:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </motion.button>
          </motion.div>
        </div>

        {/* Right Image - Desktop Only with floating animation */}
        <div className="flex-1 flex items-center justify-center ml-12 xl:ml-16 2xl:ml-24">
          <motion.div
            className="relative w-full max-w-[700px] 2xl:max-w-[850px]"
            initial={{ opacity: 0, x: 40, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Glow effect behind dashboard */}
            <div className="absolute -inset-4 2xl:-inset-6 bg-gradient-to-r from-blue-400/15 to-cyan-400/15 rounded-3xl blur-2xl"></div>
            
            {/* Dashboard image with subtle floating animation */}
            <motion.div 
              className="relative w-full"
              animate={{ y: [0, -6, 0] }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut",
                repeatType: "reverse"
              }}
              style={{ willChange: 'transform' }}
            >
              <img
                src={`${import.meta.env.BASE_URL}images/Dashboard.png`}
                alt="Consultium AI Dashboard"
                className="w-full h-auto object-contain rounded-2xl shadow-2xl shadow-gray-400/30 ring-1 ring-white/50"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Mobile Content */}
      <div className="lg:hidden w-full px-5 py-20 min-h-screen flex flex-col justify-center">
        {/* Mobile Badge */}
        <motion.div
          className="flex justify-center mb-6"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.4 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100/50">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-xs font-semibold text-blue-700">
              De volgende stap in medische AI
            </span>
          </div>
        </motion.div>

        <motion.h1
          className="hero-title text-[36px] sm:text-[42px] font-extrabold mb-6 leading-[1.1] text-center"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.span 
            className="block text-gray-900 pb-1"
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
          >
            Minder typen
          </motion.span>
          <motion.span 
            className="block text-gray-900 pb-1"
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
          >
            Meer luisteren
          </motion.span>
          <motion.span 
            className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"
            style={{ paddingTop: '0.1em', paddingBottom: '0.2em' }}
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
          >
            Betere zorg
          </motion.span>
        </motion.h1>

        <motion.p
          className="text-base text-gray-600 mb-8 leading-relaxed text-center px-2"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          Consultium AI luistert live mee en zet alles om in een professioneel SOEP-verslag — automatisch en accuraat.
        </motion.p>

        <motion.div
          className="flex flex-col gap-3 mb-10"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <button
            onClick={onShowVideoModal}
            className="flex items-center justify-center gap-2 px-6 py-4 font-semibold rounded-2xl text-white text-base shadow-lg shadow-blue-500/25 bg-gradient-to-r from-blue-600 to-cyan-600 active:scale-[0.98] transition-transform"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            Bekijk Demo
          </button>
          
          <button
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                const offset = 100;
                const elementPosition = contactSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                setTimeout(() => {
                  window.dispatchEvent(new CustomEvent('fillPilotMessage', {
                    detail: { message: "Hallo, ik ben geïnteresseerd in deelname aan de gratis pilot van Consultium AI." }
                  }));
                }, 800);
              }
            }}
            className="px-6 py-4 bg-white/80 border-2 border-gray-200 text-gray-700 font-semibold rounded-2xl text-base active:scale-[0.98] transition-transform"
          >
            Contact Opnemen
          </button>
        </motion.div>

        {/* Mobile Image */}
        <motion.div
          className="relative max-w-md mx-auto w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="absolute -inset-3 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-3xl blur-xl"></div>
          <img
            src={`${import.meta.env.BASE_URL}images/Dashboard.png`}
            alt="Consultium AI Interface"
            className="relative w-full h-auto rounded-2xl shadow-xl ring-1 ring-white/50"
          />
        </motion.div>
      </div>

      {/* Wave Transition */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20">
        <svg className="relative block w-full h-32" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,40 C200,80 400,20 600,50 C800,80 1000,30 1200,60 L1200,120 L0,120 Z" fill="#ffffff" />
        </svg>
      </div>
    </section>
  );
}
