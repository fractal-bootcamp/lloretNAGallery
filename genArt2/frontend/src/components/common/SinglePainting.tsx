import React from "react";
import { Painting as PaintingType } from "@shared/types/models";

interface PaintingProps {
  id;
  title;
  description;
  createdAt;
  updatedAt;
  isPublished;
  isDeleted;
  negativePrompt;
  seed;
  imageUrl;
  frameTexture;
  frameColor;
  roomId;
  creatorId;
}

const SinglePainting = (props: PaintingProps) => {
  const { imageUrl, title, description, frameColor, frameTexture } = props;

  const frameStyles = {
    backgroundColor: frameColor || "#fff",
    border: frameTexture === "wood" ? "4px solid #8B4513" : "4px solid #000",
    borderRadius: "8px",
  };

  return (
    <div style={frameStyles} className="p-2">
      <img
        src={imageUrl}
        alt={description}
        className="w-auto h-auto object-contain max-w-[200px] max-h-[200px]"
      />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default SinglePainting;
