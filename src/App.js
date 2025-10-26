// src/App.jsx
import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Stage1 from "./components/Stage1";
import Stage2 from "./components/Stage2";
import Stage3 from "./components/Stage3";
import Stage4 from "./components/Stage4";

function App() {
  const [musicOn, setMusicOn] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [musicPaused, setMusicPaused] = useState(false);
  const audioRef = useRef(null);

  const playlist = [
    "/assets/music/bday.mp3",
    "/assets/music/bday2.mp3"
  ];

  const handleSongEnd = () => {
    const nextTrack = (currentTrack + 1) % playlist.length;
    setCurrentTrack(nextTrack);
  };

  useEffect(() => {
    if (audioRef.current && musicOn) {
      audioRef.current.load();
      if (!musicPaused) {
        audioRef.current.play().catch((err) => {
          console.log("Playback error:", err);
        });
      }
    }
  }, [currentTrack, musicOn, musicPaused]);

  useEffect(() => {
    if (audioRef.current) {
      if (musicPaused) {
        audioRef.current.pause();
      } else if (musicOn) {
        audioRef.current.play().catch((err) => {
          console.log("Playback error:", err);
        });
      }
    }
  }, [musicPaused, musicOn]);

  return (
    <Router>
      {/* ✅ Audio outside Routes so it doesn't reset */}
      <audio
        ref={audioRef}
        onEnded={handleSongEnd}
        style={{ display: "none" }}
      >
        <source src={playlist[currentTrack]} type="audio/mpeg" />
      </audio>

      <Routes>
        <Route
          path="/"
          element={<Stage1 musicOn={musicOn} setMusicOn={setMusicOn} />}
        />
        <Route path="/stage2" element={<Stage2 />} />
        <Route path="/stage3" element={<Stage3 />} />
        <Route
          path="/stage4"
          element={<Stage4 setMusicPaused={setMusicPaused} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
