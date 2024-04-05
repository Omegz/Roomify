// StarsBackground.jsx
import React, { useEffect } from "react";

const StarsBackground = ({ children }) => {
  const stars = [
    { id: 1, size: 1, speed: 50 },
    { id: 2, size: 2, speed: 100 },
    { id: 3, size: 3, speed: 150 },
  ];

  const generateRandomShadows = (n) => {
    let value = `${Math.random() * 2000}px ${Math.random() * 2000}px #FFF`;
    for (let i = 2; i <= n; i++) {
      value += `, ${Math.random() * 2000}px ${Math.random() * 2000}px #FFF`;
    }
    return value;
  };

  useEffect(() => {
    document.body.style.margin = "0";
    // You might not want to set this on the body if this component will be used inside a page with other content
    document.body.style.background =
      "radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)";
  }, []);

  return (
    <>
      <style>{`
        @keyframes animStar {
          from {
            transform: translateY(0px);
          }
          to {
            transform: translateY(-2000px);
          }
        }
        .stars {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 1px;
          height: 1px;
          background: transparent;
        }
      `}</style>
      <div
        className="stars-container"
        style={{ position: "relative", width: "100%", height: "100%" }}
      >
        {stars.map(({ id, size, speed }) => (
          <div
            key={id}
            className={`stars stars${id}`}
            style={{
              "--size": `${size}px`,
              "--speed": `${speed}s`,
              "--shadows": generateRandomShadows(700),
              boxShadow: "var(--shadows)",
              animation: `animStar var(--speed) linear infinite`,
            }}
          />
        ))}
        {children}
      </div>
    </>
  );
};

export default StarsBackground;
