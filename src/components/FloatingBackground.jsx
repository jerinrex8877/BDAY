import React from "react";
import Particles from "react-tsparticles";

const FloatingBackground = () => {
  return (
    <div style={{ position: "absolute", width: "100%", height: "100%" }}>
      <Particles
        options={{
          background: { color: "#0f0c29" }, // dark night sky
          fpsLimit: 60,
          interactivity: {
            events: { onClick: { enable: true, mode: "push" }, onHover: { enable: true, mode: "repulse" } },
            modes: { push: { quantity: 5 }, repulse: { distance: 100, duration: 0.4 } },
          },
          particles: {
            number: { value: 120, density: { enable: true, area: 800 } }, // more crystals
            color: { value: ["#ffffff", "#ffd700", "#a0e0ff"] }, // white, gold, blue
            shape: {
              type: "polygon", // polygon to simulate crystal
              polygon: { nb_sides: 6 } // hexagon crystals
            },
            opacity: { value: 0.8, random: true },
            size: { value: { min: 2, max: 6 }, random: true },
            move: {
              enable: true,
              speed: 1.5,
              direction: "none",
              random: true,
              straight: false,
              outModes: { default: "bounce" },
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
};

export default FloatingBackground;
