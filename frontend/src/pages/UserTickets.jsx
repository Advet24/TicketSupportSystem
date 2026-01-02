import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import "../styles/TicketModal.css";
import { Link } from "react-router-dom";

function UserTickets() {

    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);

    const token = localStorage.getItem("token");

    useEffect(() => {
        loadTickets();
    }, []);

    const loadTickets = async () => {
        try {
            const res = await axios.get(
                "http://localhost:3000/api/tickets",
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
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

    return (
        <Layout>

            <div className="dash-wrapper">

                <h2 className="dash-title">My Tickets</h2>
                <p className="dash-sub">View your submitted tickets</p>

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
                                    <th>Subject</th>
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
                                        <td>{t.title}</td>
                                        <td>{t.description}</td>

                                        <td>
                                            <span className={`priority ${t.priority?.toLowerCase()}`}>
                                                {t.priority}
                                            </span>
                                        </td>

                                        <td>
                                            <span className={`badge ${t.status?.toLowerCase()}`}>
                                                {t.status}
                                            </span>
                                        </td>

                                        <td>{formatDate(t.created_at)}</td>

                                        <td>
                                            <button className="view-btn"
                                                onClick={() => {
                                                    setSelected(t);
                                                    setOpen(true);
                                                }}
                                            >
                                                View
                                            </button>
                                            <Link to={`/tickets/${t.id}`}>
                                                <button className="response-btn">Response</button>
                                            </Link>
                                        </td>


                                    </tr>
                                ))}

                            </tbody>
                        </table>

                    </div>
                )}

                {/* ====================== MODAL ====================== */}
                {open && selected && (
                    <div className="ticket-overlay">
                        <div className="ticket-modal">

                            <button className="close-btn" onClick={() => setOpen(false)}>
                                ✖
                            </button>

                            <div className="ticket-card">

                                <h2 className="ticket-title">{selected.title}</h2>

                                <div className="ticket-row">
                                    <span>Ticket ID</span>
                                    <b>#{selected.id}</b>
                                </div>

                                <div className="ticket-row">
                                    <span>Description</span>
                                    <p>{selected.description}</p>
                                </div>

                                <div className="ticket-row">
                                    <span>Priority</span>
                                    <span className={`priority ${selected.priority.toLowerCase()}`}>
                                        {selected.priority}
                                    </span>
                                </div>

                                <div className="ticket-row">
                                    <span>Status</span>
                                    <span className={`badge ${selected.status.toLowerCase()}`}>
                                        {selected.status}
                                    </span>
                                </div>

                                <div className="ticket-row">
                                    <span>Created On</span>
                                    <b>{formatDate(selected.created_at)}</b>
                                </div>

                            </div>

                        </div>
                    </div>
                )}

            </div>

        </Layout>
    );
}

export default UserTickets;
