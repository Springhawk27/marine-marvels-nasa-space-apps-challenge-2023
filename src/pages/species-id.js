import RootLayout from "@/components/Layouts/RootLayout";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import speciesData from "@/data/speciesData";

const diffColors = { easy: "#4ECDC4", medium: "#FFBF89", hard: "#FD79A8" };
const catColors = { Mammal: "#4ECDC4", Cephalopod: "#6C5CE7", Fish: "#FFBF89", Reptile: "#5da66a", Cnidarian: "#FD79A8", Crustacean: "#e8c547" };

/* ═══ ENCYCLOPEDIA ═══ */
function Encyclopedia({ onBack }) {
  const [expanded, setExpanded] = useState(null);
  const [filter, setFilter] = useState("All");
  const categories = useMemo(() => [...new Set(speciesData.map(s => s.category))], []);
  const filtered = filter === "All" ? speciesData : speciesData.filter(s => s.category === filter);

  return (
    <div className="min-h-screen bg-gradient-deep pt-24 pb-20 px-4 md:px-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <button onClick={onBack} className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm bg-transparent border-none cursor-pointer mb-2 transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Back to Game
            </button>
            <h1 className="text-3xl font-display font-bold text-white">Marine Encyclopedia</h1>
            <p className="text-white/40 text-sm mt-1">Learn about each species before guessing</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          <button onClick={() => setFilter("All")}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border cursor-pointer transition-all ${
              filter === "All" ? "bg-white text-deep-900 border-white" : "bg-transparent border-white/10 text-white/40 hover:text-white/70"}`}>
            All ({speciesData.length})
          </button>
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border cursor-pointer transition-all ${
                filter === cat ? "text-deep-900 border-transparent" : "bg-transparent border-white/10 text-white/40 hover:text-white/70"}`}
              style={filter === cat ? { backgroundColor: catColors[cat] || "#888" } : {}}>
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map((species, i) => {
            const isOpen = expanded === species.id;
            return (
              <motion.div key={species.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                className="glass-card overflow-hidden cursor-pointer" onClick={() => setExpanded(isOpen ? null : species.id)}>
                <div className="p-5 flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <h3 className="text-white font-display text-lg font-bold">{species.name}</h3>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: `${catColors[species.category] || "#888"}20`, color: catColors[species.category] || "#888" }}>
                        {species.category}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: `${diffColors[species.difficulty]}15`, color: diffColors[species.difficulty] }}>
                        {species.difficulty}
                      </span>
                    </div>
                    <p className="text-white/40 text-sm">{species.zone} Zone</p>
                  </div>
                  <motion.svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    className="text-white/20 flex-shrink-0 mt-1" animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <path d="M6 9l6 6 6-6"/>
                  </motion.svg>
                </div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                      <div className="px-5 pb-5">
                        <div className="h-px bg-white/5 mb-4"/>
                        {/* Clues */}
                        <h4 className="text-white/30 text-[10px] uppercase tracking-widest mb-2">Clues Used in Game</h4>
                        <div className="space-y-1.5 mb-4">
                          {species.clues.map((clue, j) => (
                            <p key={j} className="text-white/60 text-sm flex items-start gap-2">
                              <span className="text-ocean-primary font-bold text-xs mt-0.5">{j + 1}.</span>
                              {clue}
                            </p>
                          ))}
                        </div>
                        {/* Full description */}
                        <h4 className="text-white/30 text-[10px] uppercase tracking-widest mb-2">About</h4>
                        <p className="text-white/70 text-sm leading-relaxed">{species.facts}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ═══ GAME ═══ */
function SpeciesIDGame() {
  const [view, setView] = useState("game");
  const [round, setRound] = useState(0);
  const [clueIndex, setClueIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [shuffledSpecies, setShuffledSpecies] = useState([]);
  const [options, setOptions] = useState([]);

  const ROUNDS = 8;

  const initGame = useCallback(() => {
    const shuffled = [...speciesData].sort(() => Math.random() - 0.5).slice(0, ROUNDS);
    setShuffledSpecies(shuffled);
    setRound(0); setClueIndex(0); setScore(0); setGuess(""); setFeedback(null); setGameOver(false); setAnswers([]);
    generateOptions(shuffled, 0);
  }, []);

  const generateOptions = (species, roundIdx) => {
    const correct = species[roundIdx];
    const others = speciesData.filter(s => s.id !== correct.id).sort(() => Math.random() - 0.5).slice(0, 3);
    const all = [correct, ...others].sort(() => Math.random() - 0.5);
    setOptions(all.map(s => s.name));
  };

  useEffect(() => { initGame(); }, [initGame]);

  const currentSpecies = shuffledSpecies[round];
  const cluesRevealed = currentSpecies ? currentSpecies.clues.slice(0, clueIndex + 1) : [];
  const maxPoints = 4;

  const handleGuess = (name) => {
    if (feedback) return;
    const isCorrect = name === currentSpecies.name;
    const points = isCorrect ? Math.max(1, maxPoints - clueIndex) : 0;
    setFeedback(isCorrect ? "correct" : "wrong");
    if (isCorrect) setScore(s => s + points);
    setAnswers(prev => [...prev, { species: currentSpecies.name, guessed: name, correct: isCorrect, points, cluesUsed: clueIndex + 1 }]);

    setTimeout(() => {
      if (round < shuffledSpecies.length - 1) {
        const next = round + 1;
        setRound(next); setClueIndex(0); setGuess(""); setFeedback(null);
        generateOptions(shuffledSpecies, next);
      } else {
        setGameOver(true);
      }
    }, 1800);
  };

  const revealNextClue = () => {
    if (clueIndex < (currentSpecies?.clues.length || 1) - 1) {
      setClueIndex(c => c + 1);
    }
  };

  if (view === "encyclopedia") {
    return (<>
      <Head><title>Marine Encyclopedia | Marine Marvels</title></Head>
      <Encyclopedia onBack={() => setView("game")} />
    </>);
  }

  if (gameOver) {
    const maxScore = ROUNDS * maxPoints;
    const pct = Math.round((score / maxScore) * 100);
    return (<>
      <Head><title>Species ID Results | Marine Marvels</title></Head>
      <div className="min-h-screen bg-gradient-deep pt-24 pb-20 px-4 md:px-12">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl mx-auto">
          <div className="glass-card p-10 text-center mb-8">
            <h2 className="text-3xl font-display font-bold text-white mb-2">
              {pct >= 75 ? "Marine Biologist!" : pct >= 50 ? "Good Observer!" : "Keep Studying!"}
            </h2>
            <p className="text-white/60 mb-6">Score: <span className="text-white font-bold">{score}</span> / {maxScore} points</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button onClick={initGame} className="ocean-btn ocean-btn-primary">Play Again</button>
              <button onClick={() => setView("encyclopedia")} className="ocean-btn ocean-btn-outline">Study Species</button>
              <Link href="/game" className="ocean-btn ocean-btn-outline no-underline">More Games</Link>
            </div>
          </div>
          {/* Review */}
          <div className="space-y-2">
            <h3 className="text-white/30 text-xs font-semibold uppercase tracking-widest mb-3">Review</h3>
            {answers.map((a, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                className={`p-4 rounded-xl border ${a.correct ? "border-kelp-300/20 bg-kelp-300/5" : "border-coral-300/20 bg-coral-300/5"}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white font-semibold text-sm">{a.species}</p>
                    {!a.correct && <p className="text-coral-300 text-xs mt-0.5">You guessed: {a.guessed}</p>}
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-semibold ${a.correct ? "text-kelp-300" : "text-coral-300"}`}>
                      {a.correct ? `+${a.points}` : "+0"}
                    </span>
                    <p className="text-white/30 text-[10px]">{a.cluesUsed} clue{a.cluesUsed > 1 ? "s" : ""}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </>);
  }

  if (!currentSpecies) return null;

  return (<>
    <Head><title>Species ID | Marine Marvels</title></Head>
    <div className="min-h-screen bg-gradient-deep pt-24 pb-20 px-4 md:px-12">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <Link href="/game" className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm no-underline mb-2 transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Back to Games
            </Link>
            <h1 className="text-2xl font-display font-bold text-white">Guess the Species</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <span className="text-xl font-display font-bold gradient-text">{score}</span>
              <p className="text-white/40 text-[10px] uppercase tracking-wider">Points</p>
            </div>
            <div className="text-center">
              <span className="text-xl font-display font-bold text-white/50">{round + 1}/{ROUNDS}</span>
              <p className="text-white/40 text-[10px] uppercase tracking-wider">Round</p>
            </div>
          </div>
        </div>

        {/* Encyclopedia link */}
        <button onClick={() => setView("encyclopedia")}
          className="w-full mb-5 p-3 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] text-left cursor-pointer transition-colors flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-coral-400/10 flex items-center justify-center text-coral-400 flex-shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>
          </div>
          <div>
            <p className="text-white/60 text-xs font-semibold">Marine Encyclopedia</p>
            <p className="text-white/30 text-[10px]">Study all {speciesData.length} species</p>
          </div>
        </button>

        {/* Progress */}
        <div className="progress-bar mb-6">
          <motion.div className="progress-bar-fill" animate={{ width: `${((round + 1) / ROUNDS) * 100}%` }}/>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={round} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>

            {/* Clue card */}
            <div className="glass-card p-6 md:p-8 mb-6">
              <div className="flex justify-between items-center mb-5">
                <span className="text-white/60 text-xs uppercase tracking-wider font-semibold">
                  Who am I? &mdash;{" "}
                  <span style={{ color: diffColors[currentSpecies.difficulty] }}>{currentSpecies.difficulty}</span>
                </span>
                <span className="text-white/50 text-xs">
                  Fewer clues = more points (max {maxPoints})
                </span>
              </div>

              {/* Clues revealed so far */}
              <div className="space-y-3 mb-6">
                {cluesRevealed.map((clue, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i === clueIndex ? 0.1 : 0 }}
                    className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/5">
                    <span className="w-6 h-6 rounded-full bg-ocean-primary/15 text-ocean-primary text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-white/80 text-sm leading-relaxed">&ldquo;{clue}&rdquo;</p>
                  </motion.div>
                ))}
              </div>

              {/* Reveal more clues button */}
              {clueIndex < currentSpecies.clues.length - 1 && !feedback && (
                <button onClick={revealNextClue}
                  className="text-white/70 hover:text-white text-sm font-semibold bg-transparent border border-white/20 hover:border-white/35 rounded-full px-5 py-2 cursor-pointer transition-all">
                  Reveal next clue ({maxPoints - clueIndex - 1} pts if correct)
                </button>
              )}
            </div>

            {/* Answer options */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {options.map((name, i) => {
                let cls = "quiz-option text-center";
                if (feedback) {
                  if (name === currentSpecies.name) cls += " quiz-option-correct";
                  else if (name === guess && name !== currentSpecies.name) cls += " quiz-option-wrong";
                }
                return (
                  <motion.button key={name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                    onClick={() => { setGuess(name); handleGuess(name); }}
                    disabled={!!feedback}
                    className={`${cls} block w-full`}>
                    {name}
                  </motion.button>
                );
              })}
            </div>

            {/* Feedback */}
            <AnimatePresence>
              {feedback && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className={`p-4 rounded-xl text-center ${feedback === "correct" ? "bg-kelp-300/10 border border-kelp-300/30" : "bg-coral-300/10 border border-coral-300/30"}`}>
                  {feedback === "correct" ? (
                    <div>
                      <span className="text-kelp-300 font-semibold block">Correct! +{Math.max(1, maxPoints - clueIndex)} points</span>
                      <span className="text-white/40 text-xs mt-1 block">{currentSpecies.category} &mdash; {currentSpecies.zone} Zone</span>
                    </div>
                  ) : (
                    <div>
                      <span className="text-coral-300 font-semibold block">It was {currentSpecies.name}</span>
                      <span className="text-white/40 text-xs mt-1 block">{currentSpecies.category} &mdash; {currentSpecies.zone} Zone</span>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  </>);
}

export default SpeciesIDGame;

SpeciesIDGame.getLayout = function getLayout(page) { return <RootLayout>{page}</RootLayout>; };
