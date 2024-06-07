/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Location {
  street: { name: string; number: string };
  city: string;
  state: string;
  zip: string; // Added zip code
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
  homeownerStatus: string; // Added homeowner status
}

function UserPage() {
  const [user, setUser] = useState<PersonData | null>(null);

  useEffect(() => {
    const fakeUser: PersonData = {
      gender: "Male",
      name: { first: "Gay", last: "Doe" },
      dob: { age: 28 },
      pictures: ["/astronaut.png", "/profile2.jpg"],
      location: {
        street: { name: "", number: "" },
        city: "Bijlmermeer",
        state: "",
        zip: "020",
      },
      email: "gay.doe@example.com",
      phone: "555-1234",
      homeownerStatus: "Homeowner", // Or "Looking for a place"
    };
    setUser(fakeUser);
  }, []);

  const handleHomeownerStatusChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (user) {
      setUser({ ...user, homeownerStatus: event.target.value });
    }
  };

  if (!user) {
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
        <h1 className="mb-4 text-2xl font-bold">User Profile</h1>
        <div className="mb-4">
          <img
            src={user.pictures[0]}
            alt={`${user.name.first} ${user.name.last}`}
            className="mb-4 h-32 w-32 rounded-full"
          />
        </div>
        <div className="rounded-md border p-4 shadow-md">
          <p className="mb-2">
            <strong>Name:</strong> {`${user.name.first} ${user.name.last}`}
          </p>
          <p className="mb-2">
            <strong>Zip Code:</strong> {user.location.zip}
          </p>
          <p className="mb-2">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="mb-2">
            <strong>Phone:</strong> {user.phone}
          </p>
          <p className="mb-2">
            <strong>Location:</strong>{" "}
            {`${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}`}
          </p>
          <p className="mb-2">
            <strong>Age:</strong> {user.dob.age}
          </p>
          <p className="mb-2">
            <strong>Gender:</strong> {user.gender}
          </p>
          <p className="mb-2">
            <strong>Homeowner Status:</strong>
            <div className="ml-2">
              <label className="mr-4">
                <input
                  type="radio"
                  value="Homeowner"
                  checked={user.homeownerStatus === "Homeowner"}
                  onChange={handleHomeownerStatusChange}
                  className="mr-2"
                />
                Homeowner
              </label>
              <label>
                <input
                  type="radio"
                  value="Looking for a place"
                  checked={user.homeownerStatus === "Looking for a place"}
                  onChange={handleHomeownerStatusChange}
                  className="ml-5 mr-2"
                />
                Looking for a place
              </label>
            </div>
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
