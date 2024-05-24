"use client";

import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import WhiteCheckMark from "./WhiteCheckMark";

interface PopUpContainerProps {
  isPaid: boolean;
}

interface SectionProps {
  bgColor: string;
}

interface HiddenTextProps {
  isVisible: boolean;
}

const BackgroundContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh; /* Ensure it takes up the full height of the viewport */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("kaffesalonenimage.webp") no-repeat center center;
  background-size: cover;
  z-index: 0; /* Ensure it is behind the pop-up container */
`;

const PopUpContainer = styled.div<PopUpContainerProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 94%;
  max-width: 600px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  z-index: 100; /* High z-index to make it appear above the background */
  border: 8px solid ${(props) => (props.isPaid ? "#b0de96" : "#e4b77d")}; /* Green or Yellow border */
`;

const SliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SliderLabel = styled.h1`
  font-size: 12px;
  text-transform: uppercase;
  color: #e4b77d;
  margin-bottom: 20px;
`;

const SliderContainer = styled.div`
  width: 300px;
  position: relative;
`;

const SliderInput = styled.input`
  width: 80%;
  margin-left: 30px;
  appearance: none;
  height: 50px;
  background: #e4b77d;
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
    border-radius: 12px;
  }

  &::-webkit-slider-thumb {
    appearance: none;
    width: 40px;
    height: 40px;
    margin-left: 2px;
    border-radius: 50%;
    background: white
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='8 4 16 12 8 20'%3E%3C/polyline%3E%3C/svg%3E")
      no-repeat center center;
    background-size: 20px 20px;

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
  background: linear-gradient(to right, transparent 50%, #a9a8a8 50%);
  background-size:
    16px 2px,
    100% 2px;
`;

const TopSection = styled.div<SectionProps>`
  background-color: ${({ bgColor }) => bgColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BottomSection = styled.div<SectionProps>`
  background-color: ${({ bgColor }) => bgColor};
`;

const HiddenText = styled.div<HiddenTextProps>`
  visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const KaffeSalonenLatte: React.FC = () => {
  const [value, setValue] = useState(0);
  const [isPaid, setIsPaid] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
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
    setShowLogo(true);
    setTimeout(() => {
      setShowLogo(false);
      setIsPaid(true);
      setTimeout(() => {
        setShowReceipt(true);
      }, 200); // Small delay to ensure smooth transition
    }, 400); // Show the logo for 5 seconds
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
    <BackgroundContainer>
      <BackgroundImage />
      {showLogo && !showReceipt ? (
        <LogoContainer>
          <img className="z-10 " src="coffeLogoInter.png" alt="Logo" />
        </LogoContainer>
      ) : (
        <PopUpContainer isPaid={isPaid}>
          {!isPaid ? (
            <>
              <TopSection bgColor="#fff">
                <HiddenText isVisible={isPaid}>hellow world</HiddenText>
                <div className="ml-11 flex w-full ">
                  <div className="flex w-1/2 flex-col justify-center">
                    <h1 className="text-sm  text-[#e4b77d]">LOCATION</h1>
                    <h1 className=" text-xl font-bold text-rose-950">
                      KaffeSalonen
                    </h1>
                    <span className="text-sm">{formattedTime}</span>
                    <span className="text-sm">{formattedDate}</span>
                  </div>
                </div>
                <div className="mb-24 mt-6 flex h-12 w-full items-center justify-between bg-[#f9f1e6]">
                  <h1 className="ml-6">Latte</h1>
                  <div className="mr-8 flex">
                    <img className="w-[22px]" src="checkMark.webp" alt="" />
                  </div>
                </div>
                <SliderWrapper className="mb-12 mt-20">
                  <SliderLabel className="mr-20">
                    CASHIER SWIPE TO ACCEPT
                  </SliderLabel>
                  <SliderContainer>
                    <SliderInput
                      type="range"
                      className="rounded-xl"
                      ref={inputRangeRef}
                      value={value}
                      onChange={handleChange}
                      onMouseUp={handleMouseUp}
                      onTouchEnd={handleMouseUp}
                    />
                  </SliderContainer>
                </SliderWrapper>
              </TopSection>
            </>
          ) : showReceipt ? (
            <>
              <TopSection bgColor="#b0de96">
                <WhiteCheckMark />
                <div className="flex h-12 flex-col items-center justify-center text-white">
                  Receipt
                </div>
              </TopSection>
              <BottomSection bgColor="#FFFFFF">
                <div className=" w-full  ">
                  <div className="mt-5 flex h-12 items-center justify-center text-2xl font-bold text-rose-950">
                    0 Kr.
                  </div>
                  <Line className="mb-2 mt-2" />
                  <div className="flex ">
                    <div className="ml-12 flex w-1/2 flex-col justify-center">
                      <h1 className="text-sm text-[#b0de96]">LOCATION</h1>
                      <h1 className=" text-xl font-bold text-rose-950">
                        Kaffesalonen
                      </h1>
                      <span className="text-sm">{formattedTime}</span>
                      <span className="text-sm">{formattedDate}</span>
                    </div>
                  </div>
                  <Line className="mb-2 mt-2" />
                </div>
                <div className="mb-12 mt-6 flex h-12 items-center justify-between bg-[#f9f1e6]">
                  <h1 className="ml-11">Latte</h1>
                  <div className="mr-8 flex">
                    <h1>Free!</h1>
                    <img className="w-[22px]" src="checkMark.webp" alt="" />
                  </div>
                </div>
                <Line className="mb-2 mt-5" />
                <div className="mt-5 flex justify-between ">
                  <div className=" ml-10 flex justify-between ">
                    <img className="w-[35px]" src="coffee.jpg" alt="" />
                    <h1 className="ml-3 mt-2">Rista Cups</h1>
                  </div>
                  <img className="mr-8 w-[50px]" src="plusZero.webp" alt="" />
                </div>
                <div className="mt-5 flex w-full items-center justify-center">
                  <button className="mb-12 mt-4  h-10 w-2/4 rounded bg-[#e4b77d] ">
                    Done
                  </button>
                </div>
              </BottomSection>
            </>
          ) : null}
        </PopUpContainer>
      )}
    </BackgroundContainer>
  );
};

export default KaffeSalonenLatte;
