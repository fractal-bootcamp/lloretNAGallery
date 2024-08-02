import { Link, Outlet } from "react-router-dom";
import React from "react";
import Gallery from "../../components/Gallery";

const GalleryPage: React.FC = () => {
  return (
    <>
      <header>
        {/* <nav>
          <Link to="/gallery/Hellenistic">Hellenism * </Link>
          <Link to="/gallery/Baroque">Baroque * </Link>
          <Link to="/gallery/Neoclassicism">Neo classical * </Link>
          <Link to="/gallery/Realism">Realism * </Link>
          <Link to="/gallery/Vanguardism">Vanguards * </Link>
          <Link to="/gallery/Temporary">Temporary Exhibition * </Link>
        </nav> */}
      </header>
      <main>
        <div className="flex flex-col justify-center">
          <Gallery />
        </div>
      </main>
    </>
  );
};

export default GalleryPage;
