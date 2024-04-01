// SaveToFavoritesButton.tsx
import React from "react";
import { client } from "~/trpc/react"; // Adjust the import path as necessary

interface SaveToFavoritesButtonProps {
  content: string; // The chatbot's response
  userInput: string; // The user's original query/input
}

const SaveToFavoritesButton: React.FC<SaveToFavoritesButtonProps> = ({
  content, // The chatbot's response
  userInput, // The user's original query/input
}) => {
  const handleSaveToFavorites = async () => {
    try {
      await client.openai.saveToFavorites.mutate({
        content,
        userInput,
        role: "system", // Assuming the saved content is always the system's response
        // Note: `userId` is removed from here as it will be determined server-side
      });
      console.log("Saved successfully");
    } catch (error) {
      console.error("Failed to save:", error);
    }
  };

  return (
    <button
      onClick={handleSaveToFavorites}
      className="save-btn"
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
      Save
    </button>
  );
};

export default SaveToFavoritesButton;
