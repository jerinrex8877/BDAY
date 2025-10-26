// src/components/Stage3.jsx
// src/components/Stage3.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Stage3.css";
import { caption } from "framer-motion/client";

// Sample photo data - you'll replace with your actual photos
const memories = [
  {
   
    caption: "my pondati with my mamiyar ☕💕",
    image: "/assets/images/Kuyilu/p1.jpg"
  },
  {
    caption: "kasta pattu vanguna picss 🌅",
    image: "/assets/images/Kuyilu/p2.jpg"
  },
  {
   
    caption: "my new family 🌸",
    image: "/assets/images/Kuyilu/p3.jpg"
  },
  // Add 17 more photos here...
  {
    
    caption: "noodles mandaa 💗",
    image: "/assets/images/Kuyilu/p4.jpg"
  },
   {
    
    caption: "holding jonas for the first time 🎬",
    image: "/assets/images/kuyilu/p5.jpg"
  },
  {
    
    caption: "she admired jonas, i admired her 🎂",
    image: "/assets/images/kuyilu/p6.jpg"
  },
  {
    
    caption: "the first ever pic of u i seen ,stil my fav one 📸",
    image: "/assets/images/kuyilu/p7.jpg"
  },
  {
    
    caption: "our first pic together ✨",
    image: "/assets/images/kuyilu/p8.jpg"
  },
  {
    
    caption: "The moment my shoulders felt complete 💑",
    image: "/assets/images/kuyilu/p9.jpg"
  },
  {
    
    caption: "Kuyilu feeding kuyilu 🎉",
    image: "/assets/images/kuyilu/p10.jpg"
  },
  {
    
    caption: "admiring her again 🌺",
    image: "/assets/images/kuyilu/p11.jpg"
  },
  {
   
    caption: "watching around 🎆",
    image: "/assets/images/kuyilu/p12.jpg"
  },
  {

    caption: "first out ☀️",
    image: "/assets/images/kuyilu/p13.jpg"
  },
  {
    
    caption: "Finding treasures together 🛍️",
    image: "/assets/images/kuyilu/p14.jpg"
  },
  {
   
    caption: "our gang pic 🎵",
    image: "/assets/images/kuyilu/p15.jpg"
  },
  {
   
    caption: "jerin be like : kaiya podalama venaama💑",
    image: "/assets/images/kuyilu/p16.jpg"
  },
  {
    
    caption: "Lost in stories together 📚",
    image: "/assets/images/kuyilu/p17.jpg"
  },
  {
     caption: "memories at mall 📚",
    image: "/assets/images/kuyilu/p18.jpg"
  },
  {
    
    caption: "yen alu saree katitu vantha heroins la gaali da 💕🍦",
    image: "/assets/images/kuyilu/p19.jpg"
  },
  {
    
    caption: "Azhgaey poramai padum per azhagu 🎨💕",
    image: "/assets/images/kuyilu/p26.jpg"
  },
  {
    
    caption: "azhagu pullla👨‍👩‍👧‍👦",
    image: "/assets/images/kuyilu/p21.jpg"
  },
  {
    
    caption: "upcoming actress 🌧️💕",
    image: "/assets/images/kuyilu/p22.jpg"
  },
  {
   
    caption: "nee ipdi pose kuduka mata , naney kuduka vachita ⭐",
    image: "/assets/images/kuyilu/p29.jpg"
  },
  {
    
    caption: "bannu mari irukunga kannam 💕",
    image: "/assets/images/kuyilu/p24.jpg"
  },
  {
   
    caption: "iswarya rai<<<<<<my azhagi kuyilu 💑",
    image: "/assets/images/kuyilu/p25.jpg"
  },
  {
    caption: "Celebrating us 💑",
    image: "/assets/images/kuyilu/p20.jpg"
  }

];

const HEARTS = [
  { top: "15%", left: "22%", delay: 0.7 },
  { top: "28%", left: "70%", delay: 1.2 },
  { top: "47%", left: "38%", delay: 0.2 },
  { top: "20%", left: "80%", delay: 1.4 },
  { top: "60%", left: "25%", delay: 1.8 },
  { top: "75%", left: "52%", delay: 0.9 },
];

const Stage3 = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoScrolling || currentIndex >= memories.length) return;

    const timer = setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      
      // Scroll to next item
      if (containerRef.current) {
        const nextElement = containerRef.current.children[currentIndex + 1];
        if (nextElement) {
          nextElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }
      }
    }, 4000); // 4 seconds per photo

    return () => clearTimeout(timer);
  }, [currentIndex, isAutoScrolling]);

  const handleNext = () => {
    navigate("/stage4");
  };

  const toggleAutoScroll = () => {
    setIsAutoScrolling(!isAutoScrolling);
  };

  return (
    <div className="stage3-container">
      {/* Floating Hearts Background */}
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

      {/* Title */}
      <motion.h1
        className="gallery-title"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Our Beautiful Memories 💕
      </motion.h1>

      {/* Auto-scroll control */}
      <button className="auto-scroll-btn" onClick={toggleAutoScroll}>
        {isAutoScrolling ? "⏸️ Pause" : "▶️ Play"}
      </button>

      {/* Gift Box Gallery */}
      <div className="gallery-container" ref={containerRef}>
        {memories.map((memory, index) => (
          <motion.div
            key={index}
            className={`gift-box ${index <= currentIndex ? 'opened' : ''}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={
              index <= currentIndex
                ? { scale: 1, opacity: 1 }
                : { scale: 0.8, opacity: 0.3 }
            }
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Gift Box Lid */}
            <div className={`gift-lid ${index <= currentIndex ? 'open' : ''}`}>
              <div className="ribbon">🎀</div>
            </div>

            {/* Photo Content */}
            <div className="gift-content">
              <div className="photo-frame">
                <img src={memory.image} alt={memory.caption} />
              </div>
              <div className="memory-info">
                <div className="memory-date">{memory.date}</div>
                <div className="memory-place"> {memory.place}</div>
                <div className="memory-caption">{memory.caption}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Next Button - appears after all photos shown */}
      {currentIndex >= memories.length && (
        <motion.div
          className="gallery-end"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <h2>In those picture, how you laugh… I wish I could feel it every day. ✨</h2>
          <button className="next-btn" onClick={handleNext}>
            One more surprise awaits... 💝
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Stage3;