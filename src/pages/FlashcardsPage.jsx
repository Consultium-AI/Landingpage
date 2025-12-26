// src/pages/FlashcardsPage.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const flashcardsData = [
  {
    id: 1,
    front: "AER (Apicale Ectodermale Ridge): functie?",
    back: "Ectodermale richel aan distale rand van de ledemaatknop; houdt onderliggend mesenchym ongedifferentieerd en prolifererend (progress zone) en stuurt proximodistale uitgroei (o.a. via FGF-signalen)."
  },
  {
    id: 2,
    front: "Inductie: wat betekent het in embryologie?",
    back: "Een weefsel/celgroep (inductor) beïnvloedt het lot van een andere (responder) via signalen. Responder moet \"competent\" zijn om te reageren."
  },
  {
    id: 3,
    front: "Epitheel–mesenchym interactie: voorbeeld in ledemaatontwikkeling?",
    back: "AER (ectoderm/epitheel) stuurt differentiatie en groei van mesenchym in de ledemaatknop."
  },
  {
    id: 4,
    front: "Proximodistale ontwikkeling: welke 3 delen?",
    back: "Stylopod (humerus/femur) – zeugopod (radius/ulna, tibia/fibula) – autopod (hand/voet: carpalia/tarsalia, metacarpalia/metatarsalia, digiti)."
  },
  {
    id: 5,
    front: "Hand- en voetplaat: hoe ontstaan vingers/tenen?",
    back: "Door geprogrammeerde celdood (apoptose) in de interdigitale gebieden; condensatie mesenchym vormt digitale stralen."
  },
  {
    id: 6,
    front: "Hoofdas ledemaat: wat bepaalt pre-axiaal vs post-axiaal?",
    back: "In de PD-as ligt craniaal pre-axiaal en caudaal post-axiaal; door rotatie van ledematen komt dit anders uit in boven- vs onderledemaat (klinische relevantie bij reductiedefecten)."
  },
  {
    id: 7,
    front: "Dermatoom: definitie?",
    back: "Huidgebied dat sensibel wordt geïnnerveerd door één spinaal segment (één ruggenmergzenuw)."
  },
  {
    id: 8,
    front: "Huidverzorgingsgebieden (perifere zenuwen) vs dermatomes: verschil?",
    back: "Dermatoom = spinaal niveau. Huidverzorgingsgebied = perifere zenuw (bv. n. medianus/ulnaris/radialis) en is vaak een mix van meerdere spinale niveaus."
  },
  {
    id: 9,
    front: "Botontwikkeling (endochondrale ossificatie): kernstappen?",
    back: "Mesenchym → kraakbeenmodel → primaire ossificatiecentrum (diafyse) + vascularisatie → secundaire ossificatiecentra (epifysen) → lengtegroei via groeischijf."
  },
  {
    id: 10,
    front: "Desmale verbening: wat is het? (ook direct/primair)",
    back: "Mesenchym → osteoblasten → botmatrix (zonder kraakbeenmodel). Voorbeelden: schedelbeenderen, (deel) clavicula."
  },
  {
    id: 11,
    front: "Juncturae: 4 hoofdtypen?",
    back: "Junctura fibrosa (bindweefsel), cartilaginea (kraakbeen), ossea (botverbinding), synovialis (synoviaal gewricht)."
  },
  {
    id: 12,
    front: "Voorbeelden bij de juncturae (koppelen):",
    back: "Syndesmose = fibrosa; discus intervertebralis = cartilaginea; acetabulum/heupbeenfusie = ossea; enkel/schouder = synovialis."
  },
  {
    id: 13,
    front: "Welke junctura is het meest beweeglijk?",
    back: "Junctura synovialis (diarthrose) is het meest beweeglijk."
  },
  {
    id: 14,
    front: "Synoviaal gewrichtskapsel: 2 lagen?",
    back: "Membrana synovialis (binnenlaag) + membrana fibrosa (buitenlaag)."
  },
  {
    id: 15,
    front: "Synovia (gewrichtsvloeistof): functie?",
    back: "Voedt hyalien kraakbeen en vermindert wrijving tussen gewrichtsvlakken."
  }
];

