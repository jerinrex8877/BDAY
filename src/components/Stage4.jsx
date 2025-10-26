// src/components/Stage4.jsx
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Stage4.css";

const Stage4 = ({ setMusicPaused }) => {
  const [videoEnded, setVideoEnded] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showGrandMessage, setShowGrandMessage] = useState(false);
  const [showFunnyPopup, setShowFunnyPopup] = useState(false);

  const videoRef = useRef(null);
  const wishesRef = useRef(null);

  const handleVideoPlay = () => setMusicPaused(true);
  const handleVideoPause = () => setMusicPaused(false);

  const handleVideoEnd = () => {
    setVideoEnded(true);
    setShowConfetti(true);
    setMusicPaused(false);
    setTimeout(() => setShowGrandMessage(true), 1000);
  };

  const handleContinue = () => {
    setShowGrandMessage(false);
    setTimeout(() => {
      wishesRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  // Show funny popup 10s after wishes card opens
  useEffect(() => {
    let timer;
    if (videoEnded) {
      timer = setTimeout(() => setShowFunnyPopup(true), 10000);
    }
    return () => clearTimeout(timer);
  }, [videoEnded]);

  const confettiColors = ["#ff9ac7", "#fdb4db", "#ffe38b", "#fff", "#ffb3d9"];
  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 3,
    color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
  }));

  const HEARTS = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    side: i % 2 === 0 ? "left" : "right",
    top: `${Math.random() * 80 + 5}%`,
    delay: Math.random() * 3,
  }));

  // Random corner position for popup
  const popupPositions = [
    { top: "10px", left: "10px" },
    { top: "10px", right: "10px" },
  ];
  const randomPosition = popupPositions[Math.floor(Math.random() * popupPositions.length)];

  return (
    <div className="stage4-container">
      {/* Floating Hearts at sides */}
      {HEARTS.map((h) => (
        <motion.div
          key={h.id}
          className={`floating-heart ${h.side}`}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: [0, -30, 0], opacity: [0.6, 1, 0.6] }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: h.delay,
          }}
          style={{ top: h.top }}
        >
          🤍
        </motion.div>
      ))}

      {/* Confetti */}
      {showConfetti && (
        <div className="confetti-container">
          {confettiPieces.map((piece) => (
            <div
              key={piece.id}
              className="confetti"
              style={{
                left: `${piece.left}%`,
                animationDelay: `${piece.delay}s`,
                backgroundColor: piece.color,
              }}
            />
          ))}
        </div>
      )}

      {/* Grand Message */}
      <AnimatePresence>
        {showGrandMessage && (
          <motion.div
            className="grand-message-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="grand-message"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
            >
              <motion.h1
                className="grand-text"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                HAPPY BIRTHDAY
              </motion.h1>
              <motion.h2
                className="grand-subtext"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
              >
                TO MY KUYILU 🎂💕
              </motion.h2>
              <motion.div
                className="sparkles-ring"
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                ✨
              </motion.div>
              <motion.button
                className="close-message-btn"
                onClick={handleContinue}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
              >
                Continue ❤️
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Title */}
      <motion.h1
        className="final-title"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        🎂 This is for u my thanga mailu! ❤️
      </motion.h1>

      {/* Video */}
      <motion.div
        className="video-wrapper"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <div className="video-frame">
          <video
            ref={videoRef}
            className="birthday-video"
            controls
            onPlay={handleVideoPlay}
            onPause={handleVideoPause}
            onEnded={handleVideoEnd}
          >
            <source src="/assets/video/samp1.mp4" type="video/mp4" />
          </video>
        </div>
      </motion.div>

      {/* Wishes Section */}
      {videoEnded && (
        <motion.div
          ref={wishesRef}
          className="wishes-section"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="wishes-card">
            <h2 className="wishes-title">My Wishes For You 💝</h2>
            <div className="wishes-content">
              <p>May this year bring you endless joy, laughter, and love 🌟</p>
              <p>May all your dreams come true, my thanga kuty 💫</p>
              <p>May we create countless more beautiful memories together 💕</p>
              <p>May you always smile as bright as you make me smile 😊</p>
              <p>May our love grow stronger with each passing day 💗</p>
              <p>Daily yenuku muthoo kudri chella kuty 💗😅</p>
            </div>
            <div className="final-message">
              <h3>Forever Yours,</h3>
              <p className="signature">Your Husband 💋</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Funny Popup */}
      {showFunnyPopup && (
        <motion.div
          className="funny-popup"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 10 }}
          style={{
            position: "fixed",
            zIndex: 999,
            backgroundColor: "#ffeb3b",
            padding: "10px 15px",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            ...randomPosition,
          }}
        >
          seekro vadi wait pantu iruka 😎
        </motion.div>
      )}

      {/* Balloons */}
      <div className="balloons">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="balloon"
            style={{ left: `${i * 18}%`, animationDelay: `${i * 0.3}s` }}
          >
            🎈
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stage4;
