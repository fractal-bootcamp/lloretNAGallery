import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RoomVisualizer from "../../components/common/RoomVisualizer";
import { Rooms, Room } from "../../../shared/types/models";
import { RoomService } from "../../services/galleryService";

const roomService = new RoomService();
// Simulating fetching data from a backend
const fetchRooms = async (): Promise<Rooms> => {
  try {
    const artData = await roomService.getAllRooms();
    console.log("artData", artData);
    if (artData) {
      console.log("Rooms fetched:", artData);
      return artData;
      // setSingleRoom(artData);
    }
  } catch (error) {
    console.error("Error fetching art:", error);
  }
};

const GalleryDetail: React.FC = () => {
  const { period } = useParams<{ period: string }>();
  const [rooms, setRooms] = useState<Rooms>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const roomsData = await fetchRooms();
      console.log("roomsData from GalleryDetail", roomsData);
      setRooms(roomsData);
      console.log("rooms after setRooms GalleryDetail", rooms);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (rooms.length > 0 && period) {
      console.log("period", period);
      const periodToUpperCase = period.toUpperCase();

      const room = rooms.find((r) => r.period === periodToUpperCase);
      console.log("room selected", room);
      setSelectedRoom(room || null);
    }
  }, [rooms, period]);

  return (
    <div>
      <main>
        {selectedRoom ? (
          <RoomVisualizer room={selectedRoom} />
        ) : (
          <p>Loading...</p>
        )}
      </main>
    </div>
  );
};

export default GalleryDetail;
