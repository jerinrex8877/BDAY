// src/components/Stage2.jsx
import React, { useEffect, useState, useRef } from "react";
import "./Stage2.css";
import { useNavigate } from "react-router-dom";

const HEARTS = [
  { top: "15%", left: "22%", delay: 0.7 },
  { top: "28%", left: "70%", delay: 1.2 },
  { top: "40%", left: "40%", delay: 1.6 },
  { top: "55%", left: "60%", delay: 2.1 },
  { top: "65%", left: "25%", delay: 2.8 },
  { top: "75%", left: "75%", delay: 3.3 },
  { top: "85%", left: "50%", delay: 3.8 },
];

const letterMessage = `
Yen azhagu mailuku 👸🏻 pirantha naal vazhtukal 🥳💓
Na pala murai unta polambiruka thango. Yenuku kastama irunthalo, down ah irunthalo, nee yosikama kastama iruntha panatha da soludiva, “un oruthi kaga yena kastam venalum padala” nu thonum 💏

Na ipo panra ellam yen amma appa kaga dhaan. Ipo intha paiya unukagavu yosika armichita, Aana una pathi yosicha pothu, “nee iruka nu ”  oru nimmadhi varum 💫
Na love panra yenukaga oruthi iruka nu yosicha pothu, athu oru mari feel ah iruku 💐💑

Na yevlo nal irupano, avlo nalu una pathukanu. Una konjanu, un madila paduthu azhuvunum, santhosama irukanum 💞
Sanda podu, thitu, adi — ana kadasi vara yenkooda iru 💋✨

Nee santhosama iru thango, unuku yethuna venumna odi va, un kanavan na iruka 😩🫂💓
Unuku naa 💗 yenuku nee 💗 vitukudama irupom thanga mayiluu 💋💋

– Kuyilu Purushan
`;

function useTypewriter(text, delay, show) {
  const [output, setOutput] = useState("");
  const containerRef = useRef(null);

  useEffect(() => {
    if (!show) {
      setOutput("");
      return;
    }

    let index = 0;
    let cancelled = false;

    const type = () => {
      if (cancelled) return;
      setOutput((prev) => {
        const nextText = text.slice(0, index + 1);
        setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
          }
        }, 10);
        return nextText;
      });

      if (index < text.length - 1) {
        index++;
        setTimeout(type, delay);
      }
    };

    type();
    return () => {
      cancelled = true;
    };
  }, [show, text, delay]);

  return { output, containerRef };
}

const Stage2 = () => {
  const [showLetter, setShowLetter] = useState(false);
  const [finished, setFinished] = useState(false);
  const { output, containerRef } = useTypewriter(letterMessage, 200, showLetter);
  const navigate = useNavigate();

  useEffect(() => {
    if (showLetter && output === letterMessage) setFinished(true);
    else setFinished(false);
  }, [output, showLetter]);

  return (
    <div className="stage2-container">
      {/* Floating Hearts Background (non-interactive & behind) */}
      <div className="hearts-bg">
        {HEARTS.map((pos, i) => (
          <div
            key={i}
            className="heart"
            style={{
              top: pos.top,
              left: pos.left,
              animationDelay: `${pos.delay}s`,
            }}
          >
            💗
          </div>
        ))}
      </div>

      <div className="top-bar" onClick={() => setShowLetter(true)}>
        To my thanga kuty 💌
      </div>

      {showLetter ? (
        <div className="letter-paper" ref={containerRef}>
          <span className="letter-text">{output}</span>
        </div>
      ) : (
        <div className="note-message">
          This letter will be revealed slowly in my own words... enjoy each line
          as it appears ✨ click the above letter to begin.
        </div>
      )}

      {finished && (
        <button className="next-button" onClick={() => navigate("/stage3")}>
          shall we see memorable glimpse 💖
        </button>
      )}
    </div>
  );
};

export default Stage2;
