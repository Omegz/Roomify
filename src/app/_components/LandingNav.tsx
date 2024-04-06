import React from "react";

const LandingNav = () => {
  return (
    <>
      <style>{`
        .container3 {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-top: 36px;
        }

        .button {
          position: relative;
          width: 240px;
          height: 56px;
          margin: 10px 0;
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          font-size: 14px;
          font-weight: bold;
          color: #555;
          letter-spacing: 2px;
          cursor: pointer;
          overflow: hidden;
        }

        .button__line {
          position: absolute;
          height: 100%;
          width: 3px;
          background: #555;
        }

        .button__line::before {
          content: '';
          position: absolute;
          top: 0;
          height: 100%;
          width: 100%;
          background: #fff;
          transform: scaleY(0);
          transition: transform 0.3s ease;
          transform-origin: bottom;
        }

        .button__line:first-child {
          left: 0;
        }

        .button__line:last-child {
          right: 0;
        }

        .button:hover .button__line::before {
          transform: scaleY(1);
        }

        .button__text {
          position: relative;
          z-index: 1;
        }

        .type--A, .type--B, .type--C {
          transition: color 0.3s ease;
        }

        .type--A:hover {
          color: blue;
        }

       .type--B:hover  {
            color: red;
          }

        .type--C:hover {
            color: green;
          }


        .type--A .button__line::before { background-color: #ffecf6; }
        .type--B .button__line::before { background-color: #e9ecff; }
        .type--C .button__line::before { background-color: #defffa; }
      `}</style>
      <div className="container3">
        <a className="button type--A" href="/louis">
          <div className="button__line"></div>
          <span className="button__text">Chat Now</span>
          <div className="button__line"></div>
        </a>
        <a className="button type--B " href="/about">
          <div className="button__line "></div>
          <span className="button__text ">Learn More</span>
          <div className="button__line"></div>
        </a>
        <a className="button type--C" href="/signup">
          <div className="button__line"></div>
          <span className="button__text">Sign Up</span>
          <div className="button__line"></div>
        </a>
        {/* Repeat for other buttons as necessary */}
      </div>
    </>
  );
};

export default LandingNav;
