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

  return (
    <div
      className="font-sans text-white min-h-screen"
      style={{
        backgroundImage: `url(${import.meta.env.BASE_URL}images/wave-bg.jpg)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed"
      }}
    >
      <Navbar transparent />

      <section
        id="hero"
        className="relative py-24 px-6 flex items-center justify-center text-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Van opname naar <span className="text-blue-400">SOEP</span> in seconden.
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Consultium AI transcribeert jouw consult en genereert direct een professioneel{" "}
            <span className="text-blue-300">SOEP</span>-verslag.
          </motion.p>
          <motion.button
            className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-full hover:shadow-lg transition transform hover:scale-105"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Naar de app
          </motion.button>
        </div>
      </section>

      {/* SOEP VERSLAG */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto lg:flex lg:space-x-12 items-stretch">
          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-xl p-8 flex-1"
            initial="hidden"
            whileInView="visible"
            variants={reveal}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">
              SOEP <span className="text-blue-300">Verslag</span> in seconden
            </h2>
            <p className="text-white/80 mb-6">Bespaar kostbare tijd en energie:</p>
            <ul className="list-disc list-inside text-white/80 space-y-2 mb-6">
              <li>Volledig gestructureerd volgens NHG: Subjectief, Objectief, Evaluatie, Plan</li>
              <li>Direct export naar je EPD of als PDF (geen kopiëren/plakken meer!)</li>
              <li><strong>Powered by Whisper V3 INT8</strong> voor 99% nauwkeurigheid</li>
              <li>Minder administratieve rompslomp → meer focus op je patiënt</li>
              <li>Automatische samenvattingen verkleinen je werkdruk en reduceren fouten</li>
            </ul>
            <motion.a
              href="#soep"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full hover:shadow-lg transition transform hover:scale-105"
              initial={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              Lees meer
            </motion.a>
          </motion.div>

          <motion.div
            className="flex-1 rounded-xl overflow-hidden"
            initial="hidden"
            whileInView="visible"
            variants={reveal}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <video
              src={`${BASE}videos/soep-demo.mp4`}
              controls
              autoPlay
              muted
              loop
              className="w-full h-full object-cover rounded-xl shadow-xl"
            />
          </motion.div>
        </div>
      </section>

      {/* LIVE OPNAME */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto lg:flex lg:space-x-12 items-stretch">
          <motion.div
            className="flex-1 rounded-xl overflow-hidden mb-8 lg:mb-0"
            initial="hidden"
            whileInView="visible"
            variants={reveal}
            viewport={{ once: true }}
          >
            <img
  src={`${import.meta.env.BASE_URL}images/live-opname-illustration.jpg`}
  alt="Live opname"
  className="w-full h-full object-cover rounded-xl shadow-xl"
/>
          </motion.div>
          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-xl p-8 flex-1"
            initial="hidden"
            whileInView="visible"
            variants={reveal}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Live Opname in real-time</h2>
            <p className="text-white/80 mb-6">Focus volledig op je patiënt, niet op notities:</p>
            <ul className="list-disc list-inside text-white/80 space-y-2 mb-6">
              <li>Ultrasnelle transcriptie met <strong>minder dan 1 seconde</strong> vertraging</li>
              <li>99% nauwkeurig, ook bij achtergrondgeluid</li>
              <li>Herkenning van meerdere sprekers (arts & patiënt)</li>
              <li>Spreek vrijuit, zonder toetsen: meer oogcontact en empathie</li>
              <li>Naadloze export naar EPD of PDF</li>
            </ul>
          </motion.div>
        </div>
      </section>
            {/* AI CHAT ASSISTANT */}
<section className="py-20 px-6 bg-transparent">
  <div className="max-w-6xl mx-auto">
    <motion.div
      className="bg-white/10 backdrop-blur-md rounded-xl p-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl font-bold mb-4">AI Chat Assistant</h2>
      <p className="text-white/80 mb-4">
        Stel je medische vragen direct in de app en krijg slimme, gevalideerde ondersteuning.
      </p>
      <p className="text-white/80 mb-6">
        Geen boeken of Google meer opzoeken: vraag het gewoon aan onze chat-bot en ontvang direct een antwoord.
      </p>
      <motion.a
        href="#chat"
        className="inline-block px-6 py-3 bg-white text-blue-600 rounded-full hover:shadow-md transition transform hover:scale-105"
        initial={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        Meer over Chat
      </motion.a>
    </motion.div>
  </div>
</section>

      {/* FEATURES COMING SOON */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-xl p-8 hover:shadow-2xl transition-shadow cursor-pointer"
            initial="hidden"
            whileInView="visible"
            variants={reveal}
            viewport={{ once: true }}
          >
            <motion.h3
              className="text-2xl font-bold mb-3 bg-gradient-to-r from-indigo-400 to-blue-300 bg-clip-text text-transparent"
              initial="hidden"
              whileInView="visible"
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0, transition: { staggerChildren: 0.05 } }
              }}
            >
              Kleurcodering & Waarschuwingen
            </motion.h3>
            <div className="inline-block mb-4 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-semibold relative overflow-hidden">
              <span className="absolute inset-0 bg-white opacity-10 animate-[shine_2s_infinite]" />
              <span className="relative z-10">Coming soon</span>
            </div>
            <ul className="list-disc list-inside text-white/80 space-y-2">
              <li>Markeert urgentie van klachten met kleurcodering</li>
              <li>Automatische waarschuwingen bij kritieke symptomen</li>
            </ul>
          </motion.div>
          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-xl p-8 hover:shadow-2xl transition-shadow cursor-pointer"
            initial="hidden"
            whileInView="visible"
            variants={reveal}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.h3
              className="text-2xl font-bold mb-3 bg-gradient-to-r from-indigo-400 to-blue-300 bg-clip-text text-transparent"
              initial="hidden"
              whileInView="visible"
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0, transition: { staggerChildren: 0.05 } }
              }}
            >
              DD’s Voorspellings-hulpmiddel
            </motion.h3>
            <div className="inline-block mb-4 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-semibold relative overflow-hidden">
              <span className="absolute inset-0 bg-white opacity-10 animate-[shine_2s_infinite]" />
              <span className="relative z-10">Coming soon</span>
            </div>
            <ul className="list-disc list-inside text-white/80 space-y-2">
              <li>Geavanceerde differential-diagnose voorspelling</li>
              <li>Realtime analyse op basis van patiëntdata</li>
            </ul>
          </motion.div>
        </div>
      </section>

{/* PRIJZEN */}
<section id="pricing" className="py-20 px-6">
  <div className="max-w-6xl mx-auto text-center mb-12">
    <motion.h2
      className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-blue-300 bg-clip-text text-transparent"
      initial="hidden"
      whileInView="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 1 } }
      }}
      viewport={{ once: true }}
    >
      Prijzen
    </motion.h2>
  </div>
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
    {/* Gratis */}
    <motion.div
      className="glare-card bg-white/10 backdrop-blur-md rounded-xl p-8 text-center"
      initial="hidden"
      whileInView="visible"
      variants={reveal}
      viewport={{ once: true }}
    >
      <h3 className="text-2xl font-semibold mb-4">Gratis</h3>
      <p className="text-5xl font-bold mb-4">
        <CountUp to={0} duration={0.8}/> <span className="text-lg align-baseline">€/mnd</span>
      </p>
      <p className="mb-6">10 transcripties / maand</p>
      <a
        href="#signup-free"
        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
      >
        Aanmelden
      </a>
    </motion.div>

    {/* Pro */}
    <motion.div
      className="glare-card bg-white/10 backdrop-blur-md rounded-xl p-8 text-center"
      initial="hidden"
      whileInView="visible"
      variants={reveal}
      viewport={{ once: true }}
    >
      <h3 className="text-2xl font-semibold mb-4">Pro</h3>
      <p className="text-5xl font-bold mb-4">
        <CountUp to={80} duration={1.2} className="bg-gradient-to-r from-indigo-400 to-blue-300 bg-clip-text text-transparent inline-block"/>
        <span className="text-lg align-baseline">€/mnd</span>
      </p>
      <p className="mb-6">Onbeperkt transcripties</p>
      <a
        href="#signup-pro"
        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
      >
        Aanmelden
      </a>
    </motion.div>

    {/* Team */}
    <motion.div
      className="glare-card bg-white/10 backdrop-blur-md rounded-xl p-8 text-center"
      initial="hidden"
      whileInView="visible"
      variants={reveal}
      transition={{ delay: 0.2 }}
      viewport={{ once: true }}
    >
      <h3 className="text-2xl font-semibold mb-4">Team</h3>
      <p className="text-5xl font-bold mb-4">Contact</p>
      <p className="mb-6">Voor teams & organisaties</p>
      <a
        href="#contact"
        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
      >
        Contact
      </a>
    </motion.div>
  </div>
</section>

    </div>
  );
}
