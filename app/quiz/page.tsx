'use client';

import React, { useState } from "react";

// Fermah Brand Colors
const C = {
  bg: "#001A2C",
  card: "#06243A",
  accent: "#1CCB9F",
  silver: "#F9FAFB",
  dim: "#94A3B8",
  white: "#FFFFFF",
  ok: "#1CCB9F", // Fermah Teal for correct
  err: "#EF4444",
  warn: "#F59E0B",
  gold: "#FFD700",
};

const LEVELS = [
  { name: "Initiate", color: C.ok, desc: "Marketplace & Core Concepts" },
  { name: "Operator", color: C.warn, desc: "Tooling & Security" },
  { name: "Architect", color: C.err, desc: "Deep Tech & Ecosystem" },
];

const ALL_QUESTIONS = [
  // LEVEL 0: Initiate (Marketplace & Core)
  [
    { q: "Who requests zero-knowledge proof generation in the Fermah market?", opts: ["Seeker", "Operator", "Matchmaker", "Orchestrator"], ans: 0, exp: "Seekers are the demand side of the market." },
    { q: "What role provides computational hardware to generate proofs?", opts: ["Seeker", "Operator", "Prover Node", "zkVM"], ans: 1, exp: "Operators supply the hardware in exchange for rewards." },
    { q: "What connects Seekers with optimal Operators?", opts: ["Orchestrator", "ZK Bazaar", "Matchmaker", "Coprocessor"], ans: 2, exp: "Matchmakers route requests based on price and hardware." },
    { q: "What is the open marketplace where ZK proofs are traded called?", opts: ["The Echo", "ZK Bazaar", "The Grid", "Fermah Market"], ans: 1, exp: "The ZK Bazaar is the decentralized proof marketplace." },
    { q: "What does ZKP stand for?", opts: ["Zero-Knowledge Proof", "Zero-Key Protocol", "Zipped-Knowledge Process", "Zone-Key Proof"], ans: 0, exp: "A cryptographic method to prove a statement without revealing data." },
    { q: "What metric measures the time elapsed from proof request to verified delivery?", opts: ["SLA", "Timeout Setting", "Latency", "Resource Utilization"], ans: 2, exp: "Latency tracks the end-to-end speed of delivery." },
    { q: "What does SLA stand for in the context of Operator guarantees?", opts: ["Service Level Agreement", "System Latency Average", "Secure Layer Architecture", "Standard Logic Array"], ans: 0, exp: "SLA represents the guaranteed performance metrics." },
    { q: "What is the dedicated machine running Fermah operator software called?", opts: ["Validator", "Seeker", "Prover Node", "Orchestrator"], ans: 2, exp: "Prover Nodes are the high-performance machines computing proofs." },
    { q: "What coordinates the workflow between Seekers, Matchmakers, and Operators?", opts: ["zkVM", "Orchestrator", "Matchmaker RPC", "Coprocessor"], ans: 1, exp: "The Orchestrator manages the end-to-end workflow." },
    { q: "What limits the maximum allowed time for an Operator to generate a proof?", opts: ["Commitment Period", "Latency", "SLA", "Timeout Setting"], ans: 3, exp: "If the timeout is hit, the request is reassigned." }
  ],
  // LEVEL 1: Operator (Tooling & Security)
  [
    { q: "What does PoG stand for in the Fermah ecosystem?", opts: ["Proof of Generation", "Proof of Game", "Protocol of Governance", "Proof of Grid"], ans: 0, exp: "PoG ensures computation was actually performed." },
    { q: "What executes programs and outputs a cryptographic proof of correct execution?", opts: ["Arithmetic Circuit", "zkVM", "Coprocessor", "Universal API"], ans: 1, exp: "zkVM stands for Zero-Knowledge Virtual Machine." },
    { q: "SNARK and STARK are examples of what?", opts: ["Matchmakers", "Proof Systems", "Hardware Accelerators", "Escrows"], ans: 1, exp: "They are the underlying cryptographic protocols used." },
    { q: "GPUs and FPGAs are used for what purpose in proof generation?", opts: ["Matchmaking", "Hardware Acceleration", "Staking", "Escrow"], ans: 1, exp: "They drastically speed up heavy computations." },
    { q: "What holds a Seeker's funds securely until the proof is verified?", opts: ["Operator Wallet", "Matchmaker RPC", "Smart Contract Escrow", "ZK Bazaar"], ans: 2, exp: "Escrows ensure trustless transactions." },
    { q: "What is the timeframe during which an Operator locks in their guarantee?", opts: ["Timeout Setting", "Latency", "SLA", "Commitment Period"], ans: 3, exp: "Operators must deliver within this committed window." },
    { q: "What is the gas fee required to check the authenticity of a generated proof?", opts: ["Operator Reward", "Verification Cost", "Escrow Fee", "Matching Fee"], ans: 1, exp: "Verification costs can be on-chain or off-chain." },
    { q: "How are proof generation environments packaged for isolated execution?", opts: ["Virtual Machines", "Dockerized Proof Systems", "Smart Contracts", "Orchestrators"], ans: 1, exp: "Docker ensures predictable and scalable execution." },
    { q: "What endpoint do Seekers use to submit proof requests directly to the network?", opts: ["Universal API", "Matchmaker RPC", "REST API", "GraphQL"], ans: 1, exp: "The RPC endpoint connects demand to the infrastructure." },
    { q: "What is the live testing phase where early participants are rewarded?", opts: ["Mainnet", "Devnet", "Incentivized Testnet", "ZK Bazaar"], ans: 2, exp: "Used for stressing the network and finding bugs." }
  ],
  // LEVEL 2: Architect (Deep Tech)
  [
    { q: "What enables generating proofs for Halo2, Plonk, and Groth16 through a single layer?", opts: ["zkVM", "Universal Proof Generation", "Matchmaker RPC", "Arithmetic Circuit"], ans: 1, exp: "It unifies various zero-knowledge systems." },
    { q: "What generates proofs without revealing sensitive data to the Operator?", opts: ["Asynchronous Compute", "Confidential Proving", "PoG", "Credible Neutrality"], ans: 1, exp: "Ensures privacy while outsourcing compute." },
    { q: "What allows requesting a proof without blocking the main application thread?", opts: ["Asynchronous Compute", "Parallel Processing", "Synchronous RPC", "Coprocessing"], ans: 0, exp: "Prevents applications from freezing while waiting." },
    { q: "What is a low-level mathematical representation of a computation for ZK systems?", opts: ["Proof System", "Arithmetic Circuit", "zkVM", "Docker Container"], ans: 1, exp: "It formats logic to be processed by proof systems." },
    { q: "What clean programming interface allows developers to interact with multiple proof systems?", opts: ["Matchmaker RPC", "GraphQL", "Universal API", "Web3.js"], ans: 2, exp: "It abstracts the complexity of different systems." },
    { q: "What metric measures how efficiently an Operator's hardware is used?", opts: ["SLA", "Latency", "Resource Utilization", "Verification Cost"], ans: 2, exp: "Tracks CPU/GPU/RAM efficiency during cycles." },
    { q: "What principle ensures the protocol doesn't unfairly advantage any participant?", opts: ["Programmable Execution", "Modular Compatibility", "Credible Neutrality", "PoG"], ans: 2, exp: "A core system design principle for fairness." },
    { q: "What allows Fermah to plug into various rollups and L1 blockchains?", opts: ["Universal API", "Modular Compatibility", "Coprocessor", "ZK Bazaar"], ans: 1, exp: "Ensures the network can support the broader ecosystem." },
    { q: "What allows defining complex logic for how and when proofs are generated?", opts: ["Smart Contract Escrow", "Programmable Execution", "Orchestrator", "Matchmaker"], ans: 1, exp: "Automated smart contract logic for proofs." },
    { q: "What off-chain infrastructure handles heavy computations for smart contracts?", opts: ["Coprocessor", "zkVM", "Prover Node", "Operator"], ans: 0, exp: "It returns only the verified, lightweight result to the chain." }
  ]
];

