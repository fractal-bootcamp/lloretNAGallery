import React from "react";
import { Link } from "react-router-dom";

interface PaintingProps {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  isPublished: boolean;
  isDeleted: boolean;
  prompt: string;
  negativePrompt: string;
  seed: string;
  imageUrl: string;
  frameTexture: string;
  frameColor: string;
  roomId: string;
  creatorId: string;
}

interface Room {
  id: string;
  name: string;
  period: string;
  description: string;
  paintings: PaintingProps[];
}

export type Rooms = Room[];

interface GalleryVisualizerProps {
  rooms: Rooms;
}

const GalleryVisualizer: React.FC<GalleryVisualizerProps> = ({ rooms }) => {
  // Function to get the first painting
  const getFirstPainting = (paintings: PaintingProps[]) => {
    if (paintings.length === 0) return null;
    return paintings[0];
  };

  return (
    <>
      <div>
        <h1 className="py-16 text-5xl">Gallery</h1>
        {rooms.map((room) => {
          const firstPainting = getFirstPainting(room.paintings);

          return (
            <div key={room.id} className="mb-12 py-6 flex justify-center">
              <Link
                to={`/gallery/${room.period}`}
                className="text-3xl font-bold"
              >
                {room.name}
              </Link>
              <p className="text-lg">{room.description}</p>
              {firstPainting && (
                <div className="mt-4">
                  {/* <img
                    src={firstPainting.imageUrl}
                    alt={firstPainting.title}
                    className="w-12 h-12 rounded-full object-cover"
                  /> */}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default GalleryVisualizer;
