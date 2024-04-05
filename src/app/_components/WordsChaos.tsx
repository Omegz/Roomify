import React, { useEffect, useState } from "react";

const WordsChaos = () => {
  const firstWords = ["Tired", "Need", "Fucking", "Chat"];
  const secondWords = ["of", "less", "Hate", "smarter"];
  const thirdWords = ["ChatGpt", "Chaos", "losers", "Not Harder"];
  const secondWordChangeTimings = [1000, 1000, 1000, 1000];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [secondIndex, setSecondIndex] = useState(0);

  useEffect(() => {
    // Update first and third words every second
    const firstAndThirdInterval = setInterval(() => {
      setCurrentIndex((currentIndex) =>
        currentIndex + 1 >= firstWords.length ? 0 : currentIndex + 1,
      );
    }, 1000);

    return () => clearInterval(firstAndThirdInterval);
  }, [firstWords.length]);

  useEffect(() => {
    const changeSecondWord = (index) => {
      setSecondIndex(index);
      const nextIndex = index + 1 >= secondWords.length ? 0 : index + 1;
      setTimeout(
        () => changeSecondWord(nextIndex),
        secondWordChangeTimings[index],
      );
    };

    changeSecondWord(secondIndex);
    // Cleanup the timeout when the component unmounts or when the list changes
    return () => clearTimeout(changeSecondWord);
  }, [secondWords.length]);

  return (
    <div className="container">
      <p className="animated-text sp">{firstWords[currentIndex]}</p>
      <p className="animated-text mp">{secondWords[secondIndex]}</p>
      <p className="animated-text sp">{thirdWords[currentIndex]}</p>

      <style jsx>{`
        .animated-text {
          text-shadow:
            0 0 7px rgba(255, 255, 255, 0.3),
            0 0 3px rgba(255, 255, 255, 0.3);
          opacity: 1;
          transition: opacity 0.5s ease-in-out;
          margin: 0.5rem;
        }

        .sp {
          background: -webkit-linear-gradient(
            rgb(64, 152, 241),
            rgb(236, 81, 106)
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .mp {
          background: linear-gradient(
            to right,
            rgb(64, 152, 241),
            rgb(235, 54, 84)
          );
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent; /* Fallback for browsers that do not support background-clip: text; */
          -webkit-text-fill-color: transparent;
        }

        .container {
          text-align: center;
          color: #e5e5e5;
          font-size: 2rem;
          text-transform: uppercase;
        }
      `}</style>
    </div>
  );
};

export default WordsChaos;
