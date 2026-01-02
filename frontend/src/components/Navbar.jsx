import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Navbar.css'
import toast from 'react-hot-toast';

function Navbar() {


    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        toast.success("Logged out successfully");
        navigate("/login");
    };



    return (
        <div className="navbar">

            <div className="navbar-left">
                <h2>Support Portal</h2>
            </div>

            <div className="navbar-right">
                <span>{localStorage.getItem("name")}</span>
                <button onClick={logout}>Logout</button>
            </div>

        </div>
    )
}

export default Navbar