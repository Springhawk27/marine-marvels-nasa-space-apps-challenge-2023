import RootLayout from "@/components/Layouts/RootLayout";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══ FISH SHAPES — each species has a unique SVG body ═══ */
const shapes = {
  // Round tropical (clownfish, angelfish, butterfly)
  round: (c, a, ph) => (<>
    <ellipse cx="40" cy="24" rx="22" ry="18" fill={c}/>
    <ellipse cx="40" cy="18" rx="16" ry="9" fill="white" opacity="0.06"/>
    <path d={ph?"M18 24 L6 10 L10 24 L6 38Z":"M18 24 L9 15 L12 24 L9 33Z"} fill={a}/>
    <path d="M34 6 Q40 0 48 6 L46 10 Q40 7 36 10Z" fill={a} opacity="0.7"/>
    <path d="M34 42 Q40 48 48 42 L46 38 Q40 41 36 38Z" fill={a} opacity="0.5"/>
    <circle cx="52" cy="20" r="5" fill="white"/><circle cx="53.5" cy="19" r="2.8" fill="#1a1a2e"/><circle cx="54.5" cy="18" r="1" fill="white"/>
  </>),
  // Elongated (swordfish, viperfish)
  sleek: (c, a, ph) => (<>
    <path d="M5 24 Q15 12 40 10 Q65 8 75 20 L78 24 L75 28 Q65 40 40 38 Q15 36 5 24Z" fill={c}/>
    <path d="M10 22 Q30 14 55 14 Q68 14 72 20" fill="white" opacity="0.05"/>
    <path d={ph?"M5 24 L-6 14 L0 24 L-6 34Z":"M5 24 L-3 17 L1 24 L-3 31Z"} fill={a}/>
    <path d="M40 8 Q48 2 56 8" fill={a} opacity="0.6"/>
    <circle cx="66" cy="21" r="4" fill="white"/><circle cx="67" cy="20" r="2.2" fill="#1a1a2e"/><circle cx="67.8" cy="19.2" r="0.8" fill="white"/>
    <path d="M78 24 L84 22 L84 26Z" fill={a} opacity="0.6"/>
  </>),
  // Flat/disc (blue tang, parrotfish)
  disc: (c, a, ph) => (<>
    <ellipse cx="38" cy="24" rx="24" ry="20" fill={c}/>
    <ellipse cx="38" cy="17" rx="18" ry="10" fill="white" opacity="0.06"/>
    <path d={ph?"M14 24 L3 10 L8 24 L3 38Z":"M14 24 L6 16 L9 24 L6 32Z"} fill={a}/>
    <path d="M30 4 L38 0 L46 4 Q40 8 30 4Z" fill={a} opacity="0.7"/>
    <path d="M30 44 L38 48 L46 44 Q40 40 30 44Z" fill={a} opacity="0.5"/>
    <circle cx="50" cy="20" r="5.5" fill="white"/><circle cx="52" cy="19" r="3" fill="#1a1a2e"/><circle cx="53" cy="18" r="1" fill="white"/>
    <path d="M44 15 Q42 24 44 33" fill="none" stroke={a} strokeWidth="0.8" opacity="0.2"/>
  </>),
  // Turtle — head on right side to match all other fish
  turtle: (c, a, ph) => (<>
    <ellipse cx="38" cy="24" rx="26" ry="16" fill={c}/>
    <ellipse cx="38" cy="24" rx="22" ry="12" fill={a} opacity="0.3"/>
    {/* Back flippers (left) */}
    <path d={ph?"M20 16 L12 10 L18 18Z":"M20 16 L14 12 L19 18Z"} fill={c} opacity="0.7"/>
    <path d={ph?"M20 32 L12 38 L18 30Z":"M20 32 L14 36 L19 30Z"} fill={c} opacity="0.7"/>
    {/* Front flippers (right, near head) */}
    <path d={ph?"M52 16 L60 10 L56 18Z":"M52 16 L58 13 L55 18Z"} fill={c} opacity="0.7"/>
    <path d={ph?"M52 32 L60 38 L56 30Z":"M52 32 L58 35 L55 30Z"} fill={c} opacity="0.7"/>
    {/* Tail (left) */}
    <path d="M12 24 L5 20 L7 24 L5 28Z" fill={c} opacity="0.6"/>
    {/* Head (right) */}
    <ellipse cx="64" cy="24" rx="4" ry="3" fill={c}/><circle cx="68" cy="24" r="5.5" fill={c}/>
    <circle cx="71" cy="22" r="2" fill="white"/><circle cx="71.8" cy="21.5" r="1.1" fill="#1a1a2e"/>
    {/* Shell pattern */}
    <line x1="30" y1="20" x2="46" y2="20" stroke={a} strokeWidth="0.5" opacity="0.15"/>
    <line x1="30" y1="28" x2="46" y2="28" stroke={a} strokeWidth="0.5" opacity="0.15"/>
    <line x1="38" y1="14" x2="38" y2="34" stroke={a} strokeWidth="0.5" opacity="0.15"/>
  </>),
  // Jellyfish
  jelly: (c, a, ph) => (<>
    <path d="M15 22 Q15 6 40 6 Q65 6 65 22 Q55 28 40 26 Q25 28 15 22Z" fill={c} opacity="0.6"/>
    <ellipse cx="40" cy="14" rx="18" ry="6" fill="white" opacity="0.08"/>
    {[25,32,40,48,55].map((x,i) => (
      <motion.path key={i} d={`M${x} 24 Q${x+(ph?2:-2)} 34 ${x} 44`} fill="none" stroke={c} strokeWidth="1.5" opacity="0.5"
        animate={{d:[`M${x} 24 Q${x+3} 34 ${x} 44`,`M${x} 24 Q${x-3} 36 ${x} 46`,`M${x} 24 Q${x+3} 34 ${x} 44`]}}
        transition={{duration:2+i*0.3,repeat:Infinity,ease:"easeInOut"}}/>
    ))}
  </>),
  // Seahorse
  seahorse: (c, a, ph) => (<>
    <path d="M40 4 Q50 4 52 12 Q54 20 50 26 Q46 32 42 36 Q38 40 36 46" fill="none" stroke={c} strokeWidth="6" strokeLinecap="round"/>
    <path d="M36 46 Q32 44 30 40 Q28 36 32 34" fill="none" stroke={c} strokeWidth="4" strokeLinecap="round"/>
    <circle cx="46" cy="10" r="7" fill={c}/><circle cx="49" cy="8" r="3" fill="white"/><circle cx="50" cy="7.5" r="1.6" fill="#1a1a2e"/>
    <path d="M52 10 L58 8 L56 12Z" fill={c} opacity="0.6"/>
    <path d={ph?"M44 20 L38 16":"M44 20 L40 18"} fill="none" stroke={c} strokeWidth="2" opacity="0.4"/>
  </>),
  // Octopus / squid
  octo: (c, a, ph) => (<>
    <ellipse cx="40" cy="18" rx="20" ry="14" fill={c}/>
    <ellipse cx="40" cy="14" rx="14" ry="7" fill="white" opacity="0.06"/>
    {[24,30,36,42,48,54].map((x,i) => (
      <motion.path key={i} d={`M${x} 30 Q${x+(i%2?3:-3)} 38 ${x} 46`} fill="none" stroke={c} strokeWidth="3" strokeLinecap="round" opacity="0.7"
        animate={{d:[`M${x} 30 Q${x+4} 38 ${x} 46`,`M${x} 30 Q${x-4} 40 ${x} 48`,`M${x} 30 Q${x+4} 38 ${x} 46`]}}
        transition={{duration:1.8+i*0.2,repeat:Infinity,ease:"easeInOut"}}/>
    ))}
    <circle cx="33" cy="16" r="4" fill="white"/><circle cx="34" cy="15.5" r="2.2" fill="#1a1a2e"/>
    <circle cx="47" cy="16" r="4" fill="white"/><circle cx="48" cy="15.5" r="2.2" fill="#1a1a2e"/>
  </>),
  // Eel
  eel: (c, a, ph) => (<>
    <motion.path d={ph?"M5 24 Q20 16 35 24 Q50 32 65 24 Q72 20 78 22":"M5 24 Q20 32 35 24 Q50 16 65 24 Q72 28 78 26"}
      fill="none" stroke={c} strokeWidth="8" strokeLinecap="round"
      animate={{d:["M5 24 Q20 16 35 24 Q50 32 65 24 Q72 20 78 22","M5 24 Q20 32 35 24 Q50 16 65 24 Q72 28 78 26","M5 24 Q20 16 35 24 Q50 32 65 24 Q72 20 78 22"]}}
      transition={{duration:2,repeat:Infinity,ease:"easeInOut"}}/>
    <circle cx="76" cy="23" r="5" fill={c}/><circle cx="78" cy="21" r="2.5" fill="white"/><circle cx="78.5" cy="20.5" r="1.4" fill="#1a1a2e"/>
    <path d="M80 24 L84 22 L84 26Z" fill={c} opacity="0.5"/>
  </>),
};

