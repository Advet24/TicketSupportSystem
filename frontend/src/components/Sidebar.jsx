import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/Sidebar.css'

function Sidebar() {

    const navigate = useNavigate();
    return (
        <div className="sidebar">

            <h3 className="sidebar-logo">My Apps</h3>

            <ul>
                <li onClick={() => navigate("/dashboard")}>Dashboard</li>
                <li onClick={() => navigate("/tickets")}>My Tickets</li>
                <li onClick={() => navigate("/profile")}>Profile</li>
            </ul>

        </div>
    )
}

export default Sidebar