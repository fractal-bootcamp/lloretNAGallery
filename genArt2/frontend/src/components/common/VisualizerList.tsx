import React, { useEffect, useState } from "react";
import { Painting, Room } from "../../../../shared/types/models";
//this component will take Room[] and display them individually

interface VisualizerListProps {
  rooms: Room[];
}

const VisualizerList: React.FC<VisualizerListProps> = ({ rooms }) => {
  const [arrayData, setArrayData] = useState([]);

  useEffect(() => {
    setArrayData(rooms);
  }, [rooms]);

  return (
    <>
      <div>
        {arrayData.map((room) => (
          <div key={room.id}>
            <h1>*** HERE IS A ROOM ****</h1>
            <h2>ROOM NAME: {room.name}</h2>
            <h3>ROOM PERIOD: {room.period}</h3>
            <h3>DESCRIPTION: {room.description}</h3>
            <br />
            <br />
            <div>
              {room.paintings.length > 0 ? (
                <ul>
                  {room.paintings.map((painting) => (
                    <li key={painting.id}>
                      <p>TITLE OF PAINTING:{painting.title}</p>
                      <p>DESCRIPTION OF PAINTING: {painting.description}</p>
                      <br />
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No paintings available for this room.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default VisualizerList;