const FISH_DATA = [
  { name: "Blue Tang", zone: "Euphotic", color: "#4a90d9", accent: "#3070b0", size: 52, spd: 2.5, yMin: 6, yMax: 20, behavior: "shy", shape: "disc" },
  { name: "Clownfish", zone: "Euphotic", color: "#ff8c42", accent: "#e06820", size: 36, spd: 2.0, yMin: 14, yMax: 28, behavior: "playful", shape: "round" },
  { name: "Sea Turtle", zone: "Euphotic", color: "#5da66a", accent: "#3d7a4a", size: 80, spd: 1.0, yMin: 8, yMax: 22, behavior: "calm", shape: "turtle" },
  { name: "Butterfly Fish", zone: "Euphotic", color: "#f5d76e", accent: "#c4a840", size: 34, spd: 2.2, yMin: 18, yMax: 32, behavior: "shy", shape: "round" },
  { name: "Parrotfish", zone: "Euphotic", color: "#45b7a0", accent: "#2d8a75", size: 50, spd: 1.8, yMin: 16, yMax: 30, behavior: "playful", shape: "disc" },
  { name: "Angelfish", zone: "Euphotic", color: "#e85d9a", accent: "#b84078", size: 44, spd: 1.5, yMin: 20, yMax: 34, behavior: "curious", shape: "round" },
  { name: "Seahorse", zone: "Euphotic", color: "#e8c547", accent: "#b89830", size: 50, spd: 0.5, yMin: 26, yMax: 38, behavior: "calm", shape: "seahorse" },
  { name: "Moon Jelly", zone: "Euphotic", color: "#c4a4e8", accent: "#9a7ac0", size: 58, spd: 0.35, yMin: 10, yMax: 34, behavior: "calm", shape: "jelly" },
  { name: "Octopus", zone: "Dysphotic", color: "#a0506a", accent: "#7a3050", size: 65, spd: 0.8, yMin: 42, yMax: 58, behavior: "shy", shape: "octo", ink: true },
  { name: "Swordfish", zone: "Dysphotic", color: "#6e8ba8", accent: "#506880", size: 90, spd: 3.5, yMin: 40, yMax: 54, behavior: "shy", shape: "sleek" },
  { name: "Lanternfish", zone: "Dysphotic", color: "#7eb8a0", accent: "#5a9078", size: 30, spd: 1.5, yMin: 44, yMax: 58, behavior: "curious", shape: "round" },
  { name: "Giant Squid", zone: "Dysphotic", color: "#b85c5c", accent: "#904040", size: 80, spd: 0.9, yMin: 48, yMax: 60, behavior: "shy", shape: "octo" },
  { name: "Angler Fish", zone: "Aphotic", color: "#6a4a4a", accent: "#4a3030", size: 60, spd: 0.7, yMin: 64, yMax: 76, behavior: "calm", shape: "round", glow: true },
  { name: "Viperfish", zone: "Aphotic", color: "#5a5a7a", accent: "#3a3a5a", size: 55, spd: 1.0, yMin: 72, yMax: 82, behavior: "shy", shape: "sleek", glow: true },
  { name: "Gulper Eel", zone: "Aphotic", color: "#4a4a6a", accent: "#2a2a4a", size: 75, spd: 0.55, yMin: 78, yMax: 88, behavior: "calm", shape: "eel", glow: true },
];

