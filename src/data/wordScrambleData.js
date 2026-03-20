const wordScrambleData = [
  { word: "PHYTOPLANKTON", hint: "Microscopic ocean plants that produce 50% of Earth's oxygen", category: "Organism" },
  { word: "JELLYFISH", hint: "Has no brain, heart, or blood — existed for 500 million years", category: "Creature" },
  { word: "OCTOPUS", hint: "Has three hearts and blue blood", category: "Creature" },
  { word: "CORAL", hint: "Living organisms that build underwater reef structures", category: "Organism" },
  { word: "ANGLERFISH", hint: "Deep-sea fish with a bioluminescent lure", category: "Creature" },
  { word: "SWORDFISH", hint: "One of the fastest fish, reaching 97 km/h", category: "Creature" },
  { word: "TSUNAMI", hint: "Giant ocean wave caused by underwater earthquakes", category: "Phenomenon" },
  { word: "PLANKTON", hint: "Tiny organisms that drift in ocean currents", category: "Organism" },
  { word: "NARWHAL", hint: "Arctic whale known as the 'unicorn of the sea'", category: "Creature" },
  { word: "SEAHORSE", hint: "Unique fish where the male carries the babies", category: "Creature" },
  { word: "DOLPHIN", hint: "Highly intelligent marine mammal that uses echolocation", category: "Creature" },
  { word: "MANATEE", hint: "Gentle herbivorous marine mammal, also called a sea cow", category: "Creature" },
  { word: "ABYSS", hint: "The deepest, darkest zone of the ocean", category: "Zone" },
  { word: "TRENCH", hint: "The deepest geological features on Earth's surface", category: "Geography" },
  { word: "BIOLUMINESCENCE", hint: "Ability of organisms to produce their own light", category: "Phenomenon" },
];

export function scrambleWord(word) {
  const arr = word.split("");
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  const result = arr.join("");
  return result === word ? scrambleWord(word) : result;
}

export default wordScrambleData;
