import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import "../styles/TicketThread.css";

function TicketThread() {

    const { id } = useParams();
    const token = localStorage.getItem("token");

    const [data, setData] = useState(null);
    const [message, setMessage] = useState("");

    const load = async () => {
        const res = await axios.get(`http://localhost:3000/tickets/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setData(res.data);
    };

    const send = async () => {
        await axios.post(`http://localhost:3000/tickets/${id}/respond`,
            { message },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessage("");
        load();
    };

    useEffect(() => { load(); }, []);
    if (!data) return "Loading...";

    return (
        <div className="ticket-layout">
            <div className="ticket-card">

                <h3 className="ticket-title">{data.ticket.title}</h3>
                <p className="ticket-desc">{data.ticket.description}</p>

                <h4 className="section-title">Conversation</h4>

                <div className="thread-box">
                    {data.responses.map(r => (
                        <div className="message" key={r.id}>
                            <div className="message-author">{r.name}</div>
                            <div className="message-text">{r.message}</div>
                        </div>
                    ))}
                </div>

                <div className="reply-area">
                    <input
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        placeholder="Type your reply..."
                    />
                    <button onClick={send}>Reply</button>
                </div>

            </div>
        </div>
    );

}

export default TicketThread