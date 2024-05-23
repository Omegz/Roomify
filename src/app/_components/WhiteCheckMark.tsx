"use client";
import React from "react";

const WhiteCheckMark = () => {
  return (
    <div className="">
      <svg
        width="30"
        height="30"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="white"
          stroke-width="6"
          fill="none"
        />
        <path
          d="M30 50 L45 65 L70 35"
          stroke="white"
          stroke-width="6"
          fill="none"
        />
      </svg>
    </div>
  );
};

export default WhiteCheckMark;
