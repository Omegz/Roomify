/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

"use client";
import styles from "./Person.module.css";

import React, { useState, useEffect, useMemo, useRef } from "react";
import TinderCard from "react-tinder-card";

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

function Person() {
  const [loading, setLoading] = useState<boolean>(true);
  const [profiles, setProfiles] = useState<PersonData[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

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

    console.log(
      `You swiped ${direction} on ${profiles[index].name.first} ${profiles[index].name.last}`,
    );

    // Example action based on swipe direction
    if (direction === "left") {
      // Perhaps mark this profile as a 'nope'
      console.log(
        `Noped ${profiles[index].name.first} ${profiles[index].name.last}`,
      );
    } else if (direction === "right") {
      // Or mark it as a 'like'
      console.log(
        `Liked ${profiles[index].name.first} ${profiles[index].name.last}`,
      );
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
      <h1>React Tinder Card</h1>
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
                  className="swipe"
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
                    <img
                      src={profile.picture.large}
                      className="card-img-top"
                      alt={`${profile.name.first} ${profile.name.last}`}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{`${profile.name.first} ${profile.name.last}`}</h5>
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
