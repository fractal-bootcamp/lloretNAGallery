// src/layouts/root-layout.tsx

import { Link } from "react-router-dom";
// import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import RoomVisualizer from "../../components/common/RoomVisualizer";
import React, { useEffect, useState } from "react";
// import { useAuth } from "@clerk/clerk-react";
import "../../styles/index.css";
import { Room, Rooms } from "../../../shared/types/models";

interface HellenisticGalleryProps {
  rooms: Rooms;
}

export default function HellenisticGallery({ rooms }) {
  const selectedRoom = rooms.find((r) => r.period === "HELLENISTIC");
  console.log("selected room HELLENISTIC", selectedRoom);
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
}
