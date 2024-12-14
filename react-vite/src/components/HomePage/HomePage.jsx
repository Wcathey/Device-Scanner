import { NavLink } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { MdDevicesOther } from "react-icons/md";
import { FiUploadCloud } from "react-icons/fi";

import "./HomePage.css";

function HomePage() {
    return (
        <div className="hp-container">
            <div className="hp-side-bar">
                <ul className="hp-sb-list">
                    <li>
                        <NavLink to="/captures">
                            <FiUploadCloud className="icon" />
                            Captures
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/devices">
                            <MdDevicesOther className="icon" />
                            Devices
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/settings">
                            <IoSettingsOutline className="icon" />
                            Settings
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default HomePage;
