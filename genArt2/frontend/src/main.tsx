import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
// import { ClerkProvider } from "@clerk/clerk-react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./components/layouts/root-layout.tsx";

import IndexPage from "./pages/index.tsx";
// import SignInPage from "./pages/api/sign-in";
// import SignUpPage from "./pages/api/sign-up";
import AboutUs from "./pages/AboutUs.tsx";
// import ArtistsPage from "./pages/ArtistsPage.tsx";
// import ProtectedRoute from "./components/ProtectedRoute.tsx";
import GalleryPage from "./pages/rooms/GalleryPage.tsx";
// import Artists from "./components/Artists.tsx";
import HellenisticGallery from "./pages/rooms/HellenisticRoom.tsx";
import RoomVisualizer from "./components/common/RoomVisualizer.tsx";
import GalleryDetail from "./components/common/GalleryDetail.tsx";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <IndexPage /> },
      {
        path: "/gallery/all",
        element: <GalleryPage />,
      },
      {
        path: "/gallery/:period",
        element: <GalleryDetail />, // A new component for displaying gallery details
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
    ],
  },
]);

// // Import your publishable key
// const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// if (!PUBLISHABLE_KEY) {
//   throw new Error("Missing Publishable Key");
// }

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <ClerkProvider publishableKey={PUBLISHABLE_KEY}> */}
    <RouterProvider router={router} />
    {/* </ClerkProvider> */}
  </React.StrictMode>
);