const TITLES = [
  ["Fermah Novice", "Curious Seeker", "Ecosystem Explorer"],
  ["Node Operator", "Protocol Builder", "ZK Enthusiast"],
  ["Proof Master", "ZK Architect", "Fermah Visionary"],
];

function getTitle(level: number, score: number) {
  return TITLES[level][Math.min(Math.floor((score / 10) * 3), 2)];
}

function shareOnX(lv: number, sc: number) {
  const title = getTitle(lv, sc);
  const lvName = LEVELS[lv].name;
  
  // Wordle style boxes
  let boxes = "";
  for(let i=0; i<10; i++) {
    boxes += i < sc ? "🟩" : "🟥";
  }

  const text = `I just scored ${sc}/10 on the Fermah Lexicon Quiz ⚡️\n\nRank: ${title}\nLevel: ${lvName}\n\n${boxes}\n\nTest your ZK knowledge:`;
  window.open("https://twitter.com/intent/tweet?text=" + encodeURIComponent(text), "_blank");
}

export default function FermahQuiz() {
  const [st, setSt] = useState<any>({
    screen: "home",
    level: 0,
    unlocked: [0],
    scores: {},
    qi: 0,
    selected: null,
    corrects: 0,
    showExp: false
  });

  function update(patch: any) {
    setSt((prev: any) => ({ ...prev, ...patch }));
  }

  function startQuiz(lv: number) {
    update({ screen: "quiz", level: lv, qi: 0, selected: null, corrects: 0, showExp: false });
  }

  function pick(idx: number) {
    if (st.selected !== null) return;
    const q = ALL_QUESTIONS[st.level][st.qi];
    const ok = idx === q.ans;
    update({ selected: idx, corrects: ok ? st.corrects + 1 : st.corrects, showExp: true });
  }

  function nextQ() {
    if (st.qi < 9) {
      update({ qi: st.qi + 1, selected: null, showExp: false });
    } else {
      const newScores = { ...st.scores, [st.level]: st.corrects };
      if (st.corrects >= 7) {
        const newUnlocked = st.unlocked.includes(st.level + 1) ? st.unlocked : [...st.unlocked, st.level + 1];
        update({ screen: st.level < 2 ? "pass" : "complete", scores: newScores, unlocked: newUnlocked });
      } else {
        update({ screen: "fail", scores: newScores });
      }
    }
  }

  const sc = st.scores[st.level] !== undefined ? st.scores[st.level] : st.corrects;

  // -------------------------------------------------------------------------------- //
  // HOME SCREEN
  // -------------------------------------------------------------------------------- //
  if (st.screen === "home") {
    return (
      <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "sans-serif", padding: "40px 20px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative", zIndex: 10 }}>
          
          {/* Fermah Pi Logo in SVG */}
          <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: 20 }}>
            <rect width="100" height="100" rx="20" fill={C.card} />
            <rect x="15" y="25" width="70" height="15" rx="2" fill={C.accent}/>
            <rect x="25" y="40" width="15" height="35" rx="1" fill={C.accent}/>
            <rect x="60" y="40" width="15" height="35" rx="1" fill={C.accent}/>
          </svg>

          <div style={{ fontSize: 12, letterSpacing: 4, color: C.accent, fontWeight: 700, textTransform: "uppercase", marginBottom: 8 }}>Ecosystem Gauntlet</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: C.white, textAlign: "center", margin: "0 0 16px 0", letterSpacing: "-1px" }}>Fermah Quiz</h1>
          <p style={{ fontSize: 16, color: C.dim, textAlign: "center", marginBottom: 48, maxWidth: 320, lineHeight: 1.5 }}>Prove your knowledge of ZK infrastructure and proof markets.</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%", maxWidth: 360 }}>
            {LEVELS.map((lv, i) => {
              const isUnlocked = st.unlocked.includes(i);
              const lvSc = st.scores[i];
              const passed = lvSc >= 7;
              return (
                <div key={i} style={{ background: C.card, border: `1px solid ${isUnlocked ? lv.color : 'rgba(148,163,184,0.1)'}`, borderRadius: 20, padding: 20, opacity: isUnlocked ? 1 : 0.5 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: isUnlocked ? lv.color : C.dim }}>Phase {i + 1}: {lv.name}</div>
                    {!isUnlocked && <span style={{ fontSize: 12, color: C.dim, background: "rgba(0,0,0,0.2)", padding: "4px 10px", borderRadius: 12 }}>Locked</span>}
                    {lvSc !== undefined && (
                      <div style={{ fontSize: 12, fontWeight: 700, color: passed ? C.ok : C.err, background: passed ? "rgba(28,203,159,0.1)" : "rgba(239,68,68,0.1)", padding: "4px 10px", borderRadius: 12 }}>
                        {lvSc}/10 {passed ? "Passed" : "Failed"}
                      </div>
                    )}
                  </div>
                  <div style={{ fontSize: 14, color: C.dim, marginBottom: 16 }}>{lv.desc}</div>
                  <button 
                    onClick={() => { if (isUnlocked) startQuiz(i); }} 
                    style={{ width: "100%", padding: "12px", borderRadius: 12, border: "none", background: isUnlocked ? "rgba(255,255,255,0.05)" : "transparent", color: isUnlocked ? C.white : C.dim, fontWeight: 700, cursor: isUnlocked ? "pointer" : "not-allowed", transition: "all 0.2s" }}>
                    {lvSc !== undefined ? "Retry Phase" : (!isUnlocked ? "Locked" : "Start Phase")}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------------- //
  // QUIZ SCREEN
  // -------------------------------------------------------------------------------- //
  if (st.screen === "quiz") {
    const q = ALL_QUESTIONS[st.level][st.qi];
    const lc = LEVELS[st.level].color;

    return (
      <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "sans-serif" }}>
        <div style={{ maxWidth: 560, margin: "0 auto", padding: "20px 16px 48px" }}>
          
          {/* Top Nav */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
            <button onClick={() => update({ screen: "home" })} style={{ background: "transparent", border: "none", color: C.dim, fontSize: 14, cursor: "pointer", fontWeight: 600 }}>← Exit</button>
            <div style={{ padding: "6px 16px", borderRadius: 20, fontSize: 12, fontWeight: 800, background: `${lc}15`, color: lc, textTransform: "uppercase", letterSpacing: 1 }}>{LEVELS[st.level].name}</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: C.white }}>{st.corrects} <span style={{ color: C.dim }}>/ 10</span></div>
          </div>

          {/* Progress Bar */}
          <div style={{ height: 6, background: C.card, borderRadius: 3, marginBottom: 12, overflow: "hidden" }}>
            <div style={{ height: "100%", width: ((st.qi) / 10 * 100) + "%", background: lc, transition: "width 0.3s ease" }}></div>
          </div>
          <div style={{ fontSize: 12, color: C.dim, textAlign: "right", fontWeight: 600, marginBottom: 32 }}>Question {st.qi + 1} of 10</div>

          {/* Question Box */}
          <div style={{ fontSize: 22, color: C.white, fontWeight: 700, lineHeight: 1.4, marginBottom: 32 }}>{q.q}</div>

          {/* Options */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {q.opts.map((opt, i) => {
              const isSelected = st.selected === i;
              const isCorrect = i === q.ans;
              
              let bg = C.card;
              let bc = "transparent";
              let tc = C.silver;
              
              if (st.selected !== null) {
                if (isCorrect) { bg = "rgba(28,203,159,0.1)"; bc = C.ok; tc = C.ok; }
                else if (isSelected) { bg = "rgba(239,68,68,0.1)"; bc = C.err; tc = C.err; }
                else { opacity: 0.5 } // Dim others
              }

              return (
                <button 
                  key={i} 
                  onClick={() => pick(i)} 
                  style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", borderRadius: 16, background: bg, border: `1.5px solid ${bc}`, color: tc, fontSize: 16, textAlign: "left", cursor: st.selected === null ? "pointer" : "default", transition: "all 0.2s" }}>
                  <span style={{ minWidth: 32, height: 32, borderRadius: 8, background: st.selected === null ? "rgba(255,255,255,0.05)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: st.selected === null ? C.dim : tc }}>
                    {["A", "B", "C", "D"][i]}
                  </span>
                  <span style={{ flex: 1, fontWeight: 600 }}>{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Next Button & Explanation */}
          {st.selected !== null && (
            <div style={{ marginTop: 32, animation: "fadeIn 0.3s" }}>
              {st.showExp && (
                <div style={{ background: "rgba(255,255,255,0.03)", borderLeft: `4px solid ${lc}`, padding: "16px 20px", borderRadius: "0 12px 12px 0", color: C.silver, fontSize: 14, lineHeight: 1.5, marginBottom: 24, fontWeight: 500 }}>
                  {q.exp}
                </div>
              )}
              <button 
                onClick={nextQ} 
                style={{ width: "100%", padding: "16px", borderRadius: 16, background: C.white, color: C.bg, fontSize: 16, fontWeight: 800, border: "none", cursor: "pointer" }}>
                {st.qi < 9 ? "Next Question" : "View Results"}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------------- //
  // RESULT SCREENS Wrapper
  // -------------------------------------------------------------------------------- //
  const ResultScreen = ({ title, color, children }: any) => (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: "sans-serif" }}>
      <div style={{ background: C.card, borderRadius: 32, padding: "48px 32px", width: "100%", maxWidth: 400, textAlign: "center", border: `1px solid ${color}30` }}>
        {children}
      </div>
    </div>
  );

  // FAIL SCREEN
  if (st.screen === "fail") {
    return (
      <ResultScreen color={C.err}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>💀</div>
        <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: 2, color: C.err, textTransform: "uppercase", marginBottom: 16 }}>Mission Failed</div>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 4, marginBottom: 16 }}>
          <span style={{ fontSize: 72, fontWeight: 800, color: C.white }}>{sc}</span>
          <span style={{ fontSize: 24, color: C.dim }}>/ 10</span>
        </div>
        <div style={{ fontSize: 15, color: C.dim, lineHeight: 1.5, marginBottom: 32 }}>You need at least <span style={{ color: C.white, fontWeight: 700 }}>7/10</span> to unlock the next phase. Back to the Lexicon for you.</div>
        <button onClick={() => startQuiz(st.level)} style={{ width: "100%", padding: "16px", borderRadius: 16, background: C.white, color: C.bg, fontSize: 16, fontWeight: 800, border: "none", cursor: "pointer", marginBottom: 12 }}>Try Again</button>
        <button onClick={() => update({ screen: "home" })} style={{ width: "100%", padding: "16px", borderRadius: 16, background: "transparent", color: C.dim, fontSize: 16, fontWeight: 700, border: "none", cursor: "pointer" }}>Return Home</button>
      </ResultScreen>
    );
  }

  // PASS SCREEN
  if (st.screen === "pass") {
    const nextLv = st.level + 1;
    return (
      <ResultScreen color={C.ok}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>⚡️</div>
        <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: 2, color: C.ok, textTransform: "uppercase", marginBottom: 16 }}>Phase Cleared</div>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 4, marginBottom: 16 }}>
          <span style={{ fontSize: 72, fontWeight: 800, color: C.white }}>{sc}</span>
          <span style={{ fontSize: 24, color: C.dim }}>/ 10</span>
        </div>
        <div style={{ fontSize: 18, fontWeight: 800, color: C.gold, marginBottom: 8 }}>{getTitle(st.level, sc)}</div>
        <div style={{ fontSize: 14, color: C.dim, lineHeight: 1.5, marginBottom: 32 }}>You have conquered the Fermah gauntlet. Your knowledge is absolute.</div>
        
        <button onClick={() => shareOnX(2, sc)} style={{ width: "100%", padding: "16px", borderRadius: 16, background: "#1DA1F2", color: C.white, fontSize: 16, fontWeight: 800, border: "none", cursor: "pointer", marginBottom: 12 }}>
          Share Final Rank on X
        </button>
        <button onClick={() => update({ screen: "home" })} style={{ width: "100%", padding: "16px", borderRadius: 16, background: "transparent", color: C.dim, fontSize: 16, fontWeight: 700, border: "none", cursor: "pointer" }}>Return Home</button>
      </ResultScreen>
    );
  }

  return null;
}
