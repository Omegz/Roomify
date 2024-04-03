/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
"use client";
import React, { useEffect, useState } from "react";
import { client } from "~/trpc/react";
import UserInfoDisplay from "~/app/_components/UserInfoDisplay";
import Header from "~/app/_components/Header";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const handleRemove = async (id) => {
    await client.openai.removeFromFavorites.mutate({ id });
    refetch(); // Refetch favorites after removal
  };

  useEffect(() => {
    // Immediately invoke async function to fetch favorites
    (async () => {
      try {
        setIsLoading(true);
        // Use the query method and await its result
        const result = await client.openai.getFavorites.query();
        // Assuming result contains the data directly
        setFavorites(result);
      } catch (error) {
        setError(error);
        console.error("Failed to fetch favorites:", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []); // Empty dependency array ensures this effect runs once on mount

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <main>
      <Header />
      <div className="container mx-auto px-4">
        <UserInfoDisplay />
      </div>
    </main>
  );
};

export default FavoritesPage;
