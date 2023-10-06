import React, { useState } from "react";
// import quizData from "../quizData";

function Quiz() {
  const quizData = [
    {
      question: "What are phytoplankton?",
      options: [
        "Microscopic plants",
        "Microscopic animals",
        "Bacteria",
        "Fungi",
      ],
      correctAnswer: "Microscopic plants",
    },
    {
      question:
        "Which pigment allows phytoplankton to capture sunlight for photosynthesis?",
      options: ["Chlorophyll", "Hemoglobin", "Melanin", "Carotene"],
      correctAnswer: "Chlorophyll",
    },
    {
      question: "What is the primary source of energy for phytoplankton?",
      options: [
        "Solar radiation",
        "Chemical reactions",
        "Geothermal heat",
        "Wind energy",
      ],
      correctAnswer: "Solar radiation",
    },
    {
      question:
        "Where are phytoplankton typically found in aquatic ecosystems?",
      options: ["Surface waters", "Deep ocean trenches", "Riverbeds", "Caves"],
      correctAnswer: "Surface waters",
    },
    {
      question:
        "What is the process by which phytoplankton convert carbon dioxide into organic compounds?",
      options: [
        "Photosynthesis",
        "Respiration",
        "Fermentation",
        "Transpiration",
      ],
      correctAnswer: "Photosynthesis",
    },
    {
      question: "Which gas is released by phytoplankton during photosynthesis?",
      options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Methane"],
      correctAnswer: "Oxygen",
    },
    {
      question: "What role do phytoplankton play in the food chain?",
      options: [
        "Primary producers",
        "Apex predators",
        "Decomposers",
        "Scavengers",
      ],
      correctAnswer: "Primary producers",
    },
    {
      question: "What is the base of the marine food web?",
      options: ["Phytoplankton", "Zooplankton", "Fish", "Sharks"],
      correctAnswer: "Phytoplankton",
    },
    {
      question:
        "Which ocean zone is characterized by the greatest abundance of phytoplankton?",
      options: [
        "Euphotic zone",
        "Abyssal zone",
        "Hadal zone",
        "Disphotic zone",
      ],
      correctAnswer: "Euphotic zone",
    },
    {
      question:
        "What color do some species of phytoplankton appear when they bloom, giving water a red or brown tint?",
      options: ["Red", "Green", "Blue", "Yellow"],
      correctAnswer: "Red",
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswerClick = (selectedOption) => {
    if (selectedOption === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // End of the quiz
      alert(`Quiz finished! Your score is ${score} out of ${quizData.length}`);
    }
  };

  return (
    <div className="py-16 px-8 text-center">
      <h1 className="text-3xl font-semibold mb-4">Phytoplankton Quiz</h1>
      {currentQuestion < quizData.length && (
        <div>
          <h2 className="text-xl font-medium mb-2">
            Question {currentQuestion + 1}
          </h2>
          <p className="text-lg mb-4">{quizData[currentQuestion].question}</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quizData[currentQuestion].options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleAnswerClick(option)}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded cursor-pointer"
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Quiz;
