import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Enhanced Video Player Component with scrubbing and fullscreen modal
function CustomVideoPlayer({ videoRef, src, gradient, allowSound = false, onFullscreen, showFullscreenButton = true }) {
  const internalVideoRef = useRef(null);
  const progressBarRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef(null);

  useEffect(() => {
    if (videoRef && typeof videoRef === 'function') {
      videoRef(internalVideoRef.current);
    } else if (videoRef && videoRef.current !== undefined) {
      videoRef.current = internalVideoRef.current;
    }
  });

  useEffect(() => {
    const video = internalVideoRef.current;
    if (!video) return;

    video.muted = !allowSound;

    const updateTime = () => {
      if (!isDragging) {
        setCurrentTime(video.currentTime);
      }
    };
    const updateDuration = () => setDuration(video.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      setIsPlaying(false);
      video.currentTime = 0;
    };

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
    };
  }, [videoRef, src, allowSound, isDragging]);

  useEffect(() => {
    const video = internalVideoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
      video.muted = !allowSound;
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, [src, allowSound]);

  // Auto-hide controls
  useEffect(() => {
    const resetControlsTimeout = () => {
      setShowControls(true);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      controlsTimeoutRef.current = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, 3000);
    };

    resetControlsTimeout();
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying, currentTime]);

  const togglePlay = (e) => {
    e.stopPropagation();
    const video = internalVideoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play().catch(console.error);
      }
    }
  };

  const handleProgressClick = (e) => {
    e.stopPropagation();
    const video = internalVideoRef.current;
    const progressBar = progressBarRef.current;
    if (video && progressBar && duration) {
      const rect = progressBar.getBoundingClientRect();
      const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      video.currentTime = percent * duration;
      setCurrentTime(video.currentTime);
    }
  };

  const handleProgressMouseDown = (e) => {
    e.stopPropagation();
    setIsDragging(true);
    handleProgressClick(e);
  };

  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e) => {
        const video = internalVideoRef.current;
        const progressBar = progressBarRef.current;
        if (video && progressBar && duration) {
          const rect = progressBar.getBoundingClientRect();
          const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
          video.currentTime = percent * duration;
          setCurrentTime(video.currentTime);
        }
      };
      const handleMouseUp = () => setIsDragging(false);
      
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, duration]);

  const handleFullscreen = (e) => {
    e.stopPropagation();
    if (onFullscreen) {
      onFullscreen();
    }
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className="relative w-full aspect-video bg-black group cursor-pointer"
      onClick={togglePlay}
      onMouseMove={() => setShowControls(true)}
      onMouseLeave={() => {
        if (isPlaying) {
          setTimeout(() => setShowControls(false), 2000);
        }
      }}
    >
      <video
        ref={internalVideoRef}
        src={src}
        muted={!allowSound}
        loop={false}
        playsInline
        className="w-full h-full object-cover"
      />

      {/* Progress Bar - Clickable for scrubbing */}
      <div
        ref={progressBarRef}
        className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/20 cursor-pointer group/progress"
        onClick={handleProgressClick}
        onMouseDown={handleProgressMouseDown}
      >
        <motion.div
          className={`h-full bg-gradient-to-r ${gradient} transition-all duration-150 relative group-hover/progress:h-2`}
          style={{ width: `${progress}%` }}
          initial={false}
        >
          {/* Progress Handle */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 rounded-full bg-white opacity-0 group-hover/progress:opacity-100 transition-opacity shadow-lg" />
        </motion.div>
      </div>

      {/* Play/Pause Overlay */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            {!isPlaying && (
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-xl"
              >
                <svg className="w-10 h-10 text-gray-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Button - Bottom Right */}
      {showFullscreenButton && onFullscreen && (
        <button
          onClick={handleFullscreen}
          className="absolute bottom-3 right-3 z-10 w-10 h-10 flex items-center justify-center rounded-lg bg-black/60 hover:bg-black/80 backdrop-blur-sm border border-white/20 text-white transition-all duration-200 pointer-events-auto"
          aria-label="Fullscreen"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </button>
      )}
    </div>
  );
}

const features = [
  {
    id: "soep",
    tab: "SOEP Verslag",
    tagline: "Automatische Verslaglegging",
    title: "SOEP Verslag",
    titleAccent: "in seconden",
    description: "Van gesproken woord naar professioneel gestructureerd verslag. Consultium AI luistert mee en genereert automatisch een volledig SOEP-verslag — zonder dat jij hoeft te typen.",
    features: [
      "Gestructureerd volgens NHG: Subjectief, Objectief, Evaluatie, Plan",
      "Direct te kopiëren naar elk EPD-systeem",
      "Relevante links passend bij de context van het consult",
      "Bulletpoints weergave voor gemakkelijke overzicht"
    ],
    video: "videos/SOEP_DEMO.m4v",
    gradient: "from-blue-600 via-blue-500 to-cyan-500"
  },
  {
    id: "live",
    tab: "Live Transcriptie",
    tagline: "Real-time Spraakherkenning",
    title: "Transcriptie in",
    titleAccent: "real-time",
    description: "Terwijl jij in gesprek bent met je patiënt, schrijft Consultium AI live mee. Geen notities meer maken, geen toetsenbord — gewoon aanwezig zijn.",
    features: [
      "Live transcriptie terwijl jij gewoon blijft praten",
      "Herkenning van meerdere sprekers (arts & patiënt)",
      "Meer oogcontact, meer vertrouwen"
    ],
    video: "videos/TRANSCRIPTIE.m4v",
    gradient: "from-cyan-500 via-cyan-400 to-blue-500"
  },
  {
    id: "tolk",
    tab: "Live Tolk",
    tagline: "AI Vertaling",
    title: "Live Tolk",
    titleAccent: "functie",
    description: "Breek taalbarrières af met onze geavanceerde AI-tolkfunctie. Spreek in het Nederlands, je patiënt hoort het in zijn of haar moedertaal — en andersom.",
    features: [
      "Speech-to-speech translation in real-time",
      "Breed scala aan talen en dialecten",
      "Behoud van medische terminologie en context",
      "Transcriptie en vertaling naadloos gekoppeld"
    ],
    video: "videos/TOLK.m4v",
    gradient: "from-indigo-500 via-blue-500 to-cyan-400"
  }
];

export default function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [showFullscreenModal, setShowFullscreenModal] = useState(false);
  const [fullscreenVideoSrc, setFullscreenVideoSrc] = useState("");
  const [fullscreenGradient, setFullscreenGradient] = useState("");
  const videoRefs = useRef({});
  const fullscreenVideoRef = useRef(null);

  useEffect(() => {
    Object.keys(videoRefs.current).forEach((key) => {
      const video = videoRefs.current[key];
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [activeFeature]);

  // Close modal on Escape key & prevent scroll when open
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && showFullscreenModal) {
        setShowFullscreenModal(false);
      }
    };
    
    if (showFullscreenModal) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [showFullscreenModal]);

  const handleFullscreen = () => {
    const currentVideo = videoRefs.current[activeFeature];
    if (currentVideo) {
      // Save current video time and playing state
      const currentTime = currentVideo.currentTime;
      const wasPlaying = !currentVideo.paused;
      
      // Pause original video
      currentVideo.pause();
      
      // Set fullscreen video source
      setFullscreenVideoSrc(`${import.meta.env.BASE_URL}${currentFeature.video}`);
      setFullscreenGradient(currentFeature.gradient);
      setShowFullscreenModal(true);
      
      // Restore video time after modal opens and video loads
      const restoreVideoState = () => {
        if (fullscreenVideoRef.current) {
          fullscreenVideoRef.current.currentTime = currentTime;
          if (wasPlaying) {
            fullscreenVideoRef.current.play().catch(console.error);
          }
        }
      };
      
      // Wait for video metadata to load
      setTimeout(() => {
        if (fullscreenVideoRef.current) {
          if (fullscreenVideoRef.current.readyState >= 1) {
            restoreVideoState();
          } else {
            fullscreenVideoRef.current.addEventListener('loadedmetadata', restoreVideoState, { once: true });
          }
        }
      }, 100);
    }
  };

  const currentFeature = features[activeFeature];

  return (
    <section id="features" className="relative bg-white overflow-hidden">
      <style>{`
        video::-webkit-media-controls { display: none !important; }
        video::-webkit-media-controls-enclosure { display: none !important; }
        video::-webkit-media-controls-panel { display: none !important; }
      `}</style>

      {/* Tab Navigation */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex">
            {features.map((feature, index) => (
              <button
                key={feature.id}
                onClick={() => setActiveFeature(index)}
                className={`flex-1 relative py-5 px-4 lg:px-8 text-sm lg:text-base font-medium transition-colors duration-200 ${
                  activeFeature === index ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <span className="relative z-10">{feature.tab}</span>
                {activeFeature === index && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-600 to-cyan-500"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentFeature.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="min-h-[90vh] lg:min-h-screen flex items-center relative"
        >
          {/* Navigation Arrows */}
          {activeFeature > 0 && (
            <button
              onClick={() => setActiveFeature(activeFeature - 1)}
              className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-50 text-cyan-500/50 hover:text-cyan-500 transition-colors duration-200"
              aria-label="Vorige functie"
            >
              <svg className="w-8 h-8 lg:w-10 lg:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {activeFeature < features.length - 1 && (
            <button
              onClick={() => setActiveFeature(activeFeature + 1)}
              className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-50 text-cyan-500/50 hover:text-cyan-500 transition-colors duration-200"
              aria-label="Volgende functie"
            >
              <svg className="w-8 h-8 lg:w-10 lg:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          <div className="w-full max-w-[1800px] mx-auto px-6 lg:px-16 pt-8 pb-16 lg:pb-24">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="order-2 lg:order-1"
              >
                {/* Tagline */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-sm font-semibold tracking-widest text-gray-400 uppercase mb-6"
                >
                  {currentFeature.tagline}
                </motion.p>

                {/* Title */}
                <motion.h2
                  key={`title-${currentFeature.id}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-[1.1] mb-8"
                >
                  <span className="block">{currentFeature.title}</span>
                  <span className={`block bg-gradient-to-r ${currentFeature.gradient} bg-clip-text text-transparent`}>
                    {currentFeature.titleAccent}
                  </span>
                </motion.h2>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="text-lg lg:text-xl text-gray-600 leading-relaxed mb-10 max-w-xl"
                >
                  {currentFeature.description}
                </motion.p>

                {/* Features List with staggered animation */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ staggerChildren: 0.1, delayChildren: 0.35 }}
                  className="space-y-4"
                >
                  {currentFeature.features.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4 }}
                      className="flex items-start gap-4 group"
                    >
                      <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${currentFeature.gradient} flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300`}>
                        <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700 text-base lg:text-lg group-hover:text-gray-900 transition-colors">
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Navigation Dots */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="flex gap-3 mt-12"
                >
                  {features.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveFeature(index)}
                      className={`h-2 rounded-full transition-all duration-200 ${
                        activeFeature === index 
                          ? 'w-8 bg-gradient-to-r from-blue-600 to-cyan-500' 
                          : 'w-2 bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </motion.div>
              </motion.div>

              {/* Right - Video */}
              <motion.div
                initial={{ opacity: 0, x: 40, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="order-1 lg:order-2"
              >
                <div className="relative">
                  {/* Video container */}
                  <div className="relative rounded-[24px] overflow-hidden shadow-2xl shadow-gray-900/20 border border-white/20 bg-gray-900 z-10">
                    <div className="absolute inset-0 rounded-[24px] ring-1 ring-white/10 pointer-events-none"></div>
                    <CustomVideoPlayer
                      videoRef={el => { if (el) videoRefs.current[activeFeature] = el; }}
                      src={`${import.meta.env.BASE_URL}${currentFeature.video}`}
                      gradient={currentFeature.gradient}
                      allowSound={currentFeature.id === "tolk"}
                      onFullscreen={handleFullscreen}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Fullscreen Video Modal */}
      <AnimatePresence>
        {showFullscreenModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setShowFullscreenModal(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-gray-900/95 backdrop-blur-sm" />
            
            {/* Close Button */}
            <button
              onClick={() => setShowFullscreenModal(false)}
              className="absolute top-6 right-6 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Video Container */}
            <motion.div
              className="relative w-full max-w-5xl mx-6 z-10"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glow Effect */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${fullscreenGradient} opacity-20 rounded-2xl blur-xl`} />
              
              {/* Video Wrapper */}
              <div className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                <CustomVideoPlayer
                  videoRef={fullscreenVideoRef}
                  src={fullscreenVideoSrc}
                  gradient={fullscreenGradient}
                  allowSound={currentFeature.id === "tolk"}
                  showFullscreenButton={false}
                />
              </div>

              {/* Caption */}
              <p className="text-center text-white/60 text-sm mt-4">
                Klik buiten de video of druk op Escape om te sluiten
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
