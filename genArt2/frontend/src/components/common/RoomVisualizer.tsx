import React from "react";
import SinglePainting from "./SinglePainting"; // Adjust path if needed

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

interface RoomVisualizerProps {
  room: Room;
}

const RoomVisualizer: React.FC<RoomVisualizerProps> = ({ room }) => {
  return (
    <div className=" bg-slate-400">
      <h1>{room.name}</h1>
      <h2>{room.period}</h2>
      <h3>{room.description}</h3>
      <div className="grid grid-cols-3 gap-4">
        {room.paintings.length > 0 ? (
          room.paintings.map((painting) => (
            <div key={painting.id} className="border p-4 rounded">
              <SinglePainting
                id={painting.id}
                title={painting.title}
                description={painting.description}
                createdAt={painting.createdAt}
                updatedAt={painting.updatedAt}
                isPublished={painting.isPublished}
                isDeleted={painting.isDeleted}
                prompt={painting.prompt}
                negativePrompt={painting.negativePrompt}
                seed={painting.seed}
                imageUrl={painting.imageUrl}
                frameTexture={painting.frameTexture}
                frameColor={painting.frameColor}
                roomId={painting.roomId}
                creatorId={painting.creatorId}
              />
            </div>
          ))
        ) : (
          <p>No paintings available in this room.</p>
        )}
      </div>
    </div>
  );
};

export default RoomVisualizer;
