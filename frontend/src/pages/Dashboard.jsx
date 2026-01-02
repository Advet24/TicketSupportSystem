import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Dashboard.css";
import Layout from "../components/Layout";


function Dashboard() {

    const [stats, setStats] = useState(null);
    const [recent, setRecent] = useState([]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("LOW");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [openModal, setOpenModal] = useState(false);

    const token = localStorage.getItem("token");

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const headers = { Authorization: `Bearer ${token}` };

            const statsRes = await axios.get(
                "http://localhost:3000/api/tickets/stats",
                { headers }
            );
            console.log("stats res", statsRes.data);

            setStats(statsRes.data);

            const recentRes = await axios.get(
                "http://localhost:3000/api/tickets/recent",
                { headers }
            );

            console.log("reecent res", recentRes.data);

            setRecent(recentRes.data);

        } catch (err) { }
    };

    const createTicket = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError("");

            const headers = { Authorization: `Bearer ${token}` };

            await axios.post(
                "http://localhost:3000/api/tickets",
                { title, description, priority },
                { headers }
            );

            setTitle("");
            setDescription("");
            setPriority("LOW");

            setOpenModal(false);

            loadData();

        } catch (err) {
            setError(err.response?.data?.message || "Failed to create ticket");
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateStr) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateStr).toLocaleDateString(undefined, options);
    }

    return (
        <Layout>

            <div className="dash-wrapper">

                <h2 className="dash-title">Dashboard</h2>
                <p className="dash-sub">Your ticket overview</p>

                <div className="new-ticket-btn">
                    <button onClick={() => setOpenModal(true)}>+ New Ticket</button>
                </div>

                {stats && (
                    <div className="stats-row">

                        <div className="stat-card">
                            <span className="stat-label">Total Tickets</span>
                            <h3 className="stat-value">{stats.total}</h3>
                        </div>

                        <div className="stat-card">
                            <span className="stat-label">Open</span>
                            <h3 className="stat-value">{stats.open}</h3>
                        </div>

                        <div className="stat-card">
                            <span className="stat-label">Pending</span>
                            <h3 className="stat-value">{stats.in_progress}</h3>
                        </div>

                        <div className="stat-card">
                            <span className="stat-label">Closed</span>
                            <h3 className="stat-value">{stats.resolved}</h3>
                        </div>

                    </div>
                )}

                <div className="table-card">

                    <div className="table-header">
                        <h3>Recent Tickets</h3>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th>Ticket ID</th>
                                <th>Subject</th>
                                <th>Description</th>
                                <th>Priority</th>
                                <th>Status</th>
                                <th>Created</th>
                            </tr>
                        </thead>

                        <tbody>

                            {recent.map(ticket => (
                                <tr key={ticket.id}>
                                    <td>#{ticket.id}</td>
                                    <td>{ticket.title}</td>
                                    <td>{ticket.description}</td>
                                    <td>
                                        <span className={`priority ${ticket.priority.toLowerCase()}`}>
                                            {ticket.priority}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`badge ${ticket.status.toLowerCase()}`}>
                                            {ticket.status}
                                        </span>
                                    </td>
                                    <td>{formatDate(ticket.created_at)}</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>

                </div>


                {openModal && (
                    <div className="modal-overlay">
                        <div className="modal-box">

                            <h3>Create Ticket</h3>

                            {error && <p className="error">{error}</p>}

                            <form onSubmit={createTicket}>

                                <input
                                    type="text"
                                    placeholder="Subject"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />

                                <textarea
                                    placeholder="Describe your issue"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />

                                <select
                                    value={priority}
                                    onChange={(e) => setPriority(e.target.value)}
                                >
                                    <option value="LOW">Low</option>
                                    <option value="MEDIUM">Medium</option>
                                    <option value="HIGH">High</option>
                                </select>

                                <div className="modal-actions">
                                    <button type="button" onClick={() => setOpenModal(false)}>Cancel</button>
                                    <button type="submit" disabled={loading}>
                                        {loading ? "Creating..." : "Create"}
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                )}

            </div>
        </Layout>
    );
}

export default Dashboard;
