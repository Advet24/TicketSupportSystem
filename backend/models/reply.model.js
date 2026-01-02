import pool from "../config/db.js";

export const insertReply = (ticket_id, user_id, message) =>
    pool.query(
        "INSERT INTO ticket_replies(ticket_id,user_id,message) VALUES (?,?,?)",
        [ticket_id, user_id, message]
    );

export const getRepliesByTicket = (ticket_id) =>
    pool.query(
        `SELECT 
            r.*, 
            u.name, 
            u.role
        FROM ticket_replies r 
        JOIN users u ON u.id = r.user_id
        WHERE r.ticket_id = ?
        ORDER BY r.created_at ASC`,
        [ticket_id]
    );


