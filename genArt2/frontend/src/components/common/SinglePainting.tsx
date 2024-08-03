import React from "react";
import { Painting as PaintingType } from "@shared/types/models";

interface PaintingProps {
  id?: string;
  title?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  isPublished?: boolean;
  isDeleted?: boolean;
  negativePrompt?: string;
  seed?: string;
  imageUrl?: string;
  frameTexture?: string;
  frameColor?: string;
  roomId?: string;
  creatorId?: string;
}

const SinglePainting = (props: PaintingProps) => {
  const { imageUrl, title, description } = props;

  // const frameStyles = {
  //   backgroundColor: frameColor || "#fff",
  //   border: frameTexture === "wood" ? "4px solid #8B4513" : "4px solid #000",
  //   borderRadius: "8px",
  // };

  return (
    <div className="p-2">
      <h3>{title}</h3>
      <img
        src={imageUrl}
        alt={description}
        className="w-auto h-auto object-contain max-w-[200px] max-h-[200px]"
      />

      <p>{description}</p>
    </div>
  );
};

export default SinglePainting;
