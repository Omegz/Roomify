"use client";

import React, { useState, useEffect } from "react";
import styles from "./LandingStyles.module.css";
import RevolvingIcon from "~/app/_components/RevolvingIcon";
import WordsChaos from "~/app/_components/WordsChaos";
import LandingNav from "~/app/_components/LandingNav";

function Page() {
  // State for changing words
  const [currentIndex, setCurrentIndex] = useState(0);
  const [secondIndex, setSecondIndex] = useState(0);

  // Words arrays
  const firstWords = ["Tired", "Need", "Fucking", "Chat"];
  const secondWords = ["of", "less", "Hate", "smarter"];
  const thirdWords = ["ChatGpt", "Chaos", "Niggas", "Not Harder"];
  const secondWordChangeTimings = [1500, 1000, 500, 2000]; // Timings for changing second words

  // Change words over time
  useEffect(() => {
    const firstAndThirdInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % firstWords.length);
    }, 1000);

    let timeoutId;
    const changeSecondWord = (index = 0) => {
      setSecondIndex(index);
      if (index < secondWords.length - 1) {
        timeoutId = setTimeout(() => {
          changeSecondWord(index + 1);
        }, secondWordChangeTimings[index]);
      }
    };
    changeSecondWord();

    return () => {
      clearInterval(firstAndThirdInterval);
      clearTimeout(timeoutId);
    };
  }, [secondWords.length, secondWordChangeTimings]);

  return (
    <div>
      {/* <RevolvingIcon /> */}
      {/* <WordsChaos /> */}
      <LandingNav />
    </div>
  );
}

export default Page;
