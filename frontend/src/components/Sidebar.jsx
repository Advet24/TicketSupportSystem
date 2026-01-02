import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";

import { FiHome, FiList, FiUser } from "react-icons/fi";

function Sidebar() {

    const navigate = useNavigate();

    return (
        <div className="sidebar">

            <h3 className="sidebar-logo">My Apps</h3>

            <ul>

                <li onClick={() => navigate("/dashboard")}>
                    <FiHome />
                    <span>Dashboard</span>
                </li>

                <li onClick={() => navigate("/tickets")}>
                    <FiList />
                    <span>My Tickets</span>
                </li>

                <li onClick={() => navigate("/profile")}>
                    <FiUser />
                    <span>Profile</span>
                </li>

            </ul>

        </div>
    );
}

export default Sidebar;
