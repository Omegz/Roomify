"use client";

import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import WhiteCheckMark from "./WhiteCheckMark";

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

const Line = styled.div`
  height: 2px;
  background: linear-gradient(to right, transparent 50%, #223049 50%);
  background-size:
    16px 2px,
    100% 2px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  padding: 2rem;
`;

const InnerContainer = styled.div`
  width: 100%;
  max-width: 600px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border: 8px solid ${(props) => (props.isPaid ? "#b0de96" : "#FFD700")}; /* Green or Yellow border */
`;

const TopSection = styled.div`
  padding: 1rem;
  background-color: ${({ bgColor }) => bgColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BottomSection = styled.div`
  background-color: ${({ bgColor }) => bgColor};
`;

const HiddenText = styled.div`
  visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
  font-size: 1.5rem;
  margin-bottom: 1rem;
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
    <Container>
      {!isPaid ? (
        <InnerContainer isPaid={isPaid}>
          <TopSection bgColor="#fff">
            <HiddenText isVisible={isPaid}>hellow world</HiddenText>
            <div className="mt-24 flex">
              <div className="mb-12 ml-12 flex w-1/2 flex-col justify-center">
                <h1 className="text">LOCATION</h1>
                <h1>Tilda og Karl</h1>
                <p>{formattedTime}</p>
                <p>{formattedDate}</p>
              </div>
            </div>
            <div className="mb-36 h-12 bg-gray-500">
              <h1 className="ml-12">Islatte</h1>
            </div>
            <SliderWrapper>
              <SliderLabel>Slide to Pay</SliderLabel>
              <SliderContainer>
                <SliderInput
                  type="range"
                  ref={inputRangeRef}
                  value={value}
                  onChange={handleChange}
                  onMouseUp={handleMouseUp}
                  onTouchEnd={handleMouseUp}
                />
              </SliderContainer>
            </SliderWrapper>
          </TopSection>
        </InnerContainer>
      ) : (
        <InnerContainer isPaid={isPaid}>
          <TopSection bgColor="#b0de96">
            <WhiteCheckMark />

            <div className="flex flex-col items-center justify-center text-white">
              Receipt
            </div>
          </TopSection>
          <BottomSection bgColor="#FFFFFF">
            <div className=" w-full  ">
              <div className="mt-5 flex items-center justify-center text-2xl font-bold text-rose-950">
                0 Kr.
              </div>
              <Line className="mb-2 mt-2" />
              <div className="flex ">
                <div className="ml-12 flex w-1/2 flex-col justify-center">
                  <h1 className="text-sm text-[#b0de96]">LOCATION</h1>
                  <h1 className=" text-xl font-bold text-rose-950">
                    Tilda og Karl
                  </h1>
                  <span className="text-sm">{formattedTime}</span>
                  <span className="text-sm">{formattedDate}</span>
                </div>
              </div>
              <Line className="mb-2 mt-2" />
            </div>
            <div className="mb-12 mt-6 flex h-12 items-center justify-between bg-[#f9f1e6]">
              <h1 className="ml-12">Islatte</h1>
              <div className="mr-12">
                <h1>FREE!</h1>
              </div>
            </div>

            <Line className="mb-2 mt-2" />

            <div className="flex justify-between ">
              <div className=" ml-10 flex justify-between ">
                <img className="w-[30px]" src="coffee.jpg" alt="" />
                <h1 className="ml-3 mt-2">Rista Cups</h1>
              </div>
              <h1>logo</h1>
            </div>

            <div className="mt-5 flex w-full items-center justify-center">
              <button className="w-1/4 rounded-xl bg-yellow-800">Done</button>
            </div>
          </BottomSection>
        </InnerContainer>
      )}
    </Container>
  );
};

export default Rista;
