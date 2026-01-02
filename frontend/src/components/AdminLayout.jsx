import React from "react";
import "../styles/Layout.css";
import { FiHome, FiList, FiUsers, FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function AdminLayout({ children }) {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        toast.success("Logged out successfully");
        navigate("/login");
    };

    return (
        <div className="layout-container">

            <header className="admin-header">

                <h2>Admin Panel</h2>

                <div className="admin-actions">
                    <span>{localStorage.getItem("name")}</span>

                    <button onClick={logout} className="logout-btn">
                        <FiLogOut />
                        Logout
                    </button>
                </div>

            </header>

            <div className="layout-body">

                <aside className="admin-sidebar">

                    <ul>

                        <li>
                            <Link to="/admin" className="nav-link">
                                <FiHome />
                                <span>Dashboard</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/admin/alltickets" className="nav-link">
                                <FiList />
                                <span>All Tickets</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/admin/users" className="nav-link">
                                <FiUsers />
                                <span>Users</span>
                            </Link>
                        </li>

                    </ul>

                </aside>

                <main className="layout-content">
                    {children}
                </main>

            </div>

        </div >
    );
}

export default AdminLayout;
