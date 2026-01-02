import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";
import { Link } from "react-router-dom";

function AdminTickets() {

    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const token = localStorage.getItem("token");

    useEffect(() => {
        loadTickets();
    }, []);

    const loadTickets = async () => {
        try {
            const res = await axios.get(
                "http://localhost:3000/api/tickets/admin",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log("admin tickets", res.data);

            setTickets(res.data);

        } catch (err) {
            setError(err?.response?.data?.message || "Failed to load tickets");
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (d) =>
        new Date(d).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });

    const updateStatus = async (ticketId, newStatus) => {
        try {
            const res = await axios.put(
                `http://localhost:3000/api/tickets/${ticketId}/status`,
                { status: newStatus },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log("status updated", res.data);

            loadTickets();

        } catch (err) {
            alert("Failed to update status");
        }
    };


    return (
        <AdminLayout>

            <div className="dash-wrapper">

                <h2 className="dash-title">All Tickets</h2>
                <p className="dash-sub">View and manage support tickets</p>

                {loading && <p>Loading...</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}

                {!loading && !error && (
                    <div className="table-card">

                        <div className="table-header">
                            <h3>Tickets</h3>
                        </div>

                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>User</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Priority</th>
                                    <th>Status</th>
                                    <th>Created</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>

                                {tickets.map(t => (
                                    <tr key={t.id}>
                                        <td>#{t.id}</td>
                                        <td>{t.user_name || "—"}</td>
                                        <td>{t.title}</td>
                                        <td>{t.description}</td>
                                        <td>
                                            <span className={`priority ${t.priority?.toLowerCase()}`}>
                                                {t.priority}
                                            </span>
                                        </td>

                                        <td>
                                            <select
                                                value={t.status}
                                                onChange={(e) => updateStatus(t.id, e.target.value)}
                                            >
                                                <option value="OPEN">OPEN</option>
                                                <option value="IN_PROGRESS">IN_PROGRESS</option>
                                                <option value="RESOLVED">RESOLVED</option>
                                            </select>
                                        </td>


                                        <td>{formatDate(t.created_at)}</td>
                                        <td><Link to={`/tickets/${t.id}`}>
                                            <button className="response-btn">Response</button>
                                        </Link></td>

                                    </tr>
                                ))}

                            </tbody>

                        </table>

                    </div>
                )}

            </div>

        </AdminLayout>
    );
}

export default AdminTickets;
