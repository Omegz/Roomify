// StarsBackground.tsx
import React from "react";

const StarsBackground = ({ children }) => {
  // Generates a large number of stars with random positions
  const generateRandomStars = (count) => {
    let stars = [];
    for (let i = 0; i < count; i++) {
      stars.push(`${Math.random() * 100}vw ${Math.random() * 100}vh #FFF`);
    }
    return stars.join(", ");
  };

  const starStyles = {
    "--star-small": generateRandomStars(700),
    "--star-medium": generateRandomStars(200),
    "--star-large": generateRandomStars(100),
  };

  return (
    <>
      <div className="stars-background" style={starStyles}>
        {children}
      </div>
      <style jsx>{`
        .stars-background {
          position: relative;
          width: 100vw;
          height: 100vh;
          background: radial-gradient(
            ellipse at bottom,
            #1b2735 0%,
            #090a0f 100%
          );
          overflow: hidden;
        }
        .stars-background::before,
        .stars-background::after {
          content: "";
          position: absolute;
          width: 1px;
          height: 1px;
          border-radius: 50%;
          box-shadow: var(--star-small);
          animation: animStar 50s linear infinite;
        }
        .stars-background::after {
          box-shadow: var(--star-medium);
          animation: animStar 100s linear infinite;
        }
        .stars-background::before {
          box-shadow: var(--star-large);
          animation: animStar 150s linear infinite;
        }
        @keyframes animStar {
          from {
            transform: translateY(0px);
          }
          to {
            transform: translateY(-2000px);
          }
        }
      `}</style>
    </>
  );
};

export default StarsBackground;
