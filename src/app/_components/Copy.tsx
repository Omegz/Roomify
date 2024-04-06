import React from "react";

interface CopyButtonProps {
  content: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ content }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      // Display a success message or perform another action indicating success
      console.log("Content copied to clipboard");
    } catch (err) {
      // Handle the error case
      console.error("Failed to copy content: ", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      style={{
        marginLeft: "10px",
        padding: "5px",
        backgroundColor: "#4e92e5",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        margin: "5px",
      }}
    >
      Copy
    </button>
  );
};

export default CopyButton;
