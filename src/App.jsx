// src/App.jsx
import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import emailjs from '@emailjs/browser';
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
  const [formData, setFormData] = useState({
    voornaam: '',
    achternaam: '',
    email: '',
    bericht: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  
  const soepVideoRef = useRef(null);
  const liveVideoRef = useRef(null);
  const [showVideoModal, setShowVideoModal] = useState(false);

  useEffect(() => {
    document.title = "Consultium AI – Slimme transcriptie voor de zorg";
    
    // Event listener for navbar contact button
    const handleFillPilotMessage = (event) => {
      setFormData(prev => ({
        ...prev,
        bericht: event.detail.message
      }));
      // Focus the message field after state update
      setTimeout(() => {
        const berichtField = document.getElementById('bericht');
        if (berichtField) {
          berichtField.focus();
        }
      }, 100);
    };

    window.addEventListener('fillPilotMessage', handleFillPilotMessage);
    
    return () => {
      window.removeEventListener('fillPilotMessage', handleFillPilotMessage);
    };
  }, []);

  // Intersection Observer voor video's
  useEffect(() => {
    const observerOptions = {
      threshold: 0.3, // Video speelt af als 30% zichtbaar is
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting) {
          video.play().catch(console.error);
        } else {
          video.pause();
        }
      });
    }, observerOptions);

    // Observeer video's
    if (soepVideoRef.current) observer.observe(soepVideoRef.current);
    if (liveVideoRef.current) observer.observe(liveVideoRef.current);

    return () => {
      if (soepVideoRef.current) observer.unobserve(soepVideoRef.current);
      if (liveVideoRef.current) observer.unobserve(liveVideoRef.current);
    };
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      // EmailJS configuratie
      const serviceId = 'service_eswaa5o';
      const publicKey = 'm_0ogVltjaSP8A6sf';

      // Initialiseer EmailJS
      emailjs.init(publicKey);

      const templateParams = {
        name: `${formData.voornaam} ${formData.achternaam}`,
        email: formData.email,
        message: formData.bericht,
        subject: 'Pilot-deelname',
        to_email: 'info@consultiumai.com'
      };

      // Probeer verschillende template namen die mogelijk bestaan
      const possibleTemplates = [
        'template_3wepyib',
        'template_1', 
        'template_contact',
        'template_consultium'
      ];

      let emailSent = false;
      
      for (const templateId of possibleTemplates) {
        try {
          await emailjs.send(serviceId, templateId, templateParams);
          emailSent = true;
          break;
        } catch (templateError) {
          console.log(`Template ${templateId} niet gevonden, probeer volgende...`);
          continue;
        }
      }

      if (!emailSent) {
        // Als geen template werkt, gebruik de sendForm methode
        throw new Error('Geen werkende template gevonden');
      }
      
      setSubmitStatus('success');
      setFormData({ voornaam: '', achternaam: '', email: '', bericht: '' });
      
    } catch (error) {
      console.error('Email send failed:', error);
      
      // Laatste poging: gebruik EmailJS zonder specifieke template
      try {
        await emailjs.send(
          'service_eswaa5o',
          'contact_form', // Meest generieke template naam
          {
            name: `${formData.voornaam} ${formData.achternaam}`,
            email: formData.email,
            message: formData.bericht
          },
          'm_0ogVltjaSP8A6sf'
        );
        
        setSubmitStatus('success');
        setFormData({ voornaam: '', achternaam: '', email: '', bericht: '' });
        
      } catch (finalError) {
        console.error('Final attempt failed:', finalError);
        setSubmitStatus('error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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
    <div className="min-h-screen relative" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', scrollPaddingTop: '80px' }}>
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
          {/* Desktop Layout - Using flexbox for better zoom responsiveness */}
          <div className="hidden lg:flex items-center justify-between max-w-7xl mx-auto px-4 xl:px-6 relative z-20 min-h-[80vh]">
            {/* Left Content */}
            <div className="w-1/2 xl:w-1/2 pr-16 xl:pr-20 flex-shrink-0">
            {/* Small tagline */}
            <motion.div
              className="text-left px-2 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sm font-medium text-gray-800 tracking-wider uppercase">
              De volgende stap in medische AI
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              className="hero-title text-left md:text-6xl lg:text-[64px] font-extrabold mb-6"
              style={{ textShadow: '0 0 0 rgba(0,0,0,0)' }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-gray-900">Minder typen</span>
              <br />
              <span className="text-gray-900">Meer luisteren</span>
              <br />
              <span 
                style={{ 
                  color: '#056fe8'
                }}
              >
                Betere zorg
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-left text-[18px] md:text-[20px] text-gray-700 mb-8 mt-8 leading-7 max-w-[640px]"
              style={{ textShadow: '0 0 0 rgba(0,0,0,0)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <span className="text-gray-900">Consultium AI luistert live mee tijdens het consult en zet alles om in een professioneel SOEP-verslag; automatisch, accuraat en actueel.
               Zodat jij kunt doen waar het écht om draait: zorgen voor je patiënt.
              </span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.button
                onClick={() => setShowVideoModal(true)}
                className="px-6 py-3 font-semibold rounded-xl text-white text-[16px] transition-all duration-200 shadow-lg"
                style={{ background: 'linear-gradient(135deg, #056FE8 0%, #0580EB 50%, #0693EF 100%)' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-white font-bold">Bekijk Demo</span>
              </motion.button>
              
              <motion.button
                onClick={() => {
                  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                  setTimeout(() => {
                    // Dispatch custom event to update React state
                    const customEvent = new CustomEvent('fillPilotMessage', {
                      detail: { message: "Hallo, ik ben geïnteresseerd in deelname aan de gratis pilot van Consultium AI en zou graag meer informatie willen ontvangen over de mogelijkheden voor mijn praktijk." }
                    });
                    window.dispatchEvent(customEvent);
                  }, 1000);
                }}
                className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-800 font-semibold rounded-xl hover:border-gray-400 transition-all duration-200 text-[16px]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Contact Opnemen
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
                <span className="text-gray-800 font-semibold text-lg"> Automatisch gegenereerd SOEP-verslag</span>
              </div>
            </motion.div>
            </div>

            {/* Right Image - Desktop Only */}
            <div className="w-1/2 xl:w-1/2 pl-2 xl:pl-4 flex-shrink-0 flex items-center justify-center overflow-visible">
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <div className="relative">
                  {/* Main App Dashboard - Large */}
                  <img
                    src={`${import.meta.env.BASE_URL}images/Dashboard.png`}
                    alt="Consultium AI Dashboard"
                    className="w-full h-auto rounded-2xl shadow-2xl"
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Mobile Content - Only visible on mobile */}
          <div className="lg:hidden px-6 pt-8 pb-16">
            <motion.div
              className="text-center mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sm font-medium text-gray-800 tracking-wider uppercase">
                De volgende stap in medische AI
              </span>
            </motion.div>

            <motion.h1
              className="hero-title text-[36px] font-extrabold mb-6 leading-[1.05] text-center"
              style={{ textShadow: '0 0 0 rgba(0,0,0,0)' }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-gray-900">Minder typen</span>
              <br />
              <span className="text-gray-900">Meer luisteren</span>
              <span 
                style={{ 
                  color: '#056fe8'
                }}
              >
                <br />
                Betere zorg
              </span>
            </motion.h1>

            <motion.p
              className="text-[18px] text-gray-700 mb-8 leading-7 text-center px-4"
              style={{ textShadow: '0 0 0 rgba(0,0,0,0)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <span className="text-gray-900">Consultium AI luistert live mee tijdens het consult en zet alles om in een professioneel SOEP-verslag; automatisch, accuraat en binnen enkele seconden.
               Zodat jij kunt doen waar het écht om draait: zorgen voor je patiënt.</span>
            </motion.p>

            <motion.div
              className="flex flex-col gap-4 mb-8 px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.button
                onClick={() => setShowVideoModal(true)}
                className="px-6 py-3 font-semibold rounded-xl text-white text-[16px] transition-all duration-200 shadow-lg"
                style={{ background: 'linear-gradient(135deg, #056FE8 0%, #0580EB 50%, #0693EF 100%)' }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-white font-bold">Bekijk Demo</span>
              </motion.button>
              
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
                className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-800 font-semibold rounded-xl hover:border-gray-400 transition-all duration-200 text-[16px]"
                whileTap={{ scale: 0.98 }}
              >
                Contact Opnemen
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
                <span className="text-gray-800 font-semibold text-lg">Real-time transcriptie tijdens het consult</span>
              </div>
              <div className="flex items-center gap-4 bg-white/60 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/40 shadow-lg">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-800 font-semibold text-lg">Automatisch gegenereerd SOEP-verslag</span>
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
                src={`${import.meta.env.BASE_URL}images/Dashboard.png`}
                alt="Consultium AI Interface"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>



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

           <div className="relative z-10 container mx-auto px-4 xl:px-6 max-w-7xl">

      {/* SOEP VERSLAG */}
          <motion.div
              className="mb-32"
            initial="hidden"
            whileInView="visible"
              variants={staggerContainer}
              viewport={{ once: true, margin: "-100px" }}
            >
                             <div className="grid lg:grid-cols-2 gap-8 xl:gap-12 items-center">
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
                        "Direct te kopiëren naar elk EPD-systeem",
                        "Geavanceerde AI-transcriptie met hoge betrouwbaarheid",
                        "Minder administratie, meer ruimte voor aandacht en zorg",
                        "Automatische samenvattingen voorkomen fouten en besparen kostbare tijd"
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
                  </div>
          </motion.div>

          <motion.div
                  className="relative rounded-3xl overflow-hidden shadow-2xl"
            variants={reveal}
            transition={{ delay: 0.2 }}
          >
            <video
              ref={soepVideoRef}
              src={`${import.meta.env.BASE_URL}videos/Soep_Verslag.mp4`}
              controls
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
                             <div className="grid lg:grid-cols-2 gap-8 xl:gap-12 items-center">
          <motion.div
                  className="relative bg-gradient-to-br from-white to-gray-50 border border-gray-100 rounded-3xl p-6 lg:p-10 shadow-xl lg:order-2"
            variants={reveal}
                >
                  {/* Subtle accent background */}
                  <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full blur-2xl opacity-30"></div>
                  
                  <div className="relative z-10">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900">
                     Transcriptie in <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">real-time</span>
                    </h2>
                    <p className="text-gray-700 mb-8 text-base lg:text-lg">Focus volledig op je patiënt, niet op notities:</p>
                    <ul className="space-y-4">
                      {[
                        "Live Transcriptie; terwijl jij gewoon blijft praten",
                        "Herkenning van meerdere sprekers (arts & patiënt)",
                        "Geen toetsenbord meer nodig: meer oogcontact, meer vertrouwen",
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

          <motion.div
                  className="relative rounded-3xl overflow-hidden shadow-2xl lg:order-1"
            variants={reveal}
            transition={{ delay: 0.2 }}
          >
            <video
              ref={liveVideoRef}
              src={`${import.meta.env.BASE_URL}videos/real-time.mp4`}
              controls
              muted
              loop
              className="w-full h-full object-cover"
            />
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
                             <div className="grid lg:grid-cols-2 gap-8 xl:gap-12 items-center">
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
                    <p className="text-gray-700 mb-8 text-base lg:text-lg">Overbrug taalbarrières met real-time vertaling:</p>
                    <ul className="space-y-4 mb-8">
                      {[
                        "Speech-to-speech translation",
                        "Breed scala aan talen en dialecten, groeiend met de dag",
                        "Behoud van medische terminologie en context",
                        "Transcriptie en vertaling in één systeem, naadloos gekoppeld"
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
                    
                  </div>
                </motion.div>

                <motion.div
                  className="relative rounded-3xl overflow-hidden shadow-2xl"
                  variants={reveal}
                  transition={{ delay: 0.2 }}
                >
                  <video
                    src={`${import.meta.env.BASE_URL}videos/AI-TOLK.mp4`}
                    controls
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>



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
           <div className="container mx-auto px-4 xl:px-6 max-w-7xl">
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
              <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-4">
               We blijven continu ontwikkelen om jouw praktijk slimmer, efficiënter en veiliger te maken.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto">
                <p className="text-blue-800 font-medium text-center">
                  <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
                  Onder ontwikkeling – verwachte release: Q3 2026
                </p>
              </div>
            </motion.div>

            <motion.div
              className="grid lg:grid-cols-3 gap-8"
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
              Smart Alerts
                </span>
                  </h3>
                  <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-semibold relative overflow-hidden">
                    <span className="absolute inset-0 bg-white opacity-20 animate-pulse" />
              <span className="relative z-10">Coming soon</span>
            </div>
                </div>
                <ul className="space-y-3">
                  {[
                    "Krijg waarschuwingen bij potentieel ernstige symptomen",
                    "Zie in één oogopslag de urgentie van klachten dankzij automatische kleurmarkering",
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
                  Smart DD's
                </span>
                  </h3>
                  <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-semibold relative overflow-hidden">
                    <span className="absolute inset-0 bg-white opacity-20 animate-pulse" />
              <span className="relative z-10">Coming soon</span>
            </div>
                </div>
                <ul className="space-y-3">
                  {[
                    "AI-ondersteunde differentiaaldiagnose",
                    "Helpt bij het scherpstellen van je overwegingen, zonder ze over te nemen"
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
            transition={{ delay: 0.4 }}
              >
                <div className="relative mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                      AI Chat Assistant
                </span>
                  </h3>
                  <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-semibold relative overflow-hidden">
                    <span className="absolute inset-0 bg-white opacity-20 animate-pulse" />
              <span className="relative z-10">Coming soon</span>
            </div>
                </div>
                <ul className="space-y-3">
                  {[
                    "Stel medische vragen direct in de app",
                    "Krijg slimme, gevalideerde ondersteuning"
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
         <div className="container mx-auto px-4 xl:px-6 max-w-7xl">
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
              Van visie naar vernieuwing in de medische verslaggeving
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
                  Consultium AI is ontstaan vanuit een frustrerende observatie:
                  zorgverleners besteden te veel tijd aan administratie, en te weinig aan zorg. We zagen hoe artsen dagelijks overspoeld werden met papierwerk en dachten: dit moet beter kunnen.
                  </p>
                  <p className="text-gray-600 leading-relaxed"> Met de nieuwste technologie willen we niet zomaar een tool maken, maar een oplossing die zorgprofessionals echt helpt. Door verslaglegging uit handen te nemen, geven we tijd terug aan de mensen die er het meest toe doen: artsen, verpleegkundigen en hun patiënten.</p>
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
                  Technologie moet zorg ondersteunen, niet ingewikkelder maken.
Daarom bouwen we intuïtieve AI-tools die moeiteloos meedraaien in het dagelijkse ritme van de praktijk. Consultium AI ondersteunt zorgverleners op de achtergrond, zonder gedoe.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                  Van een live transcriptie tot een automatisch gegenereerd SOEP-verslag in enkele secondes. Het moeiteloos overbruggen van taalbarrières met de live tolk functie. Alles is ontworpen met één doel:
                  administratie verlichten en tijd terug te geven aan arts én patiënt.

                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Privacy Section */}
          <motion.div
            id="privacy"
            className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-12 mb-16"
            initial="hidden"
            whileInView="visible"
            variants={reveal}
            viewport={{ once: true }}
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-center mb-8">
                <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-md">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="text-gray-700 font-semibold">Privacy & Veiligheid</span>
                </div>
              </div>
              
              <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Jouw privacy, onze <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">prioriteit</span>
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900">Privacy-by-Design</h4>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Bij Consultium AI staat gegevensbescherming centraal. Onze technologie is ontworpen volgens het principe privacy-by-design: spraak wordt uitsluitend lokaal of tijdelijk verwerkt en direct na transcriptie gewist. We slaan geen patiëntgegevens op, hebben geen toegang tot medische dossiers en hanteren de basisprincipes van de AVG, zoals minimale dataverwerking en pseudonimisering.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900">Certificering & Compliance</h4>
                  </div>
                                      <p className="text-gray-600 leading-relaxed mb-4">
                                      Op dit moment werken we aan de juridische basisdocumenten, waaronder een DPIA. We bereiden de stappen voor richting CE‑markering, al is ons product voorlopig puur administratief. Daarnaast werken we aan certificering conform ISO 27001 en NEN 7510.
                     </p>
                   <p className="text-gray-600 leading-relaxed">
                     Hiermee bouwen we aan een veilige, transparante en toekomstbestendige oplossing, juridisch én technisch.
                     </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Development Status */}
          <motion.div
            id="plan"
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
              Samen bouwen we de toekomst
              </h3>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
              Consultium AI groeit in nauwe samenwerking met zorgverleners uit het veld. We ontwikkelen geen product voor de zorg, we ontwikkelen het met de zorg.
              Elke functie wordt getest in de praktijk, bijgeschaafd op basis van feedback, en stap voor stap geoptimaliseerd voor jouw dagelijkse werk.
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
                Wil je meedenken én meeprofiteren?  Neem contact op voor early access en help ons 
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

                     <div className="relative z-10 container mx-auto px-4 xl:px-6 max-w-7xl">
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
              Sluit je aan bij collega-zorgverleners die met Consultium AI tijd winnen, administratie verlichten en meer ruimte creëren voor échte patiëntenzorg.
Vraag een persoonlijke demo aan en ontdek hoe wij jouw praktijk kunnen transformeren.
              </p>
    </motion.div>

    <motion.div
              className="max-w-3xl mx-auto w-full"
      initial="hidden"
      whileInView="visible"
              variants={staggerContainer}
      viewport={{ once: true }}
    >
              {/* Contact Form */}
              <motion.div
                className="w-full"
                variants={reveal}
                transition={{ delay: 0.2 }}
              >
                <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-100 rounded-3xl p-10 shadow-xl">
                  <div className="flex flex-col items-center mb-8">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-3xl font-bold text-gray-900">
                        Stuur ons een bericht
                  </h3>
                      <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-semibold rounded-full">
                        Beta
                      </span>
                    </div>
                    <p className="text-gray-600 text-lg max-w-2xl text-center">
                      Help mee <span className="font-semibold text-blue-600">de toekomst</span>  van medische verslaglegging vorm te geven; en profiteer als eerste van alle voordelen:
                    </p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-blue-800 font-medium mb-1">Gratis Pilot Programma</p>
                        <p className="text-blue-700 text-sm">
                          Als early adopter krijg je:
                        </p>
                        <ul className="mt-2 space-y-1 text-sm text-blue-700">
                          <li>• Gratis toegang tijdens de hele pilot fase</li>
                          <li>• Inspraak op nieuwe feautures                          </li>
                          <li>• Directe ondesteuning bij vragen</li>
                          <li>• Exclusieve korting op de officiele release</li>
                        </ul>
                      </div>
                      </div>
                    </div>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Name Fields */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="voornaam" className="block text-base font-semibold text-gray-700 mb-2">
                          Voornaam
                        </label>
                        <input
                          type="text"
                          id="voornaam"
                          name="voornaam"
                          value={formData.voornaam}
                          onChange={handleInputChange}
                          className="w-full px-5 py-4 text-lg border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                          placeholder="Uw voornaam"
                        />
                      </div>
                      <div>
                        <label htmlFor="achternaam" className="block text-base font-semibold text-gray-700 mb-2">
                          Achternaam <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="achternaam"
                          name="achternaam"
                          value={formData.achternaam}
                          onChange={handleInputChange}
                          required
                          className="w-full px-5 py-4 text-lg border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                          placeholder="Uw achternaam"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-base font-semibold text-gray-700 mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                                              <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-5 py-4 text-lg border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                        placeholder="uw.email@voorbeeld.nl"
                      />
                      </div>

                    {/* Smart Message Suggestions */}
                      <div>
                      <label htmlFor="bericht" className="block text-base font-semibold text-gray-700 mb-2">
                        Bericht <span className="text-red-500">*</span>
                      </label>
                      
                      {/* Smart Suggestions */}
                      <div className="mb-3 space-y-2">
                        <p className="text-xs text-gray-600">Snelle keuzes:</p>
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setFormData({
                                ...formData,
                                bericht: "Ik werk in de zorg en zou graag meedoen aan de gratis pilot fase van Consultium AI. Kunnen jullie mij meer informatie sturen over de implementatie en de voordelen van early adoption?"
                              });
                            }}
                            className="px-4 py-2.5 text-sm bg-cyan-50 hover:bg-cyan-100 text-cyan-700 border border-cyan-200 rounded-lg transition-colors">
                              Ik wil meedoen aan de pilot!

                            </button>
                      </div>
                    </div>

                      <textarea
                        id="bericht"
                        name="bericht"
                        value={formData.bericht}
                        onChange={handleInputChange}
                        required
                        rows="6"
                        className="w-full px-5 py-4 text-lg border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none bg-white"
                        placeholder="Stel hier je vraag, of klik op een snelle keuze hierboven..."
                      />
                  </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full px-8 py-4 font-semibold rounded-xl transition-all duration-300 transform shadow-lg hover:shadow-xl ${
                        isSubmitting 
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 hover:scale-[1.02] text-white'
                      }`}
                      whileHover={!isSubmitting ? { y: -2 } : {}}
                      whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                    >
                      <span className="flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        )}
                        {isSubmitting ? 'Wordt verstuurd...' : 'Versturen'}
                      </span>
                    </motion.button>

                    {/* Status Messages */}
                    {submitStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-green-50 border border-green-200 rounded-xl"
                      >
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                          </svg>
                          <p className="text-green-800 font-medium">Bericht succesvol verstuurd!</p>
                </div>
                        <p className="text-green-700 text-sm mt-1">We nemen binnen 24 uur contact met je op.</p>
    </motion.div>
                    )}

                    {submitStatus === 'error' && (
    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-red-50 border border-red-200 rounded-xl"
                      >
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                          </svg>
                          <p className="text-red-800 font-medium">Er ging iets mis bij het versturen</p>
                  </div>
                        <p className="text-red-700 text-sm mt-1">Probeer het opnieuw of neem direct contact op via WhatsApp.</p>
                      </motion.div>
                    )}
                  </form>

                  {/* Alternative Contact */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-600 text-center mb-4">
                      Of neem direct contact op via WhatsApp
                    </p>
      <a
                      href="https://wa.me/31850805541"
                      className="flex items-center justify-center gap-3 w-full px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02]"
      >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
                      </svg>
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
                         <div className="container mx-auto px-4 xl:px-6 max-w-7xl">
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
                  Meer tijd voor de patiënt, minder tijd kwijt aan administratie. Consultium AI schrijft live mee tijdens het consult en zet spraak automatisch om in een overzichtelijk SOEP-verslag. Zo besteed jij minder tijd aan administratie, en meer tijd aan waar het echt om draait.

                  </p>
                  
                  {/* Social Media */}
                  <div className="flex gap-4">
                    <a href="https://www.linkedin.com/company/consultium-ai" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-300">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    <a href="https://www.instagram.com/consultiumai" className="w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-colors duration-300">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                    <a href="https://wa.me/31850805541" className="w-10 h-10 bg-gray-800 hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors duration-300">
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
                    <li><a href="#features" className="text-gray-300 hover:text-white transition-colors duration-300">Functies</a></li>
                    <li><a href="#about" className="text-gray-300 hover:text-white transition-colors duration-300">Over Ons</a></li>
                    <li><a href="#privacy" className="text-gray-300 hover:text-white transition-colors duration-300">Privacy</a></li>
                    <li><a href="#plan" className="text-gray-300 hover:text-white transition-colors duration-300">Plan</a></li>
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
                      info@consultiumai.com
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                      </svg>
                      <span>Strevelsweg 700<br />3083AS Rotterdam<br />Nederland</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm2 1a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                      </svg>
                      KVK: 96716606
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/>
                        <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd"/>
                      </svg>
                      BTW: NL005227750B76
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Footer */}
              <div className="border-t border-gray-800 pt-8">
                <div className="text-center">
                  <div className="text-gray-400 text-sm">
                    © 2025 Consultium AI. Alle rechten voorbehouden.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>

        {/* Video Modal */}
        {showVideoModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowVideoModal(false)}
          >
            <motion.div
              className="relative w-full h-full max-w-6xl max-h-[90vh] mx-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowVideoModal(false)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Video */}
              <video
                className="w-full h-full rounded-lg shadow-2xl"
                controls
                autoPlay
                src={`${import.meta.env.BASE_URL}videos/Demo_Consultium.mp4`}
                onLoadStart={() => console.log('Video loading...')}
                onError={(e) => console.error('Video error:', e)}
              >
                Je browser ondersteunt deze video niet.
              </video>
            </motion.div>
          </motion.div>
        )}
        </div>
    </div>
  );
}


