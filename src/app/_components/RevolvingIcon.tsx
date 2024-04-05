import React from "react";

const RevolvingIcon = () => {
  return (
    <>
      <style>{`
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .spinner {
          position: relative;
          width: 300px;
          height: 300px;
          margin: auto;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .circle {
          position: absolute;
          width: 100%;
          height: 100%;
          animation: rotate 20s linear infinite;
        }

        .logo {
          position: absolute;
          z-index: 1;
          width: 150px;
          height: 150px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      `}</style>
      <div className="spinner">
        <img
          src="https://louischatteaux.vercel.app/lcLogo.png"
          alt="Logo"
          className="logo"
        />
        <div className="circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 300 300"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <path
                id="circlePath"
                d="M 150, 150 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
              />
              <linearGradient
                id="textGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop
                  offset="0%"
                  style={{ stopColor: "rgb(64, 152, 241)", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "rgb(236, 81, 106)", stopOpacity: 1 }}
                />
              </linearGradient>
            </defs>
            <g>
              <use xlinkHref="#circlePath" fill="none" />
              <text fill="url(#textGradient)">
                <textPath xlinkHref="#circlePath">
                  Louis Chatteaux Avec Louis Chatteaux Louis Chatteaux Louis
                  Chatteaux
                </textPath>
              </text>
            </g>
          </svg>
        </div>
      </div>
    </>
  );
};

export default RevolvingIcon;
