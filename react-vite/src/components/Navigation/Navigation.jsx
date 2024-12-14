import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <div className="nav-container">

      <div className="nav-bar">
        <ul className="nav-list">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>

          <li>
            <ProfileButton />
          </li>
        </ul>
      </div>

      <div id="nav-title">
        <h1>Scanner Archive</h1>
      </div>
      <div className="nav-search-container">
      <div className="nav-search-bar">

        <label>Search:</label>
        <input
          placeholder="Search for an image..."
        >
        </input>
        </div>
        <div className="nav-search-text">

        <p>Enter a Tag name to find all captures with the provided tag name</p>
        <p>If you have a capture ID you can enter it to find an exact capture</p>
        </div>
      </div>
      </div>


  );
}

export default Navigation;
