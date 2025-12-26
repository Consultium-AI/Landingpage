import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import emailjs from '@emailjs/browser';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

export default function ContactSection() {
  const [formData, setFormData] = useState({
    voornaam: '',
    achternaam: '',
    email: '',
    huisartspraktijk: '',
    bericht: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  useEffect(() => {
    const handleFillPilotMessage = (event) => {
      setFormData(prev => ({ ...prev, bericht: event.detail.message }));
      setTimeout(() => {
        const praktijkField = document.getElementById('huisartspraktijk');
        if (praktijkField) praktijkField.focus();
      }, 100);
    };

    window.addEventListener('fillPilotMessage', handleFillPilotMessage);
    return () => window.removeEventListener('fillPilotMessage', handleFillPilotMessage);
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      emailjs.init('m_0ogVltjaSP8A6sf');

      const composedMessage = (formData.bericht && formData.bericht.trim().length > 0)
        ? formData.bericht
        : `Ik wil graag deelnemen aan de pilot.\nHuisartspraktijk: ${formData.huisartspraktijk || '-'}`;

      const templateParams = {
        name: `${formData.voornaam} ${formData.achternaam}`.trim(),
        email: formData.email,
        message: composedMessage,
        subject: 'Pilot-deelname',
        to_email: 'info@consultiumai.com'
      };

      const possibleTemplates = ['template_3wepyib', 'template_1', 'template_contact', 'template_consultium'];
      let emailSent = false;
      
      for (const templateId of possibleTemplates) {
        try {
          await emailjs.send('service_eswaa5o', templateId, templateParams);
          emailSent = true;
          break;
        } catch {
          continue;
        }
      }

      if (!emailSent) throw new Error('Geen werkende template gevonden');
      
      setSubmitStatus('success');
      setFormData({ voornaam: '', achternaam: '', email: '', huisartspraktijk: '', bericht: '' });
    } catch {
      try {
        await emailjs.send('service_eswaa5o', 'contact_form', {
          name: `${formData.voornaam} ${formData.achternaam}`.trim(),
          email: formData.email,
          message: (formData.bericht && formData.bericht.trim().length > 0) ? formData.bericht : `Ik wil graag deelnemen aan de pilot.\nHuisartspraktijk: ${formData.huisartspraktijk || '-'}`
        }, 'm_0ogVltjaSP8A6sf');
        setSubmitStatus('success');
        setFormData({ voornaam: '', achternaam: '', email: '', huisartspraktijk: '', bericht: '' });
      } catch {
        setSubmitStatus('error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative bg-slate-50 min-h-screen flex items-center overflow-hidden">
      {/* Smooth transition from Plan section */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg className="relative block w-full h-24" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,120 L1200,60 L1200,0 L0,0 Z" fill="#f1f5f9" />
        </svg>
      </div>
      
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

            <motion.h2 variants={fadeIn} className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-[1.1] mb-6">
              <span className="block">Word onderdeel van</span>
              <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">de toekomst.</span>
            </motion.h2>

            <motion.p variants={fadeIn} className="text-xl text-gray-500 max-w-2xl mx-auto">
              Sluit je aan bij collega-zorgverleners die met Consultium AI tijd winnen, administratie verlichten en meer ruimte creëren voor echte patiëntenzorg.
            </motion.p>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left - Benefits */}
            <motion.div variants={stagger} className="space-y-8">
              <motion.div variants={fadeIn} className="bg-white rounded-3xl p-8 shadow-lg shadow-gray-200/50 border border-gray-100">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Pilot programma</h3>
                    <p className="text-gray-600 text-sm mb-4">Start oktober 2025</p>
                    <p className="text-gray-700 leading-relaxed">
                      Als early adopter krijg je exclusieve toegang tot alle nieuwe features voordat ze officieel worden gelanceerd.
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-100">
                  {["Gratis toegang tijdens de hele pilot fase", "Inspraak op nieuwe features", "Directe ondersteuning bij vragen", "Exclusieve korting op de officiële release"].map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* WhatsApp CTA */}
              <motion.div variants={fadeIn} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-200/50">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Direct contact?</h3>
                    <p className="text-gray-600 text-sm mb-4">Neem direct contact op via WhatsApp voor snelle antwoorden.</p>
                    <a href="https://wa.me/31850805541" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl hover:shadow-lg transition-shadow duration-200">
                      <span>WhatsApp Nu</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right - Form */}
            <motion.div variants={fadeIn} className="bg-white rounded-3xl p-10 lg:p-12 shadow-xl shadow-gray-200/50 border border-gray-100">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-3xl font-bold text-gray-900">Doe mee aan de Pilot</h3>
                  <span className="px-4 py-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-bold rounded-full">GRATIS</span>
                </div>
                <p className="text-gray-600">Schrijf je vandaag nog in en ervaar hoe wij jouw praktijk kunnen transformeren.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="voornaam" className="block text-sm font-semibold text-gray-700 mb-2">Voornaam</label>
                    <input type="text" id="voornaam" name="voornaam" value={formData.voornaam} onChange={handleInputChange}
                      className="w-full px-4 py-3.5 text-base border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 hover:bg-white"
                      placeholder="Uw voornaam" />
                  </div>
                  <div>
                    <label htmlFor="achternaam" className="block text-sm font-semibold text-gray-700 mb-2">Achternaam <span className="text-red-500">*</span></label>
                    <input type="text" id="achternaam" name="achternaam" value={formData.achternaam} onChange={handleInputChange} required
                      className="w-full px-4 py-3.5 text-base border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 hover:bg-white"
                      placeholder="Uw achternaam" />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email <span className="text-red-500">*</span></label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required
                    className="w-full px-4 py-3.5 text-base border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 hover:bg-white"
                    placeholder="uw.email@voorbeeld.nl" />
                </div>

                <div>
                  <label htmlFor="huisartspraktijk" className="block text-sm font-semibold text-gray-700 mb-2">Huisartspraktijk <span className="text-red-500">*</span></label>
                  <input type="text" id="huisartspraktijk" name="huisartspraktijk" value={formData.huisartspraktijk} onChange={handleInputChange} required
                    className="w-full px-4 py-3.5 text-base border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 hover:bg-white"
                    placeholder="Naam van uw huisartspraktijk" />
                </div>

                <button type="submit" disabled={isSubmitting}
                  className={`w-full px-8 py-4 font-semibold rounded-xl transition-all duration-200 ${
                    isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl'
                  }`}>
                  <span className="flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                        </svg>
                        <span>Wordt verstuurd...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        <span>Ik wil graag deelnemen aan de pilot</span>
                      </>
                    )}
                  </span>
                </button>

                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                    <div className="flex items-center gap-2 mb-1">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      <p className="text-green-800 font-semibold">Bericht succesvol verstuurd!</p>
                    </div>
                    <p className="text-green-700 text-sm">We nemen binnen 24 uur contact met je op.</p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                    <div className="flex items-center gap-2 mb-1">
                      <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                      </svg>
                      <p className="text-red-800 font-semibold">Er ging iets mis bij het versturen</p>
                    </div>
                    <p className="text-red-700 text-sm">Probeer het opnieuw of neem direct contact op via WhatsApp.</p>
                  </div>
                )}
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
