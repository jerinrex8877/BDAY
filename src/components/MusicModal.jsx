// src/components/MusicModal.jsx
import React, { useState } from "react";

const musicUrl = "/assets/music/bday.mp3";
// Supply your file path, or use an online link

const MusicModal = ({ show, onYes, onNo }) => {
  const [playing, setPlaying] = useState(false);

  if (!show) return null;

  const handleYes = () => {
    setPlaying(true);
    onYes && onYes();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Do you want to enter my world with music?</h2>
        {playing ? (
          <div style={styles.musicSection}>
            <audio controls autoPlay loop style={styles.audio}>
              <source src={musicUrl} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
            <p style={styles.musicText}>Let’s start our journey with music! 🎶</p>
          </div>
        ) : (
          <div style={styles.buttons}>
            <button style={styles.button} onClick={handleYes}>
              Yes 🎵
            </button>
            <button style={styles.button} onClick={onNo}>
              No 🤍
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    background: "linear-gradient(120deg, #fff1fa 60%, #ffe3ea 100%)",
    padding: "2rem",
    borderRadius: "1rem",
    textAlign: "center",
    maxWidth: "400px",
    width: "90%",
    boxShadow: "0 2px 32px #fba, 0 0 16px #e08fbb50"
  },
  buttons: {
    marginTop: "1.5rem",
    display: "flex",
    justifyContent: "space-around",
  },
  button: {
    padding: "0.8rem 1.5rem",
    borderRadius: "0.5rem",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    background: "linear-gradient(90deg,#ffbdd1 70%,#e5b9ff 100%)",
    color: "#a04582",
    boxShadow: "0 2px 8px #ffe1ea70",
    fontSize: "1rem",
    transition: "transform 0.12s"
  },
  musicSection: {
    marginTop: "1.3rem"
  },
  audio: {
    width: "90%",
    outline: "none",
    borderRadius: "2pc",
    boxShadow: "0 0px 16px #f9b5e9cc"
  },
  musicText: {
    color: "#b46fa9",
    fontStyle: "italic",
    margin: ".7rem 0 0"
  }
};

export default MusicModal;
