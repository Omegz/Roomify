/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

"use client";
import styles from "./Person.module.css";

import React, { useState, useEffect, useRef } from "react";
import TinderCard from "react-tinder-card";
import Navbar from "./NavBar";

interface Location {
  street: { name: string; number: number };
  city: string;
  state: string;
}

interface Name {
  first: string;
  last: string;
}

interface PersonData {
  gender: string;
  name: Name;
  dob: { age: number };
  pictures: string[];
  location: Location;
  email: string;
  phone: string;
}

function Person() {
  const [loading, setLoading] = useState<boolean>(true);
  const [profiles, setProfiles] = useState<PersonData[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showMatchPopup, setShowMatchPopup] = useState<boolean>(false);
  const [rightSwipeCount, setRightSwipeCount] = useState<number>(0);
  const [isFullView, setIsFullView] = useState<boolean>(false);
  const [isFetched, setIsFetched] = useState<boolean>(false);

  const currentIndexRef = useRef(currentIndex);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex + 1 < profiles[currentIndex].pictures.length
        ? prevIndex + 1
        : 0,
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex - 1 >= 0
        ? prevIndex - 1
        : profiles[currentIndex].pictures.length - 1,
    );
  };

  const fetchProfiles = async () => {
    if (isFetched) return; // Prevent multiple fetches
    try {
      const response = await fetch("/people.json");
      const data = await response.json();
      console.log(data); // Log the loaded data
      setProfiles(data);
      setCurrentIndex(data.length - 1); // Start from the last profile
      setLoading(false);
      setIsFetched(true);
      console.log(`Loaded profiles: ${data.length}`);
    } catch (error) {
      console.error("Failed to fetch profiles:", error);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
    console.log(`Updated currentIndex: ${currentIndex}`);
  }, [currentIndex]);

  const swiped = (direction: string, index: number) => {
    console.log(`You swiped ${direction}`);
    console.log(`Current index before swipe: ${currentIndexRef.current}`);

    if (direction === "right") {
      const newRightSwipeCount = rightSwipeCount + 1;
      setRightSwipeCount(newRightSwipeCount);

      if (newRightSwipeCount % 5 === 0) {
        setShowMatchPopup(true);
        setTimeout(() => {
          setShowMatchPopup(false);
        }, 3000);

        const matchedProfiles = JSON.parse(
          localStorage.getItem("matchedProfiles") || "[]",
        );
        matchedProfiles.push(profiles[index]);
        localStorage.setItem(
          "matchedProfiles",
          JSON.stringify(matchedProfiles),
        );
      }
    }

    const newIndex = index - 1;
    if (newIndex < 0) {
      console.log("No more profiles to display.");
    } else {
      setCurrentIndex(newIndex);
      console.log(`New index: ${newIndex}`);
    }
  };

  const outOfFrame = (name: string, index: number) => {
    console.log(`${name} left the screen!`);
  };

  const handleImageClick = () => {
    setIsFullView(!isFullView);
  };

  return (
    <div className={styles.container}>
      <Navbar />
      {loading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div className={styles.cardContainer}>
          {profiles.map((profile, index) => (
            <TinderCard
              key={profile.email}
              className="swipe bg-gray-600 p-5"
              onSwipe={(dir) => swiped(dir, index)}
              onCardLeftScreen={() =>
                outOfFrame(`${profile.name.first} ${profile.name.last}`, index)
              }
              preventSwipe={isFullView ? ["left", "right", "up", "down"] : []}
            >
              {index === currentIndex && (
                <div className={styles.card}>
                  <div className={styles.carousel}>
                    <div style={{ position: "relative" }}>
                      <img
                        src={profiles[currentIndex].pictures[currentImageIndex]}
                        className={`card-img-top h-[80vh] w-full object-cover ${
                          isFullView ? "" : "bg-blue-600"
                        }`}
                        alt={`${profiles[currentIndex].name.first} ${profiles[currentIndex].name.last}`}
                        style={{ opacity: isFullView ? 1 : 0.8 }}
                        onClick={handleImageClick}
                      />
                      {!isFullView && (
                        <h1
                          className="card-title mb-7 text-2xl text-white"
                          style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            width: "100%",
                            padding: "10px",
                          }}
                        >
                          {`${profiles[currentIndex].name.first} ${profiles[currentIndex].name.last}`}
                        </h1>
                      )}
                    </div>
                  </div>

                  {!isFullView && (
                    <>
                      <div className="flex h-24 justify-between bg-gray-500 pl-12 pr-12">
                        <button onClick={prevImage} className="">
                          <img src="/rejectButton.png" />
                        </button>
                        <button onClick={nextImage} className="">
                          <img src="/gayheart.png" />
                        </button>
                      </div>
                      <div className="card-body ">
                        <h1>About</h1>
                        <p className="card-text">
                          {profiles[currentIndex].phone}
                        </p>
                        <p className="card-text">
                          {profiles[currentIndex].email}
                        </p>
                        <p className="card-text">{`${profiles[currentIndex].location.street.number} ${profiles[currentIndex].location.street.name}, ${profiles[currentIndex].location.city}, ${profiles[currentIndex].location.state}`}</p>
                      </div>
                    </>
                  )}

                  {isFullView && (
                    <div
                      className="full-view-carousel"
                      style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.9)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 1000,
                      }}
                    >
                      <button
                        onClick={prevImage}
                        style={{
                          color: "white",
                          fontSize: "2rem",
                          position: "absolute",
                          left: "10px",
                        }}
                      >
                        Prev
                      </button>
                      <img
                        src={profiles[currentIndex].pictures[currentImageIndex]}
                        className="full-view-image"
                        style={{
                          maxWidth: "90%",
                          maxHeight: "80%",
                          objectFit: "contain",
                        }}
                        alt={`${profiles[currentIndex].name.first} ${profiles[currentIndex].name.last}`}
                      />
                      <button
                        onClick={nextImage}
                        style={{
                          color: "white",
                          fontSize: "2rem",
                          position: "absolute",
                          right: "10px",
                        }}
                      >
                        Next
                      </button>
                      <button
                        onClick={handleImageClick}
                        style={{
                          color: "white",
                          fontSize: "2rem",
                          position: "absolute",
                          top: "10px",
                          right: "10px",
                        }}
                      >
                        Close
                      </button>
                    </div>
                  )}
                </div>
              )}
            </TinderCard>
          ))}
        </div>
      )}

      {showMatchPopup && (
        <div className={styles.matchPopup}>
          <h2>Match!</h2>
        </div>
      )}
    </div>
  );
}

export default Person;