function FlashCard({ card, isFlipped, onFlip }) {
  return (
    <div 
      className="relative w-full max-w-2xl h-80 cursor-pointer perspective-1000"
      onClick={onFlip}
    >
      <motion.div
        className="relative w-full h-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div 
          className="absolute inset-0 w-full h-full rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-1 shadow-2xl"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="w-full h-full rounded-3xl bg-slate-900/95 flex flex-col items-center justify-center p-8 text-center">
            <div className="absolute top-4 left-4 text-white/30 text-sm font-mono">
              Vraag
            </div>
            <p className="text-xl md:text-2xl font-semibold text-white leading-relaxed">
              {card.front}
            </p>
            <div className="absolute bottom-4 text-white/40 text-sm">
              Klik om te draaien
            </div>
          </div>
        </div>

        {/* Back */}
        <div 
          className="absolute inset-0 w-full h-full rounded-3xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-1 shadow-2xl"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="w-full h-full rounded-3xl bg-slate-900/95 flex flex-col items-center justify-center p-8 text-center">
            <div className="absolute top-4 left-4 text-white/30 text-sm font-mono">
              Antwoord
            </div>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              {card.back}
            </p>
            <div className="absolute bottom-4 text-white/40 text-sm">
              Klik om te draaien
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function FlashcardsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studiedCards, setStudiedCards] = useState(new Set());
  const [shuffledCards, setShuffledCards] = useState(flashcardsData);

  useEffect(() => {
    document.title = "Flashcards - Embryologie & Bewegingsapparaat";
  }, []);

  const shuffleCards = () => {
    const shuffled = [...flashcardsData].sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    setStudiedCards(new Set());
  };

  const nextCard = () => {
    if (currentIndex < shuffledCards.length - 1) {
      setStudiedCards(prev => new Set([...prev, shuffledCards[currentIndex].id]));
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setIsFlipped(false);
    }
  };

  const goToCard = (index) => {
    setCurrentIndex(index);
    setIsFlipped(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight" || e.key === " ") {
      e.preventDefault();
      nextCard();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevCard();
    } else if (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "Enter") {
      e.preventDefault();
      setIsFlipped(prev => !prev);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, shuffledCards.length]);

  const progress = ((currentIndex + 1) / shuffledCards.length) * 100;

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950/50 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_80%_80%,rgba(45,212,191,0.08),transparent)]" />
        
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 bg-slate-900/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a 
            href="/"
            className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium">Terug naar home</span>
          </a>
          
          <div className="flex items-center gap-4">
            <span className="text-white/60 text-sm hidden sm:block">
              {studiedCards.size} / {shuffledCards.length} bestudeerd
            </span>
            <button
              onClick={shuffleCards}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white/80 hover:text-white transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span className="hidden sm:inline">Shuffle</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
            Embryologie & Bewegingsapparaat
          </h1>
          <p className="text-white/60">
            Medische flashcards voor anatomie en embryologie
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between text-sm text-white/60 mb-2">
            <span>Kaart {currentIndex + 1} van {shuffledCards.length}</span>
            <span>{Math.round(progress)}% voltooid</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Flashcard */}
        <div className="flex justify-center mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <FlashCard 
                card={shuffledCards[currentIndex]} 
                isFlipped={isFlipped}
                onFlip={() => setIsFlipped(prev => !prev)}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <button
            onClick={prevCard}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed border border-white/10 text-white transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Vorige
          </button>
          
          <button
            onClick={() => setIsFlipped(prev => !prev)}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200"
          >
            {isFlipped ? "Toon vraag" : "Toon antwoord"}
          </button>
          
          <button
            onClick={nextCard}
            disabled={currentIndex === shuffledCards.length - 1}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed border border-white/10 text-white transition-all duration-200"
          >
            Volgende
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Card Grid (Mini navigation) */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-center text-white/60 text-sm mb-4">Snelle navigatie</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {shuffledCards.map((card, index) => (
              <button
                key={card.id}
                onClick={() => goToCard(index)}
                className={`w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200 ${
                  index === currentIndex 
                    ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25" 
                    : studiedCards.has(card.id)
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "bg-white/10 text-white/60 hover:bg-white/20 hover:text-white border border-white/10"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Keyboard shortcuts */}
        <div className="mt-12 text-center">
          <p className="text-white/40 text-sm">
            Sneltoetsen: ← Vorige | → Volgende | ↑↓ of Enter: Draai kaart | Spatie: Volgende
          </p>
        </div>
      </main>

      {/* CSS for 3D transforms */}
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
}

