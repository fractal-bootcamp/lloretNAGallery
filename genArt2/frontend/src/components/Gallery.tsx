import React, { useEffect, useState } from "react";
// import { useAuth } from "@clerk/clerk-react";
import { RoomService } from "../services/galleryService";
import "../styles/index.css";
import {
  User,
  Painting,
  Room,
  ArtPeriod,
  Rooms,
} from "../../../shared/types/models";
import VisualizerList from "./common/VisualizerList";

//KEY ****
// Create an instance of RoomService
const roomService = new RoomService();

const artItemStyle: React.CSSProperties = {
  padding: "20px",
  border: "20px solid #ccc",
  borderRadius: "8px",
  maxWidth: "500px",
  width: "100%",
  height: "auto",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
};

const Gallery: React.FC = () => {
  const [gallery, setGallery] = useState<Rooms[]>([]);
  // const { getToken } = useAuth();

  useEffect(() => {
    const fetchAllRooms = async (): Promise<void> => {
      // try {
      //   console.log("Getting token");
      //   const token = await getToken();
      //   console.log("Token obtained:", token);

      //   if (!token) {
      //     console.error("No token found");
      //     return;
      //   }
      try {
        const artData = await roomService.getAllRooms();
        if (artData) {
          console.log("Rooms fetched:", artData);
          setGallery(artData);
        }
      } catch (error) {
        console.error("Error fetching art:", error);
      }
    };

    fetchAllRooms();
  }, []);

  // sorted by Date
  // const sortedArtList = [...artList].sort(
  //   (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  // );
  // const sortedWarnsdorffList = [...warnsdorffList].sort(
  //   (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  // );

  console.log("All rooms:", gallery);

  return (
    <div>
      <VisualizerList rooms={gallery} />
    </div>
  );
};
export default Gallery;
