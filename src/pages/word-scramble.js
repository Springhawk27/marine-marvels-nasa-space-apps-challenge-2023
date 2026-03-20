import RootLayout from "@/components/Layouts/RootLayout";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import wordScrambleData, { scrambleWord } from "@/data/wordScrambleData";

function WordScramble() {
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

  useEffect(() => {
    initGame();
  }, [initGame]);

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
        setGuess("");
        setFeedback(null);
        setHintUsed(false);
        setShowHint(false);
      } else {
        setGameOver(true);
      }
    }, 1500);
  };

  const useHint = () => {
    setShowHint(true);
    setHintUsed(true);
  };

  if (gameOver) {
    const maxScore = ROUNDS * 2;
    const pct = Math.round((score / maxScore) * 100);
    return (
      <>
        <Head><title>Word Scramble Results | Marine Marvels</title></Head>
        <div className="min-h-screen bg-gradient-deep pt-24 pb-20 px-4 md:px-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto glass-card p-10 text-center"
          >
            <h2 className="text-3xl font-display font-bold text-white mb-2">
              {pct >= 70 ? "Outstanding!" : pct >= 40 ? "Well Done!" : "Keep Practicing!"}
            </h2>
            <p className="text-white/60 mb-6">
              Score: <span className="text-white font-bold">{score}</span> / {maxScore} points
            </p>
            <div className="flex gap-3 justify-center">
              <button onClick={initGame} className="ocean-btn ocean-btn-primary">Play Again</button>
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
          <div className="flex justify-between items-center mb-6">
            <div>
              <Link href="/game" className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm no-underline mb-2 transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                Back to Games
              </Link>
              <h1 className="text-2xl font-display font-bold text-white">Word Scramble</h1>
            </div>
            <div className="flex gap-4 text-center">
              <div>
                <span className="text-xl font-display font-bold gradient-text">{score}</span>
                <p className="text-white/40 text-[10px] uppercase tracking-wider">Points</p>
              </div>
              <div>
                <span className="text-xl font-display font-bold text-sunset-400">{streak}</span>
                <p className="text-white/40 text-[10px] uppercase tracking-wider">Streak</p>
              </div>
            </div>
          </div>

          <div className="progress-bar mb-8">
            <motion.div className="progress-bar-fill" animate={{ width: `${((currentIndex + 1) / ROUNDS) * 100}%` }} />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <div className="glass-card p-8 mb-6 text-center">
                <span className="text-white/30 text-xs uppercase tracking-wider">
                  Round {currentIndex + 1} / {ROUNDS} &mdash; {currentWord.category}
                </span>
                <div className="flex flex-wrap justify-center gap-2 mt-6 mb-6">
                  {scrambled.split("").map((letter, i) => (
                    <motion.span
                      key={`${currentIndex}-${i}`}
                      initial={{ opacity: 0, y: -20, rotate: -10 }}
                      animate={{ opacity: 1, y: 0, rotate: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="w-10 h-12 flex items-center justify-center text-xl font-display font-bold text-white rounded-lg border border-ocean-primary/30 bg-ocean-primary/10"
                    >
                      {letter}
                    </motion.span>
                  ))}
                </div>

                {showHint && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sunset-400/80 text-sm mb-4"
                  >
                    Hint: {currentWord.hint}
                  </motion.p>
                )}

                <form onSubmit={handleSubmit} className="flex gap-3 max-w-sm mx-auto">
                  <input
                    type="text"
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    placeholder="Type your answer..."
                    disabled={!!feedback}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none focus:border-ocean-primary/50 transition-colors"
                    autoFocus
                  />
                  <button
                    type="submit"
                    disabled={!!feedback || !guess.trim()}
                    className="ocean-btn ocean-btn-primary text-sm px-6"
                  >
                    Check
                  </button>
                </form>
              </div>

              {/* Feedback */}
              <AnimatePresence>
                {feedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`p-4 rounded-xl text-center mb-4 ${
                      feedback === "correct"
                        ? "bg-kelp-300/10 border border-kelp-300/30"
                        : "bg-coral-300/10 border border-coral-300/30"
                    }`}
                  >
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
