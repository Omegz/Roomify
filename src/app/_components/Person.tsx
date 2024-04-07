"use client";

import React, { useState, useMemo, useEffect } from "react";
// import TinderCard from '../react-tinder-card/index'
import TinderCard from "react-tinder-card";

const db = [];
const alreadyRemoved = [];
const URL = "https://randomuser.me/api/";
function Person() {
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState([]);
  const [lastDirection, setLastDirection] = useState();

  const loadData = async () => {
    const response = await fetch(URL);
    const responseJSON = await response.json();
    const person = responseJSON.results[0];
    const gender = person.gender;
    const name = person.name.first + " " + person.name.last;
    const age = person.dob.age;
    const picture = person.picture.large;
    const { street, city, state } = person.location;
    console.log(person.location);
    const address = street.name + ", " + city + ", " + state;
    const email = person.email;

    const db = [];
    db.push({
      gender: gender,
      name: name,
      age: age,
      picture: picture,
      address: address,
      email: email,
      phone: person.phone,
    });
    setCharacters([...characters, ...db]);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    [],
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
