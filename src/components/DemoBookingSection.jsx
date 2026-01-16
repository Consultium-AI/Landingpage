import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from '@emailjs/browser';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

// Generate time slots between 12:00 and 18:00 (or 15:00-18:00 for Fridays)
const generateTimeSlots = (isFriday = false) => {
  const slots = [];
  const startHour = isFriday ? 15 : 12;
  for (let hour = startHour; hour < 18; hour++) {
    slots.push(`${hour.toString().padStart(2, '0')}:00`);
    slots.push(`${hour.toString().padStart(2, '0')}:30`);
  }
  return slots;
};

// Get days in month
const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

// Get first day of month (0 = Sunday, 1 = Monday, etc.)
const getFirstDayOfMonth = (year, month) => {
  const day = new Date(year, month, 1).getDay();
  // Convert to Monday-first (0 = Monday, 6 = Sunday)
  return day === 0 ? 6 : day - 1;
};

// Check if date is in the past
const isPastDate = (date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};

// Check if date is weekend
const isWeekend = (date) => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

// Format date for display
const formatDate = (date) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('nl-NL', options);
};

const WEEKDAYS = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'];
const MONTHS = ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'];

export default function DemoBookingSection() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    praktijknaam: '',
    naam: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [step, setStep] = useState(1); // 1: date, 2: time, 3: form

  // Reset time when date changes
  useEffect(() => {
    setSelectedTime(null);
  }, [selectedDate]);

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDateSelect = (day) => {
    const date = new Date(currentYear, currentMonth, day);
    if (!isPastDate(date) && !isWeekend(date)) {
      setSelectedDate(date);
      setStep(2);
    }
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setStep(3);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !formData.email || !formData.praktijknaam) return;

    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      emailjs.init('m_0ogVltjaSP8A6sf');

      const formattedDate = formatDate(selectedDate);
      
      // Email to owner (info@consultiumai.com)
      const ownerEmailParams = {
        name: formData.naam || formData.praktijknaam,
        email: formData.email,
        message: `NIEUWE DEMO AANVRAAG\n\n📅 Datum: ${formattedDate}\n⏰ Tijd: ${selectedTime}\n\n👤 Naam: ${formData.naam || '-'}\n🏥 Praktijk: ${formData.praktijknaam}\n📧 Email: ${formData.email}\n\nDeze afspraak is bevestigd. Neem contact op met de praktijk voor verdere details.`,
        subject: `Demo Aanvraag - ${formattedDate} om ${selectedTime}`,
        to_email: 'info@consultiumai.com'
      };

      // Try to send email
      const possibleTemplates = ['template_3wepyib', 'template_1', 'template_contact', 'template_consultium'];
      let emailSent = false;
      
      for (const templateId of possibleTemplates) {
        try {
          await emailjs.send('service_eswaa5o', templateId, ownerEmailParams);
          emailSent = true;
          break;
        } catch {
          continue;
        }
      }

      if (!emailSent) {
        // Fallback template
        await emailjs.send('service_eswaa5o', 'contact_form', ownerEmailParams, 'm_0ogVltjaSP8A6sf');
      }

      // Send confirmation email to the person booking
      const confirmationParams = {
        name: formData.naam || formData.praktijknaam,
        email: formData.email,
        message: `Beste ${formData.naam || formData.praktijknaam},\n\nUw demo is bevestigd!\n\n📅 Datum: ${formattedDate}\n⏰ Tijd: ${selectedTime}\n🏥 Praktijk: ${formData.praktijknaam}\n\nWat kunt u verwachten:\n• We komen bij u langs met een tablet\n• U ontvangt een testlink met een demo-omgeving\n• We hebben een script klaar met een 'dummy' patiënt\n• U ervaart zelf hoe Consultium AI werkt\n\nMocht u vragen hebben of de afspraak willen wijzigen, neem dan contact op via info@consultiumai.com of WhatsApp: +31 85 080 5541.\n\nMet vriendelijke groet,\nTeam Consultium AI`,
        subject: `Bevestiging: Demo gepland op ${formattedDate}`,
        to_email: formData.email
      };

      // Try to send confirmation
      for (const templateId of possibleTemplates) {
        try {
          await emailjs.send('service_eswaa5o', templateId, confirmationParams);
          break;
        } catch {
          continue;
        }
      }
      
      setSubmitStatus('success');
      setFormData({ email: '', praktijknaam: '', naam: '' });
      setSelectedDate(null);
      setSelectedTime(null);
      setStep(1);
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 md:h-12" />);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isDisabled = isPastDate(date) || isWeekend(date);
      const isSelected = selectedDate && 
        selectedDate.getDate() === day && 
        selectedDate.getMonth() === currentMonth && 
        selectedDate.getFullYear() === currentYear;
      const isToday = new Date().toDateString() === date.toDateString();

      days.push(
        <button
          key={day}
          onClick={() => handleDateSelect(day)}
          disabled={isDisabled}
          className={`h-10 md:h-12 rounded-xl text-sm md:text-base font-medium transition-all duration-200 ${
            isDisabled
              ? 'text-gray-300 cursor-not-allowed'
              : isSelected
              ? 'bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30'
              : isToday
              ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  // Check if we can go to previous month (not before current month)
  const canGoPrevious = () => {
    const now = new Date();
    return currentYear > now.getFullYear() || 
      (currentYear === now.getFullYear() && currentMonth > now.getMonth());
  };

  return (
    <section id="demo" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-white" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-[1800px] mx-auto px-6 lg:px-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={stagger}
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 text-sm font-semibold rounded-full mb-6">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Plan een Demo
            </motion.div>

            <motion.h2 variants={fadeIn} className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] mb-6">
              <span className="block">Ervaar Consultium AI</span>
              <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">in uw praktijk.</span>
            </motion.h2>

            <motion.p variants={fadeIn} className="text-xl text-gray-500 max-w-2xl mx-auto">
              Plan een gratis demo en ontdek hoe onze AI-assistent uw consulten kan transformeren. Wij komen bij u langs met alles wat u nodig heeft.
            </motion.p>
          </div>

          {/* Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left - Info */}
            <motion.div variants={fadeIn} className="space-y-8">
              <div className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Wat kunt u verwachten?</h3>
                
                <div className="space-y-6">
                  {[
                    {
                      icon: (
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      ),
                      title: "Wij komen bij u langs",
                      desc: "Met een tablet en alles wat u nodig heeft voor de demo."
                    },
                    {
                      icon: (
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                      ),
                      title: "Testlink met demo-omgeving",
                      desc: "U krijgt toegang tot een volledige test-omgeving van Consultium AI."
                    },
                    {
                      icon: (
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      ),
                      title: "Script met 'dummy' patiënt",
                      desc: "We hebben een realistisch consultscript voorbereid zodat u de app kunt ervaren."
                    },
                    {
                      icon: (
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ),
                      title: "Ervaar het zelf",
                      desc: "Geen PowerPoint, maar een echte hands-on ervaring met de software."
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h4>
                        <p className="text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Demo tijdslots: 12:00 - 18:00</p>
                      <p className="text-sm text-gray-600">Maandag t/m donderdag: 12:00-18:00</p>
                      <p className="text-sm text-gray-600">Vrijdag: 15:00-18:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right - Calendar & Form */}
            <motion.div variants={fadeIn} className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl shadow-gray-200/50 border border-gray-100">
              {/* Progress Steps */}
              <div className="flex items-center justify-center gap-2 mb-8">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      step >= s 
                        ? 'bg-gradient-to-br from-blue-600 to-cyan-500 text-white' 
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      {s}
                    </div>
                    {s < 3 && (
                      <div className={`w-12 h-1 mx-1 rounded-full transition-all duration-300 ${
                        step > s ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 'bg-gray-100'
                      }`} />
                    )}
                  </div>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {/* Step 1: Calendar */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Kies een datum</h3>
                    
                    {/* Month Navigation */}
                    <div className="flex items-center justify-between mb-6">
                      <button
                        onClick={goToPreviousMonth}
                        disabled={!canGoPrevious()}
                        className={`p-2 rounded-xl transition-all ${
                          canGoPrevious() 
                            ? 'hover:bg-gray-100 text-gray-700' 
                            : 'text-gray-300 cursor-not-allowed'
                        }`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <h4 className="text-lg font-bold text-gray-900">
                        {MONTHS[currentMonth]} {currentYear}
                      </h4>
                      <button
                        onClick={goToNextMonth}
                        className="p-2 rounded-xl hover:bg-gray-100 text-gray-700 transition-all"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>

                    {/* Weekday Headers */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {WEEKDAYS.map((day) => (
                        <div key={day} className="h-10 flex items-center justify-center text-sm font-semibold text-gray-500">
                          {day}
                        </div>
                      ))}
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-1">
                      {renderCalendar()}
                    </div>

                    <p className="text-sm text-gray-500 text-center mt-6">
                      Weekenden zijn niet beschikbaar
                    </p>
                  </motion.div>
                )}

                {/* Step 2: Time Selection */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <button
                      onClick={() => setStep(1)}
                      className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Terug naar kalender
                    </button>

                    <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Kies een tijdstip</h3>
                    <p className="text-gray-600 text-center mb-6">
                      {selectedDate && formatDate(selectedDate)}
                    </p>
                    
                    {selectedDate && (
                      <div className="grid grid-cols-3 gap-3">
                        {generateTimeSlots(selectedDate.getDay() === 5).map((time) => (
                          <button
                            key={time}
                            onClick={() => handleTimeSelect(time)}
                            className={`py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                              selectedTime === time
                                ? 'bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg'
                                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Step 3: Form */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <button
                      onClick={() => setStep(2)}
                      className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Terug naar tijdselectie
                    </button>

                    <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Bevestig uw afspraak</h3>
                    
                    {/* Selected date/time summary */}
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-4 mb-6 border border-blue-100">
                      <div className="flex items-center justify-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="font-medium text-gray-900">{selectedDate && formatDate(selectedDate)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="font-medium text-gray-900">{selectedTime}</span>
                        </div>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="demo-naam" className="block text-sm font-semibold text-gray-700 mb-2">
                          Naam
                        </label>
                        <input
                          type="text"
                          id="demo-naam"
                          name="naam"
                          value={formData.naam}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3.5 text-base border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 hover:bg-white"
                          placeholder="Uw naam"
                        />
                      </div>

                      <div>
                        <label htmlFor="demo-praktijknaam" className="block text-sm font-semibold text-gray-700 mb-2">
                          Praktijknaam <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="demo-praktijknaam"
                          name="praktijknaam"
                          value={formData.praktijknaam}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3.5 text-base border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 hover:bg-white"
                          placeholder="Naam van uw praktijk"
                        />
                      </div>

                      <div>
                        <label htmlFor="demo-email" className="block text-sm font-semibold text-gray-700 mb-2">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="demo-email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3.5 text-base border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 hover:bg-white"
                          placeholder="uw.email@voorbeeld.nl"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full px-8 py-4 font-semibold rounded-xl transition-all duration-200 ${
                          isSubmitting
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl'
                        }`}
                      >
                        <span className="flex items-center justify-center gap-2">
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                              </svg>
                              <span>Wordt bevestigd...</span>
                            </>
                          ) : (
                            <>
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span>Bevestig Demo Afspraak</span>
                            </>
                          )}
                        </span>
                      </button>

                      {submitStatus === 'success' && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 bg-green-50 border border-green-200 rounded-xl"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                            </svg>
                            <p className="text-green-800 font-semibold">Demo succesvol ingepland!</p>
                          </div>
                          <p className="text-green-700 text-sm">U ontvangt een bevestigingsmail. Wij komen bij u langs op de geplande datum.</p>
                        </motion.div>
                      )}

                      {submitStatus === 'error' && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 bg-red-50 border border-red-200 rounded-xl"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                            </svg>
                            <p className="text-red-800 font-semibold">Er ging iets mis</p>
                          </div>
                          <p className="text-red-700 text-sm">Probeer het opnieuw of neem contact op via WhatsApp: +31 85 080 5541</p>
                        </motion.div>
                      )}
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

