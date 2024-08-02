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
import HellenisticGallery from "./pages/art/HellenisticRoom";
import RoomVisualizer from "./components/common/RoomVisualizer.tsx";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <IndexPage /> },
      {
        path: "/gallery",
        element: <GalleryPage />, // This is the base component for the gallery
        children: [
          { path: "", element: <GalleryPage content="overview" /> }, // Overview or default content
          {
            path: "hellenistic",
            element: <RoomVisualizer content="Hellenistic" />,
          },
          // {
          //   path: "Renaissance",
          //   element: <RoomVisualizer content="Renaissance" />,
          // },
          // Additional nested routes
        ],
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
