// src/components/SpotlightSection.jsx
import { SplitText, GlareHover } from "reactbits";
import { motion } from "framer-motion";

export default function SpotlightSection() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* LINKS: Splitsende kop + bullets + CTA */}
        <div className="space-y-6">
          <SplitText
            as="h2"
            className="text-4xl lg:text-5xl font-bold text-slate-800 leading-tight"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ staggerChildren: 0.05, duration: 0.6 }}
          >
            Empowering healthcare providers with ambient listening
          </SplitText>

          <motion.p
            className="text-lg text-slate-600 max-w-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Neem live-opnames op en krijg direct gestructureerde notities tijdens je consult, zonder extra handwerk.
          </motion.p>

          <ul className="list-disc list-inside text-slate-600 space-y-2 max-w-md">
            <li>Realtime transcriptie met Whisper V3 INT8</li>
            <li>Automatisch SOEP-verslag klaar voor export</li>
            <li>Verlaag administratietijd tot 40%</li>
          </ul>

          <GlareHover
            as="a"
            href="#try"
            className="inline-block mt-6 px-8 py-3 bg-blue-600 text-white font-semibold rounded-full"
          >
            Probeer gratis
          </GlareHover>
        </div>

        {/* RECHTS: Grote illustratie / fullscreen screenshot */}
        <motion.div
          className="w-full rounded-2xl overflow-hidden shadow-lg"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <img
            src="/images/recording-ui.png"
            alt="Live opname interface"
            className="w-full h-auto object-cover"
          />
        </motion.div>
      </div>
    </section>
);
}
