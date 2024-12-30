import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useDispatch, useSelector } from "react-redux";
import { getTagContentsByName } from "../../redux/tag";

function Navigation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [errors, setErrors] = useState({});

  const tags = useSelector(state => state.tag.tags)


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({})

    if (tags) {

      navigate(`/tags/${searchQuery}`)
    } else {
      setErrors({query: "No images found with that tag name"})
    }


  }
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
        <h1>Celeri-scan</h1>
      </div>
      <div className="nav-search-container">
        <div className="nav-search-bar">
        <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by tag name..."
            >
            </input>
            {errors.query && <p id="test">{errors.query}</p>}

            <button type="submit">Search</button>
            </form>
        </div>


      </div>
    </div>


  );
}

export default Navigation;
