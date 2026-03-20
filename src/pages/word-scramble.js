import RootLayout from "@/components/Layouts/RootLayout";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import wordScrambleData, { scrambleWord } from "@/data/wordScrambleData";

const categories = [...new Set(wordScrambleData.map(w => w.category))];
const categoryColors = { Organism: "#4ECDC4", Creature: "#6C5CE7", Phenomenon: "#FD79A8", Zone: "#FFBF89", Geography: "#BAE3C3" };

/* ═══ DICTIONARY VIEW ═══ */
function Dictionary({ onBack }) {
  const [filter, setFilter] = useState("All");
  const [expanded, setExpanded] = useState(null);

  const filtered = filter === "All" ? wordScrambleData : wordScrambleData.filter(w => w.category === filter);

  return (
    <div className="min-h-screen bg-gradient-deep pt-24 pb-20 px-4 md:px-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <button onClick={onBack}
              className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm bg-transparent border-none cursor-pointer mb-2 transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Back to Game
            </button>
            <h1 className="text-3xl font-display font-bold text-white">Ocean Dictionary</h1>
            <p className="text-white/40 text-sm mt-1">Learn the words before you play</p>
          </div>
          <span className="text-white/20 text-sm">{wordScrambleData.length} terms</span>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button onClick={() => setFilter("All")}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border cursor-pointer transition-all ${
              filter === "All" ? "bg-white text-deep-900 border-white" : "bg-transparent border-white/10 text-white/40 hover:text-white/70"
            }`}>All</button>
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border cursor-pointer transition-all ${
                filter === cat ? "text-deep-900 border-transparent" : "bg-transparent border-white/10 text-white/40 hover:text-white/70"
              }`}
              style={filter === cat ? { backgroundColor: categoryColors[cat] } : {}}>
              {cat}
            </button>
          ))}
        </div>

        {/* Word list */}
        <div className="space-y-3">
          {filtered.map((item, i) => {
            const isOpen = expanded === item.word;
            return (
              <motion.div key={item.word}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="glass-card overflow-hidden cursor-pointer"
                onClick={() => setExpanded(isOpen ? null : item.word)}>

                <div className="p-5 flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-white font-display text-lg font-bold tracking-wide">
                        {item.word}
                      </h3>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: `${categoryColors[item.category]}20`, color: categoryColors[item.category] }}>
                        {item.category}
                      </span>
                    </div>
                    <p className="text-white/50 text-sm">{item.hint}</p>
                  </div>
                  <motion.svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    className="text-white/20 flex-shrink-0 mt-1"
                    animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <path d="M6 9l6 6 6-6"/>
                  </motion.svg>
                </div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}>
                      <div className="px-5 pb-5 pt-0">
                        <div className="h-px bg-white/5 mb-4"/>
                        <p className="text-white/70 text-sm leading-relaxed">{item.definition}</p>
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

/* ═══ GAME VIEW ═══ */
function WordScramble() {
  const [view, setView] = useState("game"); // game | dictionary
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrambled, setScrambled] = useState("");
  const [guess, setGuess] = useState("");
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [hintUsed, setHintUsed] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [totalRounds, setTotalRounds] = useState(0);

  const ROUNDS = 10;

  const initGame = useCallback(() => {
    const shuffled = [...wordScrambleData].sort(() => Math.random() - 0.5).slice(0, ROUNDS);
    setWords(shuffled);
    setCurrentIndex(0);
    setScrambled(scrambleWord(shuffled[0].word));
    setGuess("");
    setScore(0);
    setStreak(0);
    setFeedback(null);
    setHintUsed(false);
    setShowHint(false);
    setGameOver(false);
    setTotalRounds(0);
  }, []);

  useEffect(() => { initGame(); }, [initGame]);

  const currentWord = words[currentIndex];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!guess.trim() || feedback) return;
    const isCorrect = guess.toUpperCase().trim() === currentWord.word;
    const points = isCorrect ? (hintUsed ? 1 : 2) : 0;
    setFeedback(isCorrect ? "correct" : "wrong");
    setScore((s) => s + points);
    setStreak(isCorrect ? (s) => s + 1 : 0);
    setTotalRounds((t) => t + 1);
    setTimeout(() => {
      if (currentIndex < words.length - 1) {
        const next = currentIndex + 1;
        setCurrentIndex(next);
        setScrambled(scrambleWord(words[next].word));
        setGuess(""); setFeedback(null); setHintUsed(false); setShowHint(false);
      } else { setGameOver(true); }
    }, 1500);
  };

  const useHint = () => { setShowHint(true); setHintUsed(true); };

  if (view === "dictionary") {
    return (
      <>
        <Head><title>Ocean Dictionary | Marine Marvels</title></Head>
        <Dictionary onBack={() => setView("game")} />
      </>
    );
  }

  if (gameOver) {
    const maxScore = ROUNDS * 2;
    const pct = Math.round((score / maxScore) * 100);
    return (
      <>
        <Head><title>Word Scramble Results | Marine Marvels</title></Head>
        <div className="min-h-screen bg-gradient-deep pt-24 pb-20 px-4 md:px-12">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-lg mx-auto glass-card p-10 text-center">
            <h2 className="text-3xl font-display font-bold text-white mb-2">
              {pct >= 70 ? "Outstanding!" : pct >= 40 ? "Well Done!" : "Keep Practicing!"}
            </h2>
            <p className="text-white/60 mb-6">
              Score: <span className="text-white font-bold">{score}</span> / {maxScore} points
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button onClick={initGame} className="ocean-btn ocean-btn-primary">Play Again</button>
              <button onClick={() => setView("dictionary")} className="ocean-btn ocean-btn-outline">Study Words</button>
              <Link href="/game" className="ocean-btn ocean-btn-outline no-underline">More Games</Link>
            </div>
          </motion.div>
        </div>
      </>
    );
  }

  if (!currentWord) return null;

  return (
    <>
      <Head><title>Word Scramble | Marine Marvels</title></Head>
      <div className="min-h-screen bg-gradient-deep pt-24 pb-20 px-4 md:px-12">
        <div className="max-w-xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <Link href="/game" className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm no-underline mb-2 transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                Back to Games
              </Link>
              <h1 className="text-2xl font-display font-bold text-white">Word Scramble</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <span className="text-xl font-display font-bold gradient-text">{score}</span>
                <p className="text-white/40 text-[10px] uppercase tracking-wider">Points</p>
              </div>
              <div className="text-center">
                <span className="text-xl font-display font-bold text-sunset-400">{streak}</span>
                <p className="text-white/40 text-[10px] uppercase tracking-wider">Streak</p>
              </div>
            </div>
          </div>

          {/* Dictionary link */}
          <button onClick={() => setView("dictionary")}
            className="w-full mb-6 p-3 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] text-left cursor-pointer transition-colors flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-biolum-400/10 flex items-center justify-center text-biolum-400 flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
            </div>
            <div>
              <p className="text-white/60 text-xs font-semibold">Ocean Dictionary</p>
              <p className="text-white/30 text-[10px]">Study all {wordScrambleData.length} words before playing</p>
            </div>
          </button>

          <div className="progress-bar mb-6">
            <motion.div className="progress-bar-fill" animate={{ width: `${((currentIndex + 1) / ROUNDS) * 100}%` }} />
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={currentIndex}
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}>

              <div className="glass-card p-8 mb-6 text-center">
                <span className="text-white/30 text-xs uppercase tracking-wider">
                  Round {currentIndex + 1} / {ROUNDS} &mdash;{" "}
                  <span style={{ color: categoryColors[currentWord.category] }}>{currentWord.category}</span>
                </span>
                <div className="flex flex-wrap justify-center gap-2 mt-6 mb-6">
                  {scrambled.split("").map((letter, i) => (
                    <motion.span key={`${currentIndex}-${i}`}
                      initial={{ opacity: 0, y: -20, rotate: -10 }} animate={{ opacity: 1, y: 0, rotate: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="w-10 h-12 flex items-center justify-center text-xl font-display font-bold text-white rounded-lg border border-ocean-primary/30 bg-ocean-primary/10">
                      {letter}
                    </motion.span>
                  ))}
                </div>

                {showHint && (
                  <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-sunset-300 text-sm mb-4 font-medium">
                    Hint: {currentWord.hint}
                  </motion.p>
                )}

                <form onSubmit={handleSubmit} className="flex gap-3 max-w-sm mx-auto">
                  <input type="text" value={guess} onChange={(e) => setGuess(e.target.value)}
                    placeholder="Type your answer..." disabled={!!feedback} autoFocus
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none focus:border-ocean-primary/50 transition-colors" />
                  <button type="submit" disabled={!!feedback || !guess.trim()} className="ocean-btn ocean-btn-primary text-sm px-6">Check</button>
                </form>
              </div>

              <AnimatePresence>
                {feedback && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className={`p-4 rounded-xl text-center mb-4 ${feedback === "correct" ? "bg-kelp-300/10 border border-kelp-300/30" : "bg-coral-300/10 border border-coral-300/30"}`}>
                    {feedback === "correct" ? (
                      <span className="text-kelp-300 font-semibold">Correct! +{hintUsed ? 1 : 2} points</span>
                    ) : (
                      <span className="text-coral-300">The answer was: <span className="font-semibold">{currentWord.word}</span></span>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {!feedback && !showHint && (
                <div className="text-center">
                  <button onClick={useHint} className="text-white/30 hover:text-sunset-400 text-xs transition-colors bg-transparent border-none cursor-pointer">
                    Need a hint? (half points)
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

export default WordScramble;

WordScramble.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
