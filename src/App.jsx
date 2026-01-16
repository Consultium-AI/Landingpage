// src/App.jsx
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Common/Navbar";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import ComingSoonSection from "./components/ComingSoonSection";
import AboutSection from "./components/AboutSection";
import DemoBookingSection from "./components/DemoBookingSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import "./App.css";

// Custom Video Player Component
function CustomVideoPlayer({ src }) {
  const videoRef = useRef(null);
  const progressBarRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => {
      if (!isDragging) {
        setCurrentTime(video.currentTime);
      }
    };
    const updateDuration = () => setDuration(video.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);

    // Auto-play on mount
    video.play().catch(console.error);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
    };
  }, [isDragging]);

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

  const togglePlay = () => {
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play().catch(console.error);
      }
    }
  };

  const handleProgressClick = (e) => {
    const video = videoRef.current;
    const progressBar = progressBarRef.current;
    if (video && progressBar && duration) {
      const rect = progressBar.getBoundingClientRect();
      const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      video.currentTime = percent * duration;
      setCurrentTime(video.currentTime);
    }
  };

  const handleProgressMouseDown = (e) => {
    setIsDragging(true);
    handleProgressClick(e);
  };

  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e) => {
        const video = videoRef.current;
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
        ref={videoRef}
        className="w-full h-full object-cover object-center"
        src={src}
        playsInline
      />

      {/* Progress Bar */}
      <div
        ref={progressBarRef}
        className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/20 cursor-pointer group/progress"
        onClick={(e) => {
          e.stopPropagation();
          handleProgressClick(e);
        }}
        onMouseDown={(e) => {
          e.stopPropagation();
          handleProgressMouseDown(e);
        }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-150 relative group-hover/progress:h-2"
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
    </div>
  );
}

export default function App() {
  const [showVideoModal, setShowVideoModal] = useState(false);

  useEffect(() => {
    document.title = "Consultium AI";
  }, []);

  // Close modal on Escape key & prevent scroll when open
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && showVideoModal) {
        setShowVideoModal(false);
      }
    };
    
    if (showVideoModal) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [showVideoModal]);

  return (
    <div className="min-h-screen relative font-body">
      {/* Lightweight Static Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/80 to-cyan-50/60"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.12),transparent)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_80%_80%,rgba(6,182,212,0.08),transparent)]"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.015]" 
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
          }}
        ></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <HeroSection onShowVideoModal={() => setShowVideoModal(true)} />
        <FeaturesSection />
        <ComingSoonSection />
        <AboutSection />
        <DemoBookingSection />
        <ContactSection />
        <Footer />

        {/* Video Modal */}
        <AnimatePresence>
        {showVideoModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setShowVideoModal(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-gray-900/95 backdrop-blur-sm" />
            
            {/* Close Button */}
            <button
              onClick={() => setShowVideoModal(false)}
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
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-60" />
              
              {/* Video Wrapper */}
              <div className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                <CustomVideoPlayer src={`${import.meta.env.BASE_URL}videos/Demo_Consultium.m4v`} />
              </div>

              {/* Caption */}
              <p className="text-center text-white/60 text-sm mt-4">
                Klik buiten de video of druk op Escape om te sluiten
              </p>
            </motion.div>
          </motion.div>
        )}
        </AnimatePresence>
        </div>
    </div>
  );
}
