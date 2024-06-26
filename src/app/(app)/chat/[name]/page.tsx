/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

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

function Chat() {
  const router = useRouter();
  const params = useParams();
  const name = params?.name as string | undefined;
  const [match, setMatch] = useState<PersonData | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

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

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setNewMessage("");
    }
  };

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
      <div className="flex h-screen flex-col p-4">
        <div className="mb-4 flex items-center">
          <img
            src={match.pictures[0]} // Use the first picture in the pictures array
            alt={`${match.name.first} ${match.name.last}`}
            className="h-16 w-16 cursor-pointer rounded-full"
            onClick={() => router.push(`/profile/${name}`)}
          />
          <h1 className="ml-4 text-2xl font-bold">
            {`${match.name.first} ${match.name.last}`}
          </h1>
        </div>
        <div className="mb-4 flex flex-grow flex-col overflow-y-auto rounded-md border p-4 shadow-md">
          {messages.length === 0 ? (
            <p className="text-center text-gray-500">No messages yet.</p>
          ) : (
            messages.map((message, index) => (
              <div key={index} className="mb-2 ml-40 flex w-1/2 justify-end  ">
                <p className="rounded-lg bg-blue-500 p-2 text-white">
                  {message}
                </p>
              </div>
            ))
          )}
        </div>
        <div className="flex items-center border-t p-2">
          <input
            type="text"
            className="flex-grow rounded-lg border p-2"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            className="ml-2 rounded-lg bg-blue-500 px-4 py-2 text-white"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
