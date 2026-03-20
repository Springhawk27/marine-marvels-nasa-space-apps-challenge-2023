export const seaCreatures = {
  surface: [
    { id: "dolphin", name: "Dolphin", emoji: null, color: "#7ab8d4", speed: 14, size: 60, y: 8, direction: "right", info: "Highly intelligent, uses echolocation" },
    { id: "seagull", name: "Seagull", emoji: null, color: "#d4d4d4", speed: 10, size: 30, y: 2, direction: "left", info: "Feeds on fish near the surface" },
    { id: "flyingfish", name: "Flying Fish", emoji: null, color: "#89c4e0", speed: 8, size: 35, y: 5, direction: "right", info: "Can glide 200m above water" },
  ],
  euphotic: [
    { id: "clownfish", name: "Clownfish", emoji: null, color: "#ff8c42", speed: 7, size: 28, y: 22, direction: "right", info: "Lives symbiotically with anemones" },
    { id: "seahorse", name: "Seahorse", emoji: null, color: "#e8c547", speed: 3, size: 32, y: 30, direction: "left", info: "Males carry the babies" },
    { id: "turtle", name: "Sea Turtle", emoji: null, color: "#5da66a", speed: 6, size: 55, y: 18, direction: "right", info: "Can live over 100 years" },
    { id: "jellyfish1", name: "Moon Jelly", emoji: null, color: "#c4a4e8", speed: 2, size: 40, y: 26, direction: "left", info: "97% water, no brain or heart" },
    { id: "butterfly", name: "Butterfly Fish", emoji: null, color: "#f5d76e", speed: 5, size: 25, y: 35, direction: "right", info: "Mates for life" },
    { id: "tang", name: "Blue Tang", emoji: null, color: "#4a90d9", speed: 6, size: 26, y: 32, direction: "left", info: "Can change color intensity" },
  ],
  dysphotic: [
    { id: "swordfish", name: "Swordfish", emoji: null, color: "#6e8ba8", speed: 12, size: 70, y: 48, direction: "left", info: "Reaches speeds of 97 km/h" },
    { id: "squid", name: "Giant Squid", emoji: null, color: "#b85c5c", speed: 4, size: 65, y: 56, direction: "right", info: "Eyes can be 27cm in diameter" },
    { id: "lanternfish", name: "Lanternfish", emoji: null, color: "#7eb8a0", speed: 3, size: 20, y: 52, direction: "left", info: "Most abundant deep-sea fish" },
    { id: "hatchetfish", name: "Hatchetfish", emoji: null, color: "#a0a0c0", speed: 3, size: 22, y: 60, direction: "right", info: "Uses bioluminescence as camouflage" },
  ],
  aphotic: [
    { id: "anglerfish", name: "Angler Fish", emoji: null, color: "#5a3e3e", speed: 2, size: 50, y: 75, direction: "right", info: "Lures prey with bioluminescent light" },
    { id: "viperfish", name: "Viperfish", emoji: null, color: "#4a4a6a", speed: 3, size: 40, y: 82, direction: "left", info: "Teeth so large they don't fit in mouth" },
    { id: "blobfish", name: "Blobfish", emoji: null, color: "#c9a0a0", speed: 1, size: 35, y: 88, direction: "right", info: "Voted world's ugliest animal" },
    { id: "gulpereel", name: "Gulper Eel", emoji: null, color: "#3d3d5c", speed: 2, size: 55, y: 92, direction: "left", info: "Mouth larger than its body" },
  ],
};

export const seaPlants = [
  { id: "kelp1", type: "kelp", x: 5, height: 180, color: "#2d6b3f", sway: 8 },
  { id: "kelp2", type: "kelp", x: 12, height: 220, color: "#3a7d4e", sway: 10 },
  { id: "kelp3", type: "kelp", x: 88, height: 160, color: "#2d6b3f", sway: 7 },
  { id: "kelp4", type: "kelp", x: 95, height: 200, color: "#357544", sway: 9 },
  { id: "coral1", type: "coral", x: 20, color: "#e85d75", size: 50 },
  { id: "coral2", type: "coral", x: 35, color: "#e8a84c", size: 40 },
  { id: "coral3", type: "coral", x: 65, color: "#d45d9e", size: 45 },
  { id: "coral4", type: "coral", x: 78, color: "#4cb8e8", size: 38 },
  { id: "coral5", type: "coral", x: 50, color: "#8b5de8", size: 42 },
  { id: "anemone1", type: "anemone", x: 25, color: "#e85d75", size: 35 },
  { id: "anemone2", type: "anemone", x: 72, color: "#5de8a8", size: 30 },
  { id: "seagrass1", type: "seagrass", x: 40, height: 80, color: "#4a9e5c" },
  { id: "seagrass2", type: "seagrass", x: 55, height: 60, color: "#5aae6c" },
  { id: "seagrass3", type: "seagrass", x: 30, height: 70, color: "#4a9e5c" },
];

export const depthZones = [
  { name: "Surface", depth: "0m", from: 0, to: 10, bg: "linear-gradient(180deg, #0a6aad 0%, #0856a0 100%)" },
  { name: "Euphotic Zone", depth: "0-200m", from: 10, to: 40, bg: "linear-gradient(180deg, #0856a0 0%, #064588 100%)" },
  { name: "Dysphotic Zone", depth: "200-1000m", from: 40, to: 65, bg: "linear-gradient(180deg, #064588 0%, #032456 100%)" },
  { name: "Aphotic Zone", depth: "1000m+", from: 65, to: 100, bg: "linear-gradient(180deg, #032456 0%, #010818 100%)" },
];
