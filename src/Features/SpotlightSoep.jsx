// src/components/Features/SpotlightSoep.jsx
import { motion } from "framer-motion";

export default function SpotlightSoep() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Links: tekst */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-slate-800">
            SOEP Verslag in seconden
          </h2>
          <p className="text-lg text-slate-600 max-w-xl">
            Genereer automatisch gestructureerde SOEP-verslagen, kant-en-klaar
            volgens de NHG-richtlijnen.
          </p>
          <ul className="list-disc list-inside text-slate-600 space-y-2">
            <li>Subjectief • Objectief • Evaluatie • Plan</li>
            <li>Direct export naar EPD of PDF</li>
            <li>Powered by Whisper V3 INT8 voor 99% nauwkeurige transcriptie</li>
          </ul>
        </motion.div>

        {/* Rechts: video */}
        <motion.div
          className="w-full aspect-video rounded-2xl overflow-hidden shadow-lg"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <video
            src={`${import.meta.env.BASE_URL}videos/soep-demo.mp4`}
            autoPlay
            muted
            loop
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
