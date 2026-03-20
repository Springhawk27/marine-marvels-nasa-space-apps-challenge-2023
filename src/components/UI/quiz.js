import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Head from "next/head";
import { quizzes, quizTopics } from "@/data/quizData";

function Quiz({ topicId }) {
  const topic = quizTopics.find((t) => t.id === topicId) || quizTopics[0];
  const quizData = quizzes[topicId] || quizzes.phytoplankton;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [answers, setAnswers] = useState([]);

  const progress = ((currentQuestion + 1) / quizData.length) * 100;

  const handleAnswerClick = (option) => {
    if (selectedAnswer) return;

    setSelectedAnswer(option);
    const isCorrect = option === quizData[currentQuestion].correctAnswer;
    if (isCorrect) setScore((s) => s + 1);

    setAnswers((prev) => [
      ...prev,
      {
        question: quizData[currentQuestion].question,
        selected: option,
        correct: quizData[currentQuestion].correctAnswer,
        isCorrect,
      },
    ]);

    setShowResult(true);

    setTimeout(() => {
      if (currentQuestion < quizData.length - 1) {
        setCurrentQuestion((q) => q + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setIsFinished(true);
      }
    }, 1200);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsFinished(false);
    setAnswers([]);
  };

  const scorePercentage = Math.round((score / quizData.length) * 100);

  if (isFinished) {
    return (
      <>
        <Head>
          <title>Quiz Results | Marine Marvels</title>
        </Head>
        <div className="min-h-screen bg-gradient-ocean pt-24 pb-20 px-4 md:px-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <div className="glass-card p-8 md:p-12 text-center mb-8">
              {/* Score Ring */}
              <div className="relative w-32 h-32 mx-auto mb-6">
                <svg
                  className="w-full h-full -rotate-90"
                  viewBox="0 0 120 120"
                >
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="8"
                  />
                  <motion.circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke={
                      scorePercentage >= 70
                        ? "#BAE3C3"
                        : scorePercentage >= 40
                          ? "#FFBF89"
                          : "#FEB6C9"
                    }
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 54}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 54 }}
                    animate={{
                      strokeDashoffset:
                        2 * Math.PI * 54 * (1 - scorePercentage / 100),
                    }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-display font-bold text-white">
                    {scorePercentage}%
                  </span>
                </div>
              </div>

              <h2 className="text-3xl font-display font-bold text-white mb-2">
                {scorePercentage >= 70
                  ? "Excellent!"
                  : scorePercentage >= 40
                    ? "Good Try!"
                    : "Keep Learning!"}
              </h2>
              <p className="text-white/60 text-base mb-2">
                <span style={{ color: topic.color }}>{topic.title}</span> Quiz
              </p>
              <p className="text-white/60 text-base mb-6">
                You scored{" "}
                <span className="text-white font-semibold">
                  {score} out of {quizData.length}
                </span>
              </p>

              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={resetQuiz}
                  className="ocean-btn ocean-btn-primary"
                >
                  Try Again
                </button>
                <Link
                  href="/game"
                  className="ocean-btn ocean-btn-outline no-underline"
                >
                  More Games
                </Link>
              </div>
            </div>

            {/* Answer Review */}
            <div className="space-y-3">
              <h3 className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-4">
                Answer Review
              </h3>
              {answers.map((answer, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-4 rounded-xl border ${
                    answer.isCorrect
                      ? "border-kelp-300/30 bg-kelp-300/5"
                      : "border-coral-300/30 bg-coral-300/5"
                  }`}
                >
                  <p className="text-white/80 text-sm mb-1">
                    <span className="text-white/40 mr-2">Q{index + 1}.</span>
                    {answer.question}
                  </p>
                  <div className="flex items-center gap-2 text-xs">
                    {answer.isCorrect ? (
                      <span className="text-kelp-300">Correct</span>
                    ) : (
                      <>
                        <span className="text-coral-300">
                          Your answer: {answer.selected}
                        </span>
                        <span className="text-white/30">|</span>
                        <span className="text-kelp-300">
                          Correct: {answer.correct}
                        </span>
                      </>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Quiz - {topic.title} | Marine Marvels</title>
      </Head>
      <div className="min-h-screen bg-gradient-ocean pt-24 pb-20 px-4 md:px-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/game"
              className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm no-underline mb-3 transition-colors"
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
            <div className="flex justify-between items-center mb-3">
              <h1 className="text-2xl font-display font-bold text-white">
                <span style={{ color: topic.color }}>{topic.title}</span> Quiz
              </h1>
              <span className="text-white/40 text-sm font-medium">
                {currentQuestion + 1} / {quizData.length}
              </span>
            </div>
            <div className="progress-bar">
              <motion.div
                className="progress-bar-fill"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <div className="glass-card p-8 mb-6">
                <span
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: topic.color }}
                >
                  Question {currentQuestion + 1}
                </span>
                <h2 className="text-xl md:text-2xl font-semibold text-white mt-2">
                  {quizData[currentQuestion].question}
                </h2>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {quizData[currentQuestion].options.map((option, index) => {
                  let optionClass = "quiz-option";
                  if (showResult && selectedAnswer) {
                    if (option === quizData[currentQuestion].correctAnswer) {
                      optionClass += " quiz-option-correct";
                    } else if (
                      option === selectedAnswer &&
                      option !== quizData[currentQuestion].correctAnswer
                    ) {
                      optionClass += " quiz-option-wrong";
                    }
                  }

                  return (
                    <motion.button
                      key={option}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.08 }}
                      onClick={() => handleAnswerClick(option)}
                      disabled={!!selectedAnswer}
                      className={`${optionClass} w-full text-left block`}
                    >
                      <span className="text-white/30 mr-3 font-semibold">
                        {String.fromCharCode(65 + index)}.
                      </span>
                      {option}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Score */}
          <div className="mt-8 flex justify-between items-center">
            <span className="text-white/30 text-sm">
              Score: {score} correct
            </span>
            <Link
              href="/game"
              className="text-white/30 hover:text-white/60 text-sm no-underline transition-colors"
            >
              Exit Quiz
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Quiz;
