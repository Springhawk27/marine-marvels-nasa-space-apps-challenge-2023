export const quizTopics = [
  {
    id: "phytoplankton",
    title: "Phytoplankton",
    description: "Test your knowledge about the ocean's microscopic oxygen producers",
    color: "#4ECDC4",
    icon: "~",
    questionCount: 10,
  },
  {
    id: "ocean-zones",
    title: "Ocean Zones",
    description: "How well do you know the layers of the deep?",
    color: "#6C5CE7",
    icon: "=",
    questionCount: 10,
  },
  {
    id: "marine-life",
    title: "Marine Life",
    description: "From whales to coral — test your marine species knowledge",
    color: "#FD79A8",
    icon: "*",
    questionCount: 10,
  },
];

export const quizzes = {
  phytoplankton: [
    {
      id: 1,
      question: "What are phytoplankton?",
      options: ["Microscopic plants", "Microscopic animals", "Bacteria", "Fungi"],
      correctAnswer: "Microscopic plants",
    },
    {
      id: 2,
      question: "Which pigment allows phytoplankton to capture sunlight for photosynthesis?",
      options: ["Chlorophyll", "Hemoglobin", "Melanin", "Carotene"],
      correctAnswer: "Chlorophyll",
    },
    {
      id: 3,
      question: "What is the primary source of energy for phytoplankton?",
      options: ["Solar radiation", "Chemical reactions", "Geothermal heat", "Wind energy"],
      correctAnswer: "Solar radiation",
    },
    {
      id: 4,
      question: "Where are phytoplankton typically found in aquatic ecosystems?",
      options: ["Surface waters", "Deep ocean trenches", "Riverbeds", "Caves"],
      correctAnswer: "Surface waters",
    },
    {
      id: 5,
      question: "What is the process by which phytoplankton convert CO2 into organic compounds?",
      options: ["Photosynthesis", "Respiration", "Fermentation", "Transpiration"],
      correctAnswer: "Photosynthesis",
    },
    {
      id: 6,
      question: "Which gas is released by phytoplankton during photosynthesis?",
      options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Methane"],
      correctAnswer: "Oxygen",
    },
    {
      id: 7,
      question: "What role do phytoplankton play in the food chain?",
      options: ["Primary producers", "Apex predators", "Decomposers", "Scavengers"],
      correctAnswer: "Primary producers",
    },
    {
      id: 8,
      question: "What is the base of the marine food web?",
      options: ["Phytoplankton", "Zooplankton", "Fish", "Sharks"],
      correctAnswer: "Phytoplankton",
    },
    {
      id: 9,
      question: "Which ocean zone has the greatest abundance of phytoplankton?",
      options: ["Euphotic zone", "Abyssal zone", "Hadal zone", "Disphotic zone"],
      correctAnswer: "Euphotic zone",
    },
    {
      id: 10,
      question: "What approximate percentage of Earth's oxygen do phytoplankton produce?",
      options: ["50%", "10%", "25%", "75%"],
      correctAnswer: "50%",
    },
  ],
  "ocean-zones": [
    {
      id: 1,
      question: "How many major ocean zones exist based on depth and light?",
      options: ["Three (Euphotic, Dysphotic, Aphotic)", "Two", "Five", "One"],
      correctAnswer: "Three (Euphotic, Dysphotic, Aphotic)",
    },
    {
      id: 2,
      question: "What is the maximum depth of the Euphotic (Sunlit) Zone?",
      options: ["200 meters", "50 meters", "1,000 meters", "500 meters"],
      correctAnswer: "200 meters",
    },
    {
      id: 3,
      question: "What percentage of marine life lives in the Euphotic Zone?",
      options: ["90%", "50%", "25%", "10%"],
      correctAnswer: "90%",
    },
    {
      id: 4,
      question: "What makes the Dysphotic (Twilight) Zone unique?",
      options: [
        "Bioluminescent organisms dominate",
        "Coral reefs are abundant",
        "Temperature is the warmest",
        "Photosynthesis is at its peak",
      ],
      correctAnswer: "Bioluminescent organisms dominate",
    },
    {
      id: 5,
      question: "What is the deepest known point in the ocean?",
      options: [
        "Challenger Deep (Mariana Trench)",
        "Puerto Rico Trench",
        "Java Trench",
        "Tonga Trench",
      ],
      correctAnswer: "Challenger Deep (Mariana Trench)",
    },
    {
      id: 6,
      question: "At what depth does the Aphotic (Midnight) Zone begin?",
      options: ["1,000 meters", "200 meters", "500 meters", "2,000 meters"],
      correctAnswer: "1,000 meters",
    },
    {
      id: 7,
      question: "What is the pressure like in the deepest ocean zones?",
      options: [
        "Over 1,000 times surface pressure",
        "Same as surface",
        "10 times surface pressure",
        "100 times surface pressure",
      ],
      correctAnswer: "Over 1,000 times surface pressure",
    },
    {
      id: 8,
      question: "How do organisms near hydrothermal vents get their energy?",
      options: ["Chemosynthesis", "Photosynthesis", "Solar radiation", "Wind currents"],
      correctAnswer: "Chemosynthesis",
    },
    {
      id: 9,
      question: "What is the average temperature in the deep Aphotic Zone?",
      options: ["1-4°C", "15-20°C", "25-30°C", "10-15°C"],
      correctAnswer: "1-4°C",
    },
    {
      id: 10,
      question: "What percentage of the ocean floor has been explored by humans?",
      options: ["Less than 20%", "About 50%", "Over 75%", "100%"],
      correctAnswer: "Less than 20%",
    },
  ],
  "marine-life": [
    {
      id: 1,
      question: "What is the largest animal ever to have lived on Earth?",
      options: ["Blue whale", "Megalodon", "African elephant", "Tyrannosaurus Rex"],
      correctAnswer: "Blue whale",
    },
    {
      id: 2,
      question: "How many hearts does an octopus have?",
      options: ["Three", "One", "Two", "Four"],
      correctAnswer: "Three",
    },
    {
      id: 3,
      question: "What color is an octopus's blood?",
      options: ["Blue", "Red", "Green", "Clear"],
      correctAnswer: "Blue",
    },
    {
      id: 4,
      question: "What percentage of known marine species do coral reefs support?",
      options: ["25%", "10%", "50%", "5%"],
      correctAnswer: "25%",
    },
    {
      id: 5,
      question: "How do sea turtles navigate across oceans?",
      options: [
        "Earth's magnetic field",
        "Star patterns",
        "Ocean currents only",
        "Sound waves",
      ],
      correctAnswer: "Earth's magnetic field",
    },
    {
      id: 6,
      question: "What deep-sea fish uses a bioluminescent lure to catch prey?",
      options: ["Anglerfish", "Swordfish", "Clownfish", "Tuna"],
      correctAnswer: "Anglerfish",
    },
    {
      id: 7,
      question: "How long can some species of deep-sea tube worms live?",
      options: ["Over 250 years", "10 years", "50 years", "100 years"],
      correctAnswer: "Over 250 years",
    },
    {
      id: 8,
      question: "What animal has the largest eyes in the animal kingdom?",
      options: ["Giant squid", "Blue whale", "Great white shark", "Whale shark"],
      correctAnswer: "Giant squid",
    },
    {
      id: 9,
      question: "What type of symbiotic relationship do clownfish have with sea anemones?",
      options: ["Mutualism", "Parasitism", "Commensalism", "Competition"],
      correctAnswer: "Mutualism",
    },
    {
      id: 10,
      question: "How many species of sharks are known to science?",
      options: ["Over 500", "About 50", "Around 100", "Over 1,000"],
      correctAnswer: "Over 500",
    },
  ],
};

// For backwards compatibility
const quizData = quizzes.phytoplankton;
export default quizData;
