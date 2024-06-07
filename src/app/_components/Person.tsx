/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

"use client";
import styles from "./Person.module.css";

import React, { useState, useEffect, useMemo, useRef } from "react";
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
  description?: string;
}

function Person() {
  const [loading, setLoading] = useState<boolean>(true);
  const [profiles, setProfiles] = useState<PersonData[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showMatchPopup, setShowMatchPopup] = useState<boolean>(false);
  const [rightSwipeCount, setRightSwipeCount] = useState<number>(0);
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(profiles.length)
        .fill(0)
        .map(() => React.createRef<never>()),
    [profiles.length],
  );

  const fetchProfiles = async () => {
    try {
      const response = await fetch("/people.json");
      const data: PersonData[] = await response.json();
      console.log(data);
      setProfiles(data);
      setCurrentIndex(data.length - 1); // Start from the last profile
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch profiles:", error);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  const swiped = (direction: string, index: number) => {
    console.log(`You swiped ${direction}`);
    console.log(`Current index before swipe: ${currentIndex}`);

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

    const newIndex = currentIndexRef.current - 1;
    setCurrentIndex(newIndex);
    setCurrentImageIndex(0); // Reset image index for new profile
    console.log(`New index: ${newIndex}`);
  };

  const outOfFrame = (name: string, index: number) => {
    console.log(`${name} left the screen!`);
    if (currentIndexRef.current >= 0 && index === currentIndexRef.current) {
      setCurrentIndex(index - 1);
    }
  };

  const handleImageClick = () => {
    // Toggle full view
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      profiles[currentIndex]?.pictures[prevIndex + 1] ? prevIndex + 1 : 0,
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex - 1 >= 0
        ? prevIndex - 1
        : (profiles[currentIndex]?.pictures.length ?? 0) - 1,
    );
  };

  return (
    <div className="overflow-hidden ">
      <div className="flex h-24 justify-between bg-gray-500 pl-12 pr-12">
        <a href="/">
          <button className=" mt-5">
            <img src="/homeIcon.png" />
          </button>
        </a>
        <a href="/matches">
          <button className="mt-5">
            <img src="/matchesIcon.png" />
          </button>
        </a>
        <a href="/user">
          <button className="mt-5">
            <img src="/maleIcon.png" />
          </button>
        </a>
      </div>
      {loading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div className="">
          {profiles.length > 0 && (
            <div className="">
              {profiles.map((profile, index) => (
                <TinderCard
                  ref={childRefs[index]}
                  className={styles.swipe}
                  key={profile.email}
                  onSwipe={(dir) => swiped(dir, index)}
                  onCardLeftScreen={() =>
                    outOfFrame(
                      `${profile.name.first} ${profile.name.last}`,
                      index,
                    )
                  }
                  preventSwipe={["up", "down"]}
                >
                  {index === currentIndex && (
                    <div className="">
                      <div className="">
                        <div style={{ position: "relative" }}>
                          <img
                            src={
                              profiles[currentIndex]?.pictures[
                                currentImageIndex
                              ]
                            }
                            className="card-img-top h-[80vh] w-full bg-blue-600 object-cover"
                            alt={`${profiles[currentIndex]?.name.first} ${profiles[currentIndex]?.name.last}`}
                            style={{ opacity: 0.8 }}
                            onClick={handleImageClick}
                          />
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
                            {`${profiles[currentIndex]?.name.first} ${profiles[currentIndex]?.name.last}`}
                          </h1>
                        </div>
                      </div>

                      <div className="flex h-24 justify-between bg-gray-500 pl-12 pr-12">
                        <button onClick={prevImage} className="">
                          <img src="/rejectButton.png" />
                        </button>
                        <button onClick={nextImage} className="">
                          <img src="/gayheart.png" />
                        </button>
                      </div>
                      <div className="card-body p-2 ">
                        <h1>About</h1>
                        <p className="card-text">
                          {profiles[currentIndex]?.phone}
                        </p>
                        <p className="card-text">
                          {profiles[currentIndex]?.email}
                        </p>
                        <p className="card-text">{`${profiles[currentIndex]?.location.street.number} ${profiles[currentIndex]?.location.street.name}, ${profiles[currentIndex]?.location.city}, ${profiles[currentIndex]?.location.state}`}</p>

                        <p className="card-text mt-4">
                          {profiles[currentIndex]?.description}
                        </p>
                      </div>
                    </div>
                  )}
                </TinderCard>
              ))}
            </div>
          )}
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
