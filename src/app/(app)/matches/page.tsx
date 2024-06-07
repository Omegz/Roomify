/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
  pictures: string[];
  location: Location;
  email: string;
  phone: string;
}

function Matches() {
  const [matches, setMatches] = useState<PersonData[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedMatches = JSON.parse(
      localStorage.getItem("matchedProfiles") || "[]",
    );
    setMatches(storedMatches);
  }, []);

  const openChat = (name: Name) => {
    router.push(`/chat/${name.first}-${name.last}`);
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Your Matches</h1>
      <div className="flex flex-wrap">
        {matches.map((match) => (
          <div
            key={match.email}
            className="m-2 transform cursor-pointer border p-4 transition-transform hover:scale-105"
            onClick={() => openChat(match.name)}
          >
            <img
              src={match.pictures[0]} // Assuming the first picture is displayed in matches
              alt={`${match.name.first} ${match.name.last}`}
              className="mb-2 h-24 w-24 rounded-full object-cover"
            />
            <h2 className="text-xl font-semibold">{`${match.name.first} ${match.name.last}`}</h2>
            <p>{match.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Matches;
