"use client";

import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const SliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SliderLabel = styled.h1`
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 1.25px;
  margin-bottom: 20px;
`;

const SliderContainer = styled.div`
  width: 300px;
  position: relative;
`;

const Line = styled.div`
  height: 2px;
  background: linear-gradient(to right, transparent 50%, #223049 50%);
  background-size:
    16px 2px,
    100% 2px;
`;
const SliderInput = styled.input`
  width: 100%;
  appearance: none;
  height: 40px;
  background: green;
  border-radius: 10px;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;
  position: relative;
  z-index: 1;

  &:hover {
    opacity: 1;
  }

  &::before {
    content: "Slide to Pay";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 1rem;
    z-index: 0;
  }

  &::-webkit-slider-thumb {
    appearance: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: white
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='8 4 16 12 8 20'%3E%3C/polyline%3E%3C/svg%3E")
      no-repeat center center;
    background-size: 20px 20px;
    border: 2px solid black;
    cursor: pointer;
    position: relative;
    z-index: 2;
    transition: transform 0.2s;
  }

  &::-webkit-slider-thumb:hover {
    transform: scale(1.1);
  }

  &::-moz-range-thumb {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: white
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='8 4 16 12 8 20'%3E%3C/polyline%3E%3C/svg%3E")
      no-repeat center center;
    background-size: 20px 20px;
    border: 2px solid black;
    cursor: pointer;
    position: relative;
    z-index: 2;
    transition: transform 0.2s;
  }

  &::-moz-range-thumb:hover {
    transform: scale(1.1);
  }

  &::-ms-thumb {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: white
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='8 4 16 12 8 20'%3E%3C/polyline%3E%3C/svg%3E")
      no-repeat center center;
    background-size: 20px 20px;
    border: 2px solid black;
    cursor: pointer;
    position: relative;
    z-index: 2;
    transition: transform 0.2s;
  }

  &::-ms-thumb:hover {
    transform: scale(1.1);
  }
`;

const SliderValue = styled.span`
  margin-top: 20px;
  font-size: 1rem;
`;

const Rista: React.FC = () => {
  const [value, setValue] = useState(0);
  const [isPaid, setIsPaid] = useState(false);
  const inputRangeRef = useRef<HTMLInputElement>(null);
  const maxValue = 100;

  useEffect(() => {
    if (inputRangeRef.current) {
      inputRangeRef.current.min = "0";
      inputRangeRef.current.max = maxValue.toString();
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  };

  const handleMouseUp = () => {
    if (value < maxValue) {
      setValue(0);
    } else {
      handlePayment();
    }
  };

  const handlePayment = () => {
    setIsPaid(true);
    setValue(0);
    if (inputRangeRef.current) {
      inputRangeRef.current.value = "0";
    }
  };

  useEffect(() => {
    if (inputRangeRef.current) {
      inputRangeRef.current.value = value.toString();
    }
  }, [value]);

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedTime = currentDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    // <div className="flex h-screen flex-col items-center justify-center bg-red-500 p-2">
    //   <div
    //     className={`m-7 w-full border-8 ${isPaid ? "border-green-400" : "border-yellow-400"} bg-white`}
    //   >
    //     <div
    //       className={`flex items-center justify-center ${isPaid ? "visible" : "invisible"}`}
    //     >
    //       hellow world
    //     </div>
    //     <div className="mt-24 flex">
    //       <div className="mb-12 ml-12 flex w-1/2 flex-col justify-center">
    //         <h1 className="text">LOCATION</h1>
    //         <h1>Tilda og Karl</h1>
    //         <p>{formattedTime}</p>
    //         <p>{formattedDate}</p>
    //       </div>
    //     </div>
    //     <div className="">
    //       <div className="mb-36 h-12 bg-gray-500">
    //         <h1 className="ml-12">Islatte</h1>
    //       </div>
    //     </div>
    //     <SliderWrapper className="bg-white">
    //       <SliderLabel>Slide to Pay</SliderLabel>
    //       <SliderContainer>
    //         <SliderInput
    //           type="range"
    //           ref={inputRangeRef}
    //           value={value}
    //           onChange={handleChange}
    //           onMouseUp={handleMouseUp}
    //           onTouchEnd={handleMouseUp}
    //         />
    //       </SliderContainer>
    //     </SliderWrapper>
    //   </div>
    // </div>

    <div className="h-screen bg-blue-500">
      <div className="items-cetner ml-4 mr-4 mt-12 flex flex-col justify-center bg-green-500">
        <div className=" flex flex-col items-center justify-center">svg</div>
        <div className=" flex flex-col items-center justify-center">
          Receipt
        </div>
      </div>

      <div className="ml-4  mr-4  flex flex-col items-center justify-center bg-red-500">
        <div className="ml-5 mr-5 w-full border-8 border-green-400">
          <div className="items-cetner mt-12 flex justify-center ">0 Kr.</div>
          <Line className="mb-3 mt-12" />
          <div className=" flex">
            <div className=" ml-12 flex w-1/2 flex-col justify-center">
              <h1 className="text">LOCATION</h1>
              <h1>Tilda og Karl</h1>
              <p>{formattedTime}</p>
              <p>{formattedDate}</p>
            </div>
          </div>
          <Line className=" mb-12 mt-3" />
          <div className="">
            <div className="mb-36 h-12 bg-gray-500">
              <h1 className="ml-12">Islatte</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rista;
