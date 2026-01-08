import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function AboutSection() {
  return (
    <>
      {/* ABOUT SECTION */}
      <section id="about" className="relative bg-white min-h-screen flex items-center overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.02]" 
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
          }}
        />
        
        <div className="w-full max-w-[1800px] mx-auto px-6 lg:px-16 py-24 lg:py-32 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={stagger}
            viewport={{ once: true, margin: "-100px" }}
            className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center"
          >
            {/* Left - Typography */}
            <div>
              <motion.p variants={fadeIn} className="text-sm font-semibold tracking-widest text-gray-400 uppercase mb-6">
                Over Ons
              </motion.p>
              
              <motion.h2 variants={fadeIn} className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-[1.1] mb-8">
                <span className="block">Technologie die</span>
                <span className="block bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                  zorg versterkt.
                </span>
              </motion.h2>

              <motion.p variants={fadeIn} className="text-xl lg:text-2xl text-gray-500 leading-relaxed max-w-xl">
                Consultium AI is ontstaan vanuit één overtuiging: zorgverleners verdienen tools die hen administratieve werklast verlicht!
              </motion.p>
            </div>

            {/* Right - Content blocks */}
            <motion.div variants={stagger} className="space-y-8">
              {[
                { num: "01", title: "Het Begin", text: "We zagen hoe artsen dagelijks overspoeld werden met papierwerk. Kostbare tijd die naar administratie ging in plaats van naar patiënten. Dit moest anders." },
                { num: "02", title: "Onze Missie", text: "Van automatische SOEP-verslagen naar live vertaalde gesprekken. We bouwen intuïtieve AI-tools die moeiteloos meedraaien in het dagelijkse ritme van de praktijk." },
                { num: "03", title: "De Impact", text: "Meer oogcontact. Meer vertrouwen. Meer tijd voor wat écht telt: de patiënt. Administratie verlichten en tijd teruggeven aan arts én patiënt." }
              ].map((item, i) => (
                <motion.div key={i} variants={fadeIn} className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">{item.num}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* PRIVACY SECTION */}
      <section id="privacy" className="relative bg-gray-900 min-h-screen flex items-center overflow-hidden">
        <div className="w-full max-w-[1800px] mx-auto px-6 lg:px-16 py-24 lg:py-32 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={stagger}
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Header */}
            <div className="text-center mb-20">
              <motion.div variants={fadeIn} >
              </motion.div>

              <motion.h2 variants={fadeIn} className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] mb-6">
                <span className="block">Jouw privacy,</span>
                <span className="block bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                  onze prioriteit.
                </span>
              </motion.h2>

              <motion.p variants={fadeIn} className="text-xl text-gray-400 max-w-2xl mx-auto">
                Bij Consultium AI staat gegevensbescherming centraal. Veiligheid is geen feature, het is de basis.
              </motion.p>
            </div>

            {/* Privacy Features Grid */}
            <motion.div variants={stagger} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", title: "Privacy-by-Design", desc: "Spraak wordt uitsluitend lokaal of tijdelijk verwerkt en direct na transcriptie gewist.", color: "green" },
                { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", title: "Geen Opslag", desc: "We slaan geen patiëntgegevens op en hebben geen toegang tot medische dossiers.", color: "green" },
                { icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z", title: "AVG Compliant", desc: "Minimale dataverwerking volgens de basisprincipes van de Algemene Verordening Gegevensbescherming.", color: "green" },
                { icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", title: "Verwerkingsovereenkomst", desc: "We sluiten voor gebruik met elke praktijk een verwerkingsovereenkomst af.", color: "green" },
                { icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", title: "DPIA", desc: "Data Protection Impact Assessment is afgerond en beschikbaar.", color: "green" },
                { icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z", title: "ISO 27001 & NEN 7510", desc: "We werken aan certificering conform ISO 27001 en NEN 7510 voor informatiebeveiliging. (NIET AFGEROND)", color: "orange" }
              ].map((item, index) => (
                <motion.div key={index} variants={fadeIn} className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-200">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${item.color === "orange" ? "bg-orange-400/20 text-orange-400" : "bg-green-400/20 text-green-400"}`}>
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* PLAN / ROADMAP SECTION */}
      <section id="plan" className="relative bg-slate-50 min-h-screen flex items-center overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.02]" 
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
          }}
        />
        
        <div className="w-full max-w-[1800px] mx-auto px-6 lg:px-16 py-24 lg:py-32 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={stagger}
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Header */}
            <div className="text-center mb-20">
              <motion.div variants={fadeIn} >
              </motion.div>
              <motion.h2 variants={fadeIn} className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-[1.1] mb-6">
                <span className="block">Samen bouwen we</span>
                <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  de toekomst.
                </span>
              </motion.h2>

              <motion.p variants={fadeIn} className="text-xl text-gray-500 max-w-2xl mx-auto">
                We ontwikkelen geen product voor de zorg, we ontwikkelen het met de zorg. 
                Elke functie wordt getest in de praktijk.
              </motion.p>
            </div>

            {/* Timeline */}
            <motion.div variants={stagger} className="relative max-w-4xl mx-auto">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-200 via-blue-400 to-cyan-400 hidden md:block"></div>

              {[
                { year: "2024", title: "Concept", desc: "Ontstaan van het idee en eerste validatie met zorgprofessionals.", status: "completed", align: "right" },
                { year: "2025", title: "Prototype & Beta", desc: "Ontwikkeling van de eerste werkende versie en uitgebreide tests in de praktijk.", status: "completed", align: "left" },
                { year: "2026", title: "Pilot & Productie", desc: "Q1: Laatste pilot-fase met geselecteerde praktijken.\nQ2: Officiële productie-release.", status: "current", align: "right" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className={`relative flex items-center mb-16 last:mb-0 ${item.align === "left" ? "md:flex-row-reverse" : ""}`}
                >
                  <div className={`w-full md:w-1/2 ${item.align === "left" ? "md:pl-16" : "md:pr-16"}`}>
                    <div className={`bg-white rounded-2xl p-8 shadow-lg shadow-gray-200/50 border border-gray-100 ${item.status === "current" ? "ring-2 ring-blue-500 ring-offset-4" : ""}`}>
                      <div className="flex items-center gap-4 mb-4">
                        <span className={`text-4xl font-bold ${item.status === "completed" ? "text-green-500" : item.status === "current" ? "bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent" : "text-gray-300"}`}>
                          {item.year}
                        </span>
                        {item.status === "current" && <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">Nu actief</span>}
                        {item.status === "completed" && <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">Voltooid</span>}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.desc.split('\n').map((line, i, arr) => (
                        <span key={i}>
                          {line}
                          {i < arr.length - 1 && <br />}
                        </span>
                      ))}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center">
                    <div className={`w-5 h-5 rounded-full border-4 border-white shadow-md ${item.status === "completed" ? "bg-green-500" : item.status === "current" ? "bg-blue-500" : "bg-gray-300"}`}></div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeIn} className="text-center mt-20">
              <p className="text-gray-600 mb-6 text-lg">Wil je meedenken én meeprofiteren? Word early adopter.</p>
              <a href="#contact" className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-full hover:shadow-lg transition-shadow duration-200">
                <span>Neem Contact Op</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Wave transition to Contact */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-24" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 L1200,60 L1200,120 L0,120 Z" fill="#f1f5f9" />
          </svg>
        </div>
      </section>
    </>
  );
}
