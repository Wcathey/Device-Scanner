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
                        <NavLink to="/captures/scan">
                            <FiUploadCloud className="icon" />
                            Capture
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/tags">
                            Directory
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/devices">
                            <MdDevicesOther className="icon" />
                            Devices
                        </NavLink>
                    </li>
                  
                </ul>
            </div>
        </div>
    )
}

export default HomePage;
