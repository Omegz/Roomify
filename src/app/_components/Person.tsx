/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import TinderCard from "react-tinder-card";

const db = [];
// Assuming you want to track removed persons by their name
const alreadyRemoved: string[] = [];

const URL = "https://randomuser.me/api/";

interface PersonData {
  gender: string;
  name: string;
  age: number;
  picture: string;
  address: string;
  email: string;
  phone: string;
}

function Person() {
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState<PersonData[]>([]);

  const [lastDirection, setLastDirection] = useState();

  const loadData = async () => {
    const response = await fetch(URL);
    const responseJSON = await response.json();
    const person = responseJSON.results[0];
    const { street, city, state } = person.location;

    // Now db is typed correctly as an array of PersonData objects
    const newCharacter: PersonData = {
      gender: person.gender,
      name: `${person.name.first} ${person.name.last}`,
      age: person.dob.age,
      picture: person.picture.large,
      address: `${street.name}, ${city}, ${state}`,
      email: person.email,
      phone: person.phone,
    };

    setCharacters((prevCharacters) => [...prevCharacters, newCharacter]);
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    loadData();
  }, []);

  const childRefs = useMemo(
    () =>
      Array(characters.length)
        .fill(null)
        .map(() => React.createRef<never>()),
    [characters.length],
  );

  const swiped = (direction, person) => {
    setLastDirection(direction);
    alreadyRemoved.push(person);
  };

  const outOfFrame = () => {
    loadData();
  };

  return (
    <div className="container">
      <link
        href="https://fonts.googleapis.com/css?family=Damion&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Alatsi&display=swap"
        rel="stylesheet"
      />
      <h1>React Tinder Card</h1>
      <div style={{ textAlign: "center" }} />
      {loading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div className="cardContainer">
          {characters.map((character, index) => {
            return (
              <TinderCard
                ref={childRefs[index]}
                className="swipe"
                key={character.name}
                onSwipe={(dir) => swiped(dir, character)}
                onCardLeftScreen={() => outOfFrame()}
              >
                <div className="card" style={{ width: "18rem" }}>
                  <img
                    src={character.picture}
                    className="card-img-top"
                    alt="..."
                    style={{ width: "16rem", margin: "auto" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{character.name}</h5>
                    <p className="card-text" style={{ marginBottom: "0.5rem" }}>
                      <i
                        style={{
                          fontSize: "20px",
                          marginRight: "5px",
                          minWidth: "1.5rem",
                          textAlign: "center",
                        }}
                        className="fa fa-phone"
                        aria-hidden="true"
                      />
                      {character.phone}
                    </p>
                    <p className="card-text" style={{ marginBottom: "0.5rem" }}>
                      <i
                        style={{
                          fontSize: "20px",
                          marginRight: "5px",
                          minWidth: "1.5rem",
                          textAlign: "center",
                        }}
                        className="fa fa-envelope"
                        aria-hidden="true"
                      />
                      {character.email}
                    </p>
                    <p
                      className="card-text"
                      style={{ marginBottom: "0.5rem", overflow: "hidden" }}
                    >
                      <i
                        style={{
                          fontSize: "20px",
                          marginRight: "5px",
                          minWidth: "1.5rem",
                          textAlign: "center",
                        }}
                        className="fa fa-map-marker"
                        aria-hidden="true"
                      />
                      {character.address}
                    </p>
                  </div>
                </div>
              </TinderCard>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Person;
