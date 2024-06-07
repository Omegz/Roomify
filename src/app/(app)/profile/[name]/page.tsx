/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

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
  description: string;
  gender: string;
  name: Name;
  dob: { age: number };
  pictures: string[];
  location: Location;
  email: string;
  phone: string;
}

function Profile() {
  const params = useParams();
  const name = params?.name as string | undefined;
  const [match, setMatch] = useState<PersonData | null>(null);

  useEffect(() => {
    if (!name) return;

    const storedMatches = JSON.parse(
      localStorage.getItem("matchedProfiles") || "[]",
    );
    const foundMatch = storedMatches.find(
      (m: PersonData) => `${m.name.first}-${m.name.last}` === name,
    );
    setMatch(foundMatch);
  }, [name]);

  if (!match) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div>
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
      <div className="p-4">
        <h1 className="mb-4 text-2xl font-bold">{`${match.name.first} ${match.name.last}`}</h1>
        <img
          src={match.pictures[0]} // Use the first picture in the pictures array
          alt={`${match.name.first} ${match.name.last}`}
          className="mb-4 h-32 w-32 rounded-full"
        />
        <div className="rounded-md border p-4 shadow-md">
          <p className="mb-2">
            <strong>Email:</strong> {match.email}
          </p>
          <p className="mb-2">
            <strong>Phone:</strong> {match.phone}
          </p>
          <p className="mb-2">
            <strong>Location:</strong>{" "}
            {`${match.location.street.number} ${match.location.street.name}, ${match.location.city}, ${match.location.state}`}
          </p>
          <p className="mb-2">
            <strong>Age:</strong> {match.dob.age}
          </p>
          <p className="mb-2">
            <strong>Gender:</strong> {match.gender}
          </p>

          <p className="mb-2">
            <strong>About:</strong> {match.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
