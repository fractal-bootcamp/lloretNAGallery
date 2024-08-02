import { Link } from "react-router-dom";
import { useState } from "react";

export default function IndexPage() {
  return (
    <>
      <div className="py-7 flex-auto flex-col">
        <h1>The moving gallery</h1>
        <div className="py-7">
          <ul>
            <li></li>
            <li>
              <Link to="/gallery">Meet our gallery</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
