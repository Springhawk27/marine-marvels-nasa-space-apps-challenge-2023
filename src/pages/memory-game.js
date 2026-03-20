import RootLayout from "@/components/Layouts/RootLayout";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import memoryCards from "@/data/memoryGameData";

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function MemoryGame() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [discoveredFacts, setDiscoveredFacts] = useState([]);

  const initGame = useCallback(() => {
    const doubled = [...memoryCards, ...memoryCards].map((card, index) => ({
      ...card,
      uniqueId: `${card.id}-${index}`,
    }));
    setCards(shuffleArray(doubled));
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameWon(false);
    setDiscoveredFacts([]);
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  useEffect(() => {
    if (matched.length === memoryCards.length && memoryCards.length > 0) {
      setTimeout(() => setGameWon(true), 600);
    }
  }, [matched]);

  const handleCardClick = (uniqueId, cardId) => {
    if (flipped.length === 2) return;
    if (flipped.includes(uniqueId)) return;
    if (matched.includes(cardId)) return;

    const newFlipped = [...flipped, uniqueId];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const first = cards.find((c) => c.uniqueId === newFlipped[0]);
      const second = cards.find((c) => c.uniqueId === newFlipped[1]);

      if (first.id === second.id) {
        setMatched((m) => [...m, first.id]);
        const fact = memoryCards.find((c) => c.id === first.id);
        if (fact && !discoveredFacts.find((f) => f.id === fact.id)) {
          setDiscoveredFacts((d) => [...d, fact]);
        }
        setTimeout(() => setFlipped([]), 400);
      } else {
        setTimeout(() => setFlipped([]), 900);
      }
    }
  };

  const isFlipped = (uniqueId) => flipped.includes(uniqueId);
  const isMatched = (cardId) => matched.includes(cardId);

  return (
    <>
      <Head>
        <title>Memory Game | Marine Marvels</title>
        <meta
          name="description"
          content="Match marine creatures in this educational memory card game."
        />
      </Head>

      <div className="min-h-screen bg-gradient-deep pt-24 pb-20 px-4 md:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <Link
                href="/game"
                className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm no-underline mb-2 transition-colors"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Back to Games
              </Link>
              <h1 className="text-3xl font-display font-bold text-white">
                Ocean Memory
              </h1>
              <p className="text-white/50 text-sm mt-1">
                Match pairs of marine creatures to learn fun facts
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <span className="text-2xl font-display font-bold gradient-text">
                  {moves}
                </span>
                <p className="text-white/40 text-xs uppercase tracking-wider">
                  Moves
                </p>
              </div>
              <div className="text-center">
                <span className="text-2xl font-display font-bold text-kelp-300">
                  {matched.length}/{memoryCards.length}
                </span>
                <p className="text-white/40 text-xs uppercase tracking-wider">
                  Pairs
                </p>
              </div>
              <button
                onClick={initGame}
                className="text-white/40 hover:text-white text-xs border border-white/10 hover:border-white/30 rounded-full px-4 py-2 bg-transparent cursor-pointer transition-all"
              >
                Restart
              </button>
            </div>
          </div>

          {/* Game Won */}
          <AnimatePresence>
            {gameWon && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-8 text-center mb-8"
              >
                <h2 className="text-3xl font-display font-bold text-white mb-2">
                  All Matched!
                </h2>
                <p className="text-white/60 mb-4">
                  You found all {memoryCards.length} pairs in{" "}
                  <span className="text-white font-semibold">{moves}</span>{" "}
                  moves
                  {moves <= memoryCards.length + 2 && " — Outstanding!"}
                  {moves > memoryCards.length + 2 && moves <= memoryCards.length * 2 && " — Great job!"}
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={initGame}
                    className="ocean-btn ocean-btn-primary"
                  >
                    Play Again
                  </button>
                  <Link
                    href="/game"
                    className="ocean-btn ocean-btn-outline no-underline"
                  >
                    More Games
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Card Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 md:gap-4 mb-10">
            {cards.map((card) => {
              const flippedState = isFlipped(card.uniqueId);
              const matchedState = isMatched(card.id);
              const showFace = flippedState || matchedState;

              return (
                <motion.div
                  key={card.uniqueId}
                  layout
                  onClick={() => handleCardClick(card.uniqueId, card.id)}
                  className={`relative aspect-square rounded-xl cursor-pointer ${
                    matchedState ? "ring-2 ring-kelp-300/40" : ""
                  }`}
                  whileHover={!showFace ? { scale: 1.03 } : {}}
                  whileTap={!showFace ? { scale: 0.97 } : {}}
                >
                  <AnimatePresence mode="wait">
                    {showFace ? (
                      <motion.div
                        key="front"
                        initial={{ rotateY: 90 }}
                        animate={{ rotateY: 0 }}
                        exit={{ rotateY: 90 }}
                        transition={{ duration: 0.25 }}
                        className={`absolute inset-0 rounded-xl flex flex-col items-center justify-center p-2 ${
                          matchedState
                            ? "bg-kelp-300/10 border border-kelp-300/30"
                            : "glass"
                        }`}
                      >
                        <img
                          src={card.image}
                          alt={card.name}
                          className="w-2/3 h-2/3 object-contain drop-shadow-lg"
                        />
                        <span className="text-white text-xs font-semibold mt-1 text-center">
                          {card.name}
                        </span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="back"
                        initial={{ rotateY: -90 }}
                        animate={{ rotateY: 0 }}
                        exit={{ rotateY: -90 }}
                        transition={{ duration: 0.25 }}
                        className="absolute inset-0 rounded-xl bg-deep-700/80 border border-white/10 flex items-center justify-center hover:border-ocean-primary/30 transition-colors"
                      >
                        <div className="text-ocean-primary/30 text-4xl font-display font-bold">
                          ?
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Discovered Facts */}
          {discoveredFacts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-4">
                Discovered Facts
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {discoveredFacts.map((card, i) => (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-xl border border-kelp-300/10 bg-kelp-300/5"
                  >
                    <img
                      src={card.image}
                      alt={card.name}
                      className="w-12 h-12 object-contain"
                    />
                    <div>
                      <p className="text-white font-semibold text-sm">
                        {card.name}
                      </p>
                      <p className="text-white/50 text-xs">{card.fact}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}

export default MemoryGame;

MemoryGame.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