const FOODS = [
  { id: "flakes", name: "Fish Flakes", color: "#f5d76e", size: 5, sink: 0.8 },
  { id: "pellets", name: "Pellets", color: "#cc8844", size: 7, sink: 1.4 },
  { id: "shrimp", name: "Brine Shrimp", color: "#ff9977", size: 6, sink: 0.5 },
];

function FishRenderer({ color, accent, size, facingRight, glow, phase, shape }) {
  const h = size * 0.65;
  const shapeFunc = shapes[shape] || shapes.round;
  return (
    <svg width={size} height={h} viewBox="0 0 86 48" style={{
      transform: facingRight ? "scaleX(1)" : "scaleX(-1)",
      filter: `drop-shadow(0 4px 12px ${color}40)`,
    }}>
      {shapeFunc(color, accent, phase)}
      {glow && !["jelly","seahorse","octo","eel"].includes(shape) && (<>
        <line x1="58" y1="11" x2="69" y2="3" stroke={accent} strokeWidth="0.8"/>
        <circle cx="69" cy="2" r={phase?5:3} fill="#4ECDC4" opacity={phase?0.9:0.35}/>
      </>)}
    </svg>
  );
}

export default function AquariumPage() {
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: -200, y: -200 });
  const fishRef = useRef([]);
  const foodRef = useRef([]);
  const inkRef = useRef([]);
  const dustRef = useRef([]);
  const frameRef = useRef(null);
  const [renderFish, setRenderFish] = useState([]);
  const [renderFood, setRenderFood] = useState([]);
  const [renderInk, setRenderInk] = useState([]);
  const [renderDust, setRenderDust] = useState([]);
  const [phase, setPhase] = useState(false);
  const [mode, setMode] = useState("watch");
  const [selFood, setSelFood] = useState(FOODS[0]);
  const [eatCount, setEatCount] = useState(0);
  const [dims, setDims] = useState({ w: 1200, h: 800 });
  const [tooltip, setTooltip] = useState(null);

  useEffect(() => {
    const w = window.innerWidth; const h = window.innerHeight;
    setDims({ w, h });
    fishRef.current = FISH_DATA.map((f, i) => {
      // Spawn from random positions including middle of screen
      const spawnX = Math.random() * w * 0.6 + w * 0.2;
      const angle = Math.random() * Math.PI * 2;
      return {
        ...f, id: i,
        x: spawnX,
        y: h * (f.yMin + Math.random() * (f.yMax - f.yMin)) / 100,
        vx: Math.cos(angle) * f.spd * (0.6 + Math.random() * 0.8),
        vy: Math.sin(angle) * f.spd * 0.3,
        inkCooldown: 0, dustCooldown: 0,
      };
    });
    const onResize = () => setDims({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => { const t = setInterval(() => setPhase(p => !p), 280); return () => clearInterval(t); }, []);

  useEffect(() => {
    const { w, h } = dims;
    if (!w) return;
    let frame = 0;
    const tick = () => {
      frame++;
      const mx = mouseRef.current.x; const my = mouseRef.current.y;
      fishRef.current.forEach(fish => {
        const dx = mx - fish.x; const dy = my - fish.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (fish.inkCooldown > 0) fish.inkCooldown--;
        if (fish.dustCooldown > 0) fish.dustCooldown--;

        if (dist < 160 && dist > 5) {
          const nx = dx / dist; const ny = dy / dist;
          if (fish.behavior === "shy") {
            const force = (160 - dist) / 160 * 1.8;
            fish.vx -= nx * force; fish.vy -= ny * force * 0.6;
            if (fish.ink && dist < 80 && fish.inkCooldown <= 0) {
              fish.inkCooldown = 180;
              for (let k = 0; k < 8; k++) inkRef.current.push({ id: Date.now()+k, x: fish.x, y: fish.y, vx: (Math.random()-0.5)*3, vy: (Math.random()-0.5)*2-0.5, life: 120, size: 10+Math.random()*15 });
            }
          } else if (fish.behavior === "curious" && dist > 50) {
            fish.vx += nx * 0.3; fish.vy += ny * 0.2;
          } else if (fish.behavior === "playful") {
            const f = (160 - dist) / 160 * 0.8;
            fish.vx += (-ny) * f + nx * 0.1; fish.vy += nx * f + ny * 0.1;
          }
        }

        // Occasional random direction changes
        if (Math.random() < 0.003) {
          fish.vx += (Math.random() - 0.5) * fish.spd * 0.8;
          fish.vy += (Math.random() - 0.5) * fish.spd * 0.3;
        }

        const floorY = h * 0.88;
        if (fish.y > floorY - 30 && fish.dustCooldown <= 0 && Math.random() < 0.005) {
          fish.dustCooldown = 300;
          for (let k = 0; k < 5; k++) dustRef.current.push({ id: Date.now()+k+fish.id*100, x: fish.x+(Math.random()-0.5)*30, y: floorY+Math.random()*5, vx: (Math.random()-0.5)*1.5, vy: -Math.random()*1.2, life: 80, size: 4+Math.random()*6 });
        }

        if (foodRef.current.length > 0) {
          let bestD = 250, bestF = null;
          for (const f of foodRef.current) { const fd = Math.sqrt((f.x-fish.x)**2+(f.y-fish.y)**2); if (fd < bestD) { bestD = fd; bestF = f; } }
          if (bestF) {
            const fdx = bestF.x-fish.x, fdy = bestF.y-fish.y, fd = Math.sqrt(fdx*fdx+fdy*fdy);
            if (fd > 5) { const str = Math.min(1.5, 80/fd); fish.vx += (fdx/fd)*str; fish.vy += (fdy/fd)*str; }
            if (fd < 22) { foodRef.current = foodRef.current.filter(ff => ff !== bestF); setEatCount(c => c+1); }
          }
        }

        const homeY = h * ((fish.yMin + fish.yMax) / 2) / 100;
        fish.vy += (homeY - fish.y) * 0.002;
        fish.vx *= 0.985; fish.vy *= 0.975;
        if (Math.abs(fish.vx) < fish.spd * 0.35) fish.vx += (fish.vx >= 0 ? 1 : -1) * 0.1;
        const maxSpd = fish.spd * 3;
        const spd = Math.sqrt(fish.vx**2 + fish.vy**2);
        if (spd > maxSpd) { fish.vx = (fish.vx/spd)*maxSpd; fish.vy = (fish.vy/spd)*maxSpd; }
        fish.x += fish.vx; fish.y += fish.vy;
        if (fish.x < -fish.size) fish.x = w + fish.size;
        if (fish.x > w + fish.size) fish.x = -fish.size;
        const yMinPx = h * fish.yMin / 100, yMaxPx = h * fish.yMax / 100;
        if (fish.y < yMinPx) { fish.y = yMinPx; fish.vy = Math.abs(fish.vy) * 0.5; }
        if (fish.y > yMaxPx) { fish.y = yMaxPx; fish.vy = -Math.abs(fish.vy) * 0.5; }
      });

      foodRef.current.forEach(f => { f.y += f.sink; f.x += Math.sin(frame*0.03+f.id)*0.3; });
      foodRef.current = foodRef.current.filter(f => f.y < h * 0.88);
      inkRef.current.forEach(p => { p.x+=p.vx; p.y+=p.vy; p.vx*=0.97; p.vy*=0.97; p.life--; p.size+=0.3; });
      inkRef.current = inkRef.current.filter(p => p.life>0);
      dustRef.current.forEach(p => { p.x+=p.vx; p.y+=p.vy; p.vy+=0.02; p.vx*=0.98; p.life--; });
      dustRef.current = dustRef.current.filter(p => p.life>0);

      setRenderFish(fishRef.current.map(f => ({ id:f.id, x:f.x, y:f.y, vx:f.vx, size:f.size, color:f.color, accent:f.accent, glow:f.glow, name:f.name, zone:f.zone, shape:f.shape })));
      setRenderFood(foodRef.current.map(f => ({...f})));
      setRenderInk(inkRef.current.map(p => ({ id:p.id, x:p.x, y:p.y, size:p.size, opacity:p.life/120 })));
      setRenderDust(dustRef.current.map(p => ({ id:p.id, x:p.x, y:p.y, size:p.size, opacity:p.life/80 })));

      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [dims]);

  const handleMouseMove = useCallback((e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) mouseRef.current = { x: e.clientX-rect.left, y: e.clientY-rect.top };
  }, []);

  const handleClick = useCallback((e) => {
    if (mode !== "feed") return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = e.clientX-rect.left, cy = e.clientY-rect.top;
    for (let i = 0; i < 5; i++) foodRef.current.push({ id: Date.now()+i, x: cx+(Math.random()-0.5)*50, y: cy+(Math.random()-0.5)*15, sink: selFood.sink*(0.7+Math.random()*0.6), color: selFood.color, size: selFood.size });
  }, [mode, selFood]);

  const zoneColor = (z) => z === "Euphotic" ? "#4ECDC4" : z === "Dysphotic" ? "#6C5CE7" : "#FD79A8";

  return (
    <>
      <Head><title>Ocean Aquarium | Marine Marvels</title></Head>
      <div ref={containerRef} className="relative overflow-hidden select-none"
        style={{ height: "100vh", cursor: mode === "feed" ? "crosshair" : "default",
          background: "linear-gradient(180deg, #0b6fb5 0%, #0860a5 8%, #065095 18%, #054080 30%, #032a60 46%, #021c48 62%, #01102c 80%, #010a18 100%)" }}
        onMouseMove={handleMouseMove} onClick={handleClick}>

        {/* Glass frame */}
        <div className="absolute inset-1 pointer-events-none z-40 border-[3px] border-white/[0.05] rounded-xl"/>
        <div className="absolute top-0 left-0 right-0 h-20 pointer-events-none z-40 bg-gradient-to-b from-white/[0.04] to-transparent"/>

        {/* Light rays — taller for bigger surface */}
        <div className="absolute inset-0 pointer-events-none" style={{ height: "55%" }}>
          {[...Array(8)].map((_, i) => (
            <motion.div key={i} className="absolute top-0"
              style={{ left: `${6+i*12}%`, width: `${18+i*4}px`, height: "100%", background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 75%)", transformOrigin: "top" }}
              animate={{ opacity: [0.15, 0.6, 0.15], scaleX: [0.7, 1.4, 0.7] }}
              transition={{ duration: 5+i, repeat: Infinity, ease: "easeInOut", delay: i*0.5 }}/>
          ))}
        </div>

        {/* Bubbles */}
        {[...Array(18)].map((_, i) => (
          <motion.div key={`b${i}`} className="absolute rounded-full pointer-events-none"
            style={{ left: `${2+((i*53)%96)}%`, bottom: 0, width: `${3+(i%4)*2}px`, height: `${3+(i%4)*2}px`,
              background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,${0.25+(i%3)*0.1}), rgba(255,255,255,0.04))`, border: "0.5px solid rgba(255,255,255,0.12)" }}
            animate={{ y: [0, -(dims.h*0.6+(i*50)%300)], x: [0, Math.sin(i*0.7)*18, 0], opacity: [0, 0.55, 0] }}
            transition={{ duration: 6+(i%4)*2, repeat: Infinity, delay: i*0.55, ease: "easeOut" }}/>
        ))}

        {/* Bioluminescence in deep */}
        <div className="absolute pointer-events-none" style={{ top: "58%", bottom: 0, left: 0, right: 0 }}>
          {[...Array(16)].map((_, i) => (
            <motion.div key={`g${i}`} className="absolute rounded-full"
              style={{ left: `${4+((i*47)%92)}%`, top: `${8+((i*29)%80)}%`, width: `${2+(i%3)}px`, height: `${2+(i%3)}px` }}
              animate={{ opacity: [0, 0.6, 0], backgroundColor: ["#4ECDC4","#6C5CE7","#FD79A8","#4ECDC4"] }}
              transition={{ duration: 3+(i%3), repeat: Infinity, delay: i*0.35 }}/>
          ))}
        </div>

        {/* ═══ TALL KELP FOREST ═══ */}
        {[2,7,11,16,83,88,93,97].map((x, i) => (
          <motion.div key={`kp${i}`} className="absolute bottom-0 pointer-events-none z-[3]" style={{ left: `${x}%` }}
            animate={{ rotate: [-3,3,-3] }} transition={{ duration: 3.5+i*0.3, repeat: Infinity, ease: "easeInOut" }}>
            <svg width="24" height={130+i*18} viewBox={`0 0 24 ${130+i*18}`} style={{ transformOrigin: "bottom center" }}>
              <path d={`M12 ${130+i*18} Q5 ${(130+i*18)*0.6} 12 ${(130+i*18)*0.35} Q19 ${(130+i*18)*0.15} 12 0`}
                fill="none" stroke={i%3===0?"#2d6b3f":i%3===1?"#3a7d4e":"#2a5e38"} strokeWidth="3" strokeLinecap="round"/>
              {[0.2,0.35,0.5,0.65,0.8].map((pos, j) => (
                <motion.ellipse key={j} cx={j%2===0?4:20} cy={(130+i*18)*pos} rx="8" ry="3.5"
                  fill={i%3===0?"#2d6b3f":i%3===1?"#3a7d4e":"#2a5e38"} opacity="0.45"
                  animate={{ rx: [7,9,7] }} transition={{ duration: 2, delay: j*0.3, repeat: Infinity }}/>
              ))}
            </svg>
          </motion.div>
        ))}

        {/* Mid-water hanging vines / seaweed */}
        {[20,32,50,68,78].map((x, i) => (
          <div key={`vine${i}`} className="absolute pointer-events-none z-[1]" style={{ left: `${x}%`, bottom: "12%" }}>
            {[...Array(6)].map((_, j) => (
              <motion.div key={j} className="absolute bottom-0"
                style={{ left: `${j*5-12}px`, width: "2.5px", height: `${45+j*14}px`,
                  background: `linear-gradient(to top, ${i%2===0?"#3a6b4a":"#4a7b5a"}, ${i%2===0?"#3a6b4a40":"#4a7b5a40"}, transparent)`,
                  borderRadius: "1.5px", transformOrigin: "bottom center" }}
                animate={{ rotate: [-8-j*2, 8+j*2, -8-j*2] }}
                transition={{ duration: 2.5+j*0.4, repeat: Infinity, ease: "easeInOut" }}/>
            ))}
          </div>
        ))}

        {/* ═══ OCEAN FLOOR — 12% height ═══ */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-[2]" style={{ height: "12%" }}>
          {/* Sandy gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-full" style={{ background: "linear-gradient(to top, #2a2218 0%, #3d3520 35%, #3d352008 75%, transparent 100%)" }}/>
          {/* Sand ripple texture */}
          <svg className="absolute bottom-0 left-0 right-0" width="100%" height="25" viewBox="0 0 1440 25" preserveAspectRatio="none">
            <path d="M0,18 Q36,14 72,18 Q108,22 144,18 Q180,14 216,18 Q252,22 288,18 Q324,14 360,18 Q396,22 432,18 Q468,14 504,18 Q540,22 576,18 Q612,14 648,18 Q684,22 720,18 Q756,14 792,18 Q828,22 864,18 Q900,14 936,18 Q972,22 1008,18 Q1044,14 1080,18 Q1116,22 1152,18 Q1188,14 1224,18 Q1260,22 1296,18 Q1332,14 1368,18 Q1404,22 1440,18 L1440,25 L0,25Z" fill="#352c1e" opacity="0.25"/>
          </svg>

          {/* Rocks of various sizes */}
          {[{x:10,w:35,h:20},{x:28,w:22,h:14},{x:52,w:28,h:16},{x:74,w:18,h:12},{x:90,w:30,h:18}].map((r, i) => (
            <svg key={`rk${i}`} className="absolute bottom-0" style={{ left: `${r.x}%` }} width={r.w} height={r.h} viewBox={`0 0 ${r.w} ${r.h}`}>
              <ellipse cx={r.w/2} cy={r.h*0.8} rx={r.w/2-1} ry={r.h*0.4} fill={["#3a3530","#2e2a24","#35302a","#302b25","#3a3530"][i]}/>
              <ellipse cx={r.w/2} cy={r.h*0.65} rx={r.w/2-3} ry={r.h*0.3} fill={["#454038","#3a352e","#3f3a32","#3a352e","#454038"][i]}/>
              <ellipse cx={r.w*0.4} cy={r.h*0.55} rx={r.w*0.15} ry={r.h*0.12} fill="white" opacity="0.03"/>
            </svg>
          ))}

          {/* Sunken ship */}
          <div className="absolute bottom-0 z-[3]" style={{ left: "42%" }}>
            <svg width="90" height="55" viewBox="0 0 90 55">
              <path d="M12 53 L7 38 Q10 32 18 30 L72 30 Q80 32 83 38 L78 53Z" fill="#3d2820"/>
              <path d="M15 50 L11 40 Q13 34 20 32 L70 32 Q77 34 79 40 L75 50Z" fill="#4a3228"/>
              <rect x="24" y="26" width="42" height="6" rx="1" fill="#3d2820"/>
              <rect x="43" y="6" width="3.5" height="24" rx="1" fill="#4a3228"/>
              <line x1="44.5" y1="10" x2="62" y2="16" stroke="#3d2820" strokeWidth="1.5"/>
              <line x1="44.5" y1="12" x2="28" y2="18" stroke="#3d2820" strokeWidth="1"/>
              <circle cx="34" cy="40" r="3.5" fill="#1a1510" stroke="#5a4a38" strokeWidth="0.8"/>
              <circle cx="56" cy="40" r="3.5" fill="#1a1510" stroke="#5a4a38" strokeWidth="0.8"/>
              <circle cx="20" cy="32" r="4" fill="#e85d75" opacity="0.4"/>
              <circle cx="70" cy="31" r="3" fill="#4cb8e8" opacity="0.35"/>
              <circle cx="50" cy="29" r="2.5" fill="#8b5de8" opacity="0.3"/>
            </svg>
          </div>

          {/* Treasure chest */}
          <div className="absolute bottom-1 z-[3]" style={{ left: "68%" }}>
            <svg width="32" height="24" viewBox="0 0 32 24">
              <rect x="3" y="8" width="26" height="16" rx="2" fill="#6a4a20" stroke="#8a6a30" strokeWidth="1"/>
              <path d="M3 8 Q16 2 29 8" fill="#7a5a28" stroke="#8a6a30" strokeWidth="0.8"/>
              <rect x="13" y="13" width="6" height="4" rx="1" fill="#d4a840"/><circle cx="16" cy="15" r="1.5" fill="#f5d76e"/>
              <motion.circle cx="9" cy="7" r="2" fill="#f5d76e" opacity="0.5" animate={{ opacity: [0.3,0.7,0.3] }} transition={{ duration: 2, repeat: Infinity }}/>
              <motion.circle cx="24" cy="6" r="1.5" fill="#f5d76e" opacity="0.4" animate={{ opacity: [0.2,0.6,0.2] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}/>
            </svg>
          </div>

          {/* Sand holes */}
          {[16,36,60,82].map((x, i) => (
            <div key={`h${i}`} className="absolute bottom-1" style={{ left: `${x}%` }}>
              <svg width="16" height="10" viewBox="0 0 16 10"><ellipse cx="8" cy="5" rx="7" ry="4" fill="#1a1510" opacity="0.35"/><ellipse cx="8" cy="5" rx="4.5" ry="2.5" fill="#0f0d0a" opacity="0.25"/></svg>
            </div>
          ))}

          {/* Corals */}
          {[6,18,33,55,76,90].map((x, i) => (
            <motion.div key={`cr${i}`} className="absolute bottom-0" style={{ left: `${x}%` }}
              animate={{ scaleX: [0.96,1.04,0.96] }} transition={{ duration: 3.5+i*0.4, repeat: Infinity, ease: "easeInOut" }}>
              <svg width={35+(i%3)*8} height={30} viewBox="0 0 50 38">
                <path d="M25 38 L20 24 L14 12 L10 5" fill="none" stroke={["#e85d75","#e8a84c","#4cb8e8","#8b5de8","#d45d9e","#45b7a0"][i]} strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M25 38 L25 18 L25 8" fill="none" stroke={["#e85d75","#e8a84c","#4cb8e8","#8b5de8","#d45d9e","#45b7a0"][i]} strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M25 38 L30 22 L36 12 L40 6" fill="none" stroke={["#e85d75","#e8a84c","#4cb8e8","#8b5de8","#d45d9e","#45b7a0"][i]} strokeWidth="2.5" strokeLinecap="round"/>
                {[[10,5],[25,8],[40,6]].map(([cx,cy],j) => (<circle key={j} cx={cx} cy={cy} r="2.5" fill={["#e85d75","#e8a84c","#4cb8e8","#8b5de8","#d45d9e","#45b7a0"][i]} opacity="0.8"/>))}
              </svg>
            </motion.div>
          ))}

          {/* Anemones */}
          {[13,45,72].map((x, i) => (
            <div key={`an${i}`} className="absolute bottom-0" style={{ left: `${x}%` }}>
              <svg width="30" height="28" viewBox="0 0 30 28">
                <ellipse cx="15" cy="26" rx="8" ry="2.5" fill={["#e85d75","#5de8a8","#e8a84c"][i]} opacity="0.3"/>
                {[...Array(7)].map((_, j) => {
                  const angle = (j/7)*Math.PI; const tx = 15+Math.cos(angle)*9; const ty = 26-Math.sin(angle)*19;
                  return (<motion.path key={j} d={`M15 24 Q${13+j} ${20-j*0.5} ${tx} ${ty}`} fill="none" stroke={["#e85d75","#5de8a8","#e8a84c"][i]} strokeWidth="1.5" strokeLinecap="round" opacity="0.55"
                    animate={{ d: [`M15 24 Q${13+j} ${20-j*0.5} ${tx} ${ty}`,`M15 24 Q${14+j} ${18-j*0.5} ${tx+2} ${ty-1}`,`M15 24 Q${13+j} ${20-j*0.5} ${tx} ${ty}`] }}
                    transition={{ duration: 2+j*0.2, repeat: Infinity, ease: "easeInOut" }}/>);
                })}
              </svg>
            </div>
          ))}

          {/* Sea grass clusters */}
          {[4,24,40,58,85,96].map((x, i) => (
            <div key={`sg${i}`} className="absolute bottom-0" style={{ left: `${x}%` }}>
              {[...Array(5)].map((_, j) => (
                <motion.div key={j} className="absolute bottom-0"
                  style={{ left: `${j*4-8}px`, width: "2.5px", height: `${28+j*10}px`,
                    background: `linear-gradient(to top, #4a9e5c, #4a9e5c50, transparent)`, borderRadius: "1.5px", transformOrigin: "bottom center" }}
                  animate={{ rotate: [-7-j*2, 7+j*2, -7-j*2] }}
                  transition={{ duration: 2.5+j*0.4, repeat: Infinity, ease: "easeInOut" }}/>
              ))}
            </div>
          ))}
        </div>

        {/* Zone labels */}
        {[{ label: "Euphotic", color: "#4ECDC4", top: "11%" },{ label: "Dysphotic", color: "#6C5CE7", top: "42%" },{ label: "Aphotic", color: "#FD79A8", top: "68%" }].map(z => (
          <div key={z.label} className="absolute left-3 z-30 pointer-events-none" style={{ top: z.top }}>
            <div className="bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/5">
              <span className="text-[9px] font-semibold uppercase tracking-wider" style={{ color: z.color }}>{z.label} Zone</span>
            </div>
          </div>
        ))}
        <div className="absolute left-0 right-0 pointer-events-none" style={{ top: "36%" }}><div className="h-px bg-gradient-to-r from-transparent via-[#6C5CE7]/12 to-transparent"/></div>
        <div className="absolute left-0 right-0 pointer-events-none" style={{ top: "62%" }}><div className="h-px bg-gradient-to-r from-transparent via-[#FD79A8]/8 to-transparent"/></div>

        {/* Ink */}
        {renderInk.map(p => (<div key={p.id} className="absolute rounded-full pointer-events-none z-[5]" style={{ left: p.x-p.size/2, top: p.y-p.size/2, width: p.size, height: p.size, background: `radial-gradient(circle, rgba(30,10,30,${p.opacity*0.7}), rgba(20,5,20,${p.opacity*0.3}))`, filter: `blur(${p.size*0.15}px)` }}/>))}
        {/* Dust */}
        {renderDust.map(p => (<div key={p.id} className="absolute rounded-full pointer-events-none z-[5]" style={{ left: p.x-p.size/2, top: p.y-p.size/2, width: p.size, height: p.size, background: `radial-gradient(circle, rgba(60,50,35,${p.opacity*0.5}), transparent)`, filter: `blur(${p.size*0.2}px)` }}/>))}

        {/* FISH */}
        {renderFish.map(fish => (
          <div key={fish.id} className="absolute z-10" style={{ left: fish.x-fish.size/2, top: fish.y-fish.size*0.3 }}
            onMouseEnter={(e) => setTooltip({ name: fish.name, zone: fish.zone, x: e.clientX, y: e.clientY })}
            onMouseLeave={() => setTooltip(null)}>
            <FishRenderer color={fish.color} accent={fish.accent} size={fish.size} facingRight={fish.vx>=0} glow={fish.glow} phase={phase} shape={fish.shape}/>
          </div>
        ))}

        {/* Food */}
        {renderFood.map(f => (<div key={f.id} className="absolute rounded-full z-20 pointer-events-none" style={{ left: f.x-f.size/2, top: f.y-f.size/2, width: f.size, height: f.size, backgroundColor: f.color, boxShadow: `0 0 4px ${f.color}60` }}/>))}

        {/* Tooltip */}
        <AnimatePresence>
          {tooltip && (
            <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="fixed z-50 pointer-events-none" style={{ left: tooltip.x+14, top: tooltip.y-10 }}>
              <div className="bg-black/90 backdrop-blur-md px-4 py-2 rounded-lg border border-white/15 shadow-lg">
                <p className="text-white font-semibold text-xs">{tooltip.name}</p>
                <p className="text-xs font-medium" style={{ color: zoneColor(tooltip.zone) }}>{tooltip.zone} Zone</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Title */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="absolute top-24 left-1/2 -translate-x-1/2 z-30 text-center pointer-events-none">
          <h1 className="text-3xl md:text-5xl font-display font-bold text-white/60 text-shadow-lg">Ocean Aquarium</h1>
          <p className="text-white/30 text-xs mt-1">{mode === "watch" ? "Hover on fish \u00B7 Move cursor near them" : "Click to drop food"}</p>
        </motion.div>

        {/* Mode buttons — FIXED: white bg + dark text when selected */}
        <div className="absolute top-24 right-4 z-40 flex flex-col gap-2">
          {[{ id: "watch", label: "Watch" }, { id: "feed", label: "Feed" }].map(m => (
            <button key={m.id}
              onClick={(e) => { e.stopPropagation(); setMode(m.id); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer backdrop-blur-md ${
                mode === m.id
                  ? "bg-white text-deep-900 border-white/60"
                  : "bg-black/40 border-white/10 text-white/50 hover:text-white/80 hover:border-white/25"
              }`}>
              {m.label}
            </button>
          ))}
        </div>

        {/* Food selector — FIXED button styling */}
        <AnimatePresence>
          {mode === "feed" && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
              className="absolute top-44 right-4 z-40 flex flex-col gap-1.5">
              {FOODS.map(f => (
                <button key={f.id}
                  onClick={(e) => { e.stopPropagation(); setSelFood(f); }}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold border cursor-pointer backdrop-blur-md transition-all ${
                    selFood.id === f.id ? "bg-white text-deep-900 border-white/60" : "bg-black/40 border-white/10 text-white/50 hover:text-white/70"
                  }`}>
                  <span className="inline-block w-2.5 h-2.5 rounded-full mr-1.5 align-middle" style={{ backgroundColor: f.color }}/>{f.name}
                </button>
              ))}
              {eatCount > 0 && <p className="text-white/30 text-[10px] text-center mt-1">{eatCount} eaten</p>}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom links */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          <Link href="/explore" className="text-white/30 hover:text-white/60 text-[10px] bg-black/30 backdrop-blur-sm border border-white/5 hover:border-white/15 rounded-full px-3 py-1.5 no-underline transition-all">Explore Zones</Link>
          <Link href="/game" className="text-white/30 hover:text-white/60 text-[10px] bg-black/30 backdrop-blur-sm border border-white/5 hover:border-white/15 rounded-full px-3 py-1.5 no-underline transition-all">More Games</Link>
        </div>
      </div>
    </>
  );
}

AquariumPage.getLayout = function getLayout(page) { return <RootLayout>{page}</RootLayout>; };
