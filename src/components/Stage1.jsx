// src/components/Stage1.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MusicModal from "./MusicModal";
import "./Stage1.css";
import { motion, AnimatePresence } from "framer-motion";

const HEARTS = [
  { top: "15%", left: "22%", delay: 0.7 },
  { top: "28%", left: "70%", delay: 1.2 },
  { top: "47%", left: "38%", delay: 0.2 },
  { top: "20%", left: "80%", delay: 1.4 },
  { top: "60%", left: "25%", delay: 1.8 },
  { top: "75%", left: "52%", delay: 0.9 },
  { top: "17%", left: "35%", delay: 0.3 },
  { top: "48%", left: "67%", delay: 1.1 },
  { top: "58%", left: "12%", delay: 1.3 },
  { top: "70%", left: "75%", delay: 0.6 },
  { top: "24%", left: "54%", delay: 0.7 },
  { top: "37%", left: "18%", delay: 1.5 },
];

const SPARKLES = [
  { top: "8%", left: "16%" },
  { top: "13%", left: "82%" },
  { top: "37%", left: "49%" },
  { top: "68%", left: "28%" },
  { top: "57%", left: "76%" },
  { top: "22%", left: "35%" },
  { top: "65%", left: "61%" },
  { top: "38%", left: "19%" },
  { top: "49%", left: "87%" },
  { top: "72%", left: "17%" },
];

const Stage1 = ({ musicOn, setMusicOn }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(true);
  const [transitioning, setTransitioning] = useState(false);

  // 🗝️ New state for key
  const [hasKey, setHasKey] = useState(false);
  const [keyFound, setKeyFound] = useState(false);

  const handleYes = () => {
    setMusicOn(true);
    setShowModal(false);
  };

  const handleNo = () => {
    setMusicOn(false);
    setShowModal(false);
  };

  // Door click – only works if key is found
  const handleDoorClick = () => {
    if (!hasKey) return; // Prevent navigation
    setTransitioning(true);
    setTimeout(() => {
      navigate("/stage2");
    }, 1800);
  };

  // Handle finding the key
  const handleKeyClick = () => {
    setHasKey(true);
    setKeyFound(true);
    // Optional: play a small animation or sparkle when collected
  };

  return (
    <div className="stage1-container">
      <MusicModal show={showModal} onYes={handleYes} onNo={handleNo} />

      {/* Floating Hearts */}
      {HEARTS.map((pos, i) => (
        <div
          key={i}
          className={`heart heart-${i}`}
          style={{
            top: pos.top,
            left: pos.left,
            animationDelay: `${pos.delay}s`,
          }}
        >
          💗
        </div>
      ))}

      {/* Center Content */}
      <div className="stage1-content">
        <h1>Welcome to My Heart</h1>
        {musicOn && <p>Here is the doorway ✨.</p>}

        {/* 🎵 Keep your music logic */}
        {musicOn && (
          <>
            <audio
              src="/assets/music/bday.mp3"
              autoPlay
              loop
              style={{ display: "none" }}
            />

            {/* Door image — only clickable if key is found */}
            <motion.img
              src="/assets/images/door.png"
              alt="Doorway to Heaven"
              className={`heaven-door ${!hasKey ? "locked" : ""}`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              whileHover={{
                scale: 1.05,
                filter: "drop-shadow(0 0 15px #ffd6f7)",
              }}
              onClick={handleDoorClick}
            />

            {/* 🗝️ Hidden Key */}
            {!keyFound && (
              <motion.img
                src="/assets/images/key.png"
                alt="Hidden Key"
                className="hidden-key"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                onClick={handleKeyClick}
              />
            )}

            {/* Show message when key collected */}
            {keyFound && (
              <p className="key-message">You found the key! Now open the door 🔑</p>
            )}
          </>
        )}
      </div>

      {/* Sparkles */}
      {SPARKLES.map((pos, i) => (
        <div
          key={i}
          className={`sparkle sparkle-${i}`}
          style={{ top: pos.top, left: pos.left }}
        ></div>
      ))}

      {/* Paper Gate Transition */}
      <AnimatePresence>
        {transitioning && (
          <>
            <motion.div
              className="gate gate-left"
              initial={{ x: 0 }}
              animate={{ x: "-100%" }}
              exit={{ x: "-100%" }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            />
            <motion.div
              className="gate gate-right"
              initial={{ x: 0 }}
              animate={{ x: "100%" }}
              exit={{ x: "100%" }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Stage1;
