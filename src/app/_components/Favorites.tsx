// SaveToFavoritesButton.tsx
import React from "react";
import { client } from "~/trpc/react"; // Adjust the import path as necessary

interface SaveToFavoritesButtonProps {
  content: string;
  role: "user" | "system";
}

const SaveToFavoritesButton: React.FC<SaveToFavoritesButtonProps> = ({
  content,
  role,
}) => {
  const handleSaveToFavorites = async () => {
    try {
      // Assuming your mutation for saving favorites is correctly set up in your tRPC router
      // and that 'favorites.add' is the correct path to this mutation.
      await client.openai.saveToFavorites.mutate({ content, role });
      console.log("Message saved to favorites successfully");
      // Optionally, you can add more feedback for the user here, e.g., showing a success message.
    } catch (error) {
      console.error("Failed to save message to favorites:", error);
      // Handle error feedback as well, if necessary.
    }
  };

  return (
    <button onClick={handleSaveToFavorites} className="save-btn">
      Save
    </button>
  );
};

export default SaveToFavoritesButton;
