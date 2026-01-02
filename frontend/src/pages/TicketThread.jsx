import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";
import "../styles/TicketThread.css";

function TicketThread() {

    const { id } = useParams();
    const token = localStorage.getItem("token");

    const [data, setData] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        const res = await axios.get(
            `http://localhost:3000/api/tickets/${id}`,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        setData(res.data);
    };

    const sendReply = async () => {
        if (!message.trim()) return;

        await axios.post(
            `http://localhost:3000/api/tickets/${id}/reply`,
            { message },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        setMessage("");
        load();
    };

    if (!data) return <Layout>Loading...</Layout>;

    const t = data.ticket;

    return (
        <Layout>

            <div className="ticket-container">



                <div className="ticket-thread">
                    <h4>Conversation</h4>

                    {data.replies.map(r => (
                        <div
                            key={r.id}
                            className={`reply-box ${r.role === "ADMIN" ? "admin-reply" : "user-reply"}`}
                        >
                            <div className="reply-header">
                                <strong>
                                    {r.name} {r.role === "ADMIN" && "(Support)"}
                                </strong>

                                <span className="reply-time">
                                    {new Date(r.created_at).toLocaleString()}
                                </span>
                            </div>

                            <div className="reply-message">
                                {r.message}
                            </div>
                        </div>
                    ))}

                </div>

                <div className="reply-form">
                    <textarea
                        placeholder="Write a reply..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button onClick={sendReply}>Send Reply</button>
                </div>

            </div>

        </Layout>
    );
}

export default TicketThread;
