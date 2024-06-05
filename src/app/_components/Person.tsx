/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

"use client";
import styles from "./Person.module.css";

import React, { useState, useEffect, useMemo, useRef } from "react";
import TinderCard from "react-tinder-card";
import Navbar from "~/app/_components/Navbar";
const URL = "https://randomuser.me/api/?results=10"; // Fetch 10 results at a time

interface Location {
  street: { name: string; number: number };
  city: string;
  state: string;
}

interface Name {
  first: string;
  last: string;
}

interface Picture {
  large: string;
}

interface PersonData {
  gender: string;
  name: Name;
  dob: { age: number };
  picture: Picture;
  location: Location;
  email: string;
  phone: string;
}

const defaultPhotos = ["/astronaut.png", "/lcLogo.png", "/logo.png"];

function Person() {
  const [loading, setLoading] = useState<boolean>(true);
  const [profiles, setProfiles] = useState<PersonData[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Handlers for next and previous image
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex + 1 < defaultPhotos.length ? prevIndex + 1 : 0,
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex - 1 >= 0 ? prevIndex - 1 : defaultPhotos.length - 1,
    );
  };

  const childRefs = useMemo(
    () => profiles.map(() => React.createRef<never>()),
    [profiles],
  );

  const fetchProfiles = async () => {
    try {
      const response = await fetch(URL);
      const data = await response.json();
      setProfiles((prev) => [...prev, ...data.results]);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch profiles:", error);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const swiped = (direction: string, index: number) => {
    // Guard clause to ensure index is within bounds
    if (index < 0 || index >= profiles.length) {
      console.error("Index out of bounds", index);
      return; // Exit the function if index is not valid
    }

    console.log(`You swiped `);

    // Example action based on swipe direction
    if (direction === "left") {
      // Perhaps mark this profile as a 'nope'
      console.log(`Noped `);
    } else if (direction === "right") {
      // Or mark it as a 'like'
      console.log(`Liked `);
    }

    // Move to the next profile
    setCurrentIndex(index + 1);
  };

  const outOfFrame = (name: string, index: number) => {
    // Optionally, fetch more profiles if you're at the last one
    if (index === profiles.length - 1) {
      fetchProfiles();
    }
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
          {profiles.map(
            (profile, index) =>
              index === currentIndex && (
                <TinderCard
                  ref={childRefs[index]}
                  className="swipe bg-gray-600 p-5"
                  key={profile.email} // email as a unique key; adjust as necessary
                  onSwipe={(dir) => swiped(dir, index)}
                  onCardLeftScreen={() =>
                    outOfFrame(
                      `${profile.name.first} ${profile.name.last}`,
                      index,
                    )
                  }
                >
                  <div className={styles.card}>
                    <div className={styles.carousel}>
                      <div style={{ position: "relative" }}>
                        <img
                          src={defaultPhotos[currentImageIndex]}
                          className="card-img-top h-[80vh] w-full bg-blue-600 object-cover"
                          alt={`${profile.name.first} ${profile.name.last}`}
                          style={{ opacity: 0.8 }} // Adjust the opacity value as needed
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
                          {`${profile.name.first} ${profile.name.last}`}
                        </h1>
                      </div>

                      {/* {defaultPhotos.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className={styles.carouselControlLeft}
                          >
                            &#x3c;
                          </button>
                          <button
                            onClick={nextImage}
                            className={styles.carouselControlRight}
                          >
                            &#x3e;
                          </button>
                        </>
                      )} */}
                    </div>

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
                      <p className="card-text">{profile.phone}</p>
                      <p className="card-text">{profile.email}</p>
                      <p className="card-text">{`${profile.location.street.number} ${profile.location.street.name}, ${profile.location.city}, ${profile.location.state}`}</p>
                    </div>
                  </div>
                </TinderCard>
              ),
          )}
        </div>
      )}
    </div>
  );
}

export default Person;
