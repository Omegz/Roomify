/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
"use client";
import React, { useEffect, useState } from "react";
import { client } from "~/trpc/react";
import CopyButton from "~/app/_components/Copy";

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
    <div className="container mx-auto px-4">
      <h1 className="mb-6 mt-4 text-2xl font-bold">Library</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {favorites.map((favorite) => (
          <div
            key={favorite.id}
            className="overflow-hidden rounded-lg border shadow-lg"
          >
            <div className="bg-gray-100 p-4">
              <p className="text-gray-800">{favorite.userInput}</p>
            </div>
            <hr />
            <div className="p-4">
              <p className="text-gray-800">{favorite.content}</p>
            </div>

            <CopyButton content={favorite.content} />
            <button
              onClick={() => handleRemove(favorite.id)}
              style={{
                marginLeft: "10px",
                padding: "5px",
                backgroundColor: "#d15c7f",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                margin: "5px",
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
