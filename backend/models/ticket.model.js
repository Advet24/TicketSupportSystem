import pool from "../config/db.js";

export const insertTicket = (user_id, title, description, priority) =>
    pool.query(
        "INSERT INTO tickets(user_id,title,description,priority) VALUES (?,?,?,?)",
        [user_id, title, description, priority]
    );

export const getTicketsByUser = (user_id) =>
    pool.query("SELECT * FROM tickets WHERE user_id=?", [user_id]);

export const getAllTickets = () =>
    pool.query("SELECT t.*, u.name AS user_name FROM tickets t JOIN users u ON u.id = t.user_id");

export const getTicketById = (id) =>
    pool.query("SELECT * FROM tickets WHERE id=?", [id]);

export const updateTicketStatus = (status, id) =>
    pool.query("UPDATE tickets SET status=? WHERE id=?", [status, id]);


export const getTicketStatsByUser = (userId) =>
    pool.query(`
    SELECT 
      COUNT(*) as total,
      SUM(status='OPEN') as open,
      SUM(status='IN_PROGRESS') as in_progress,
      SUM(status='RESOLVED') as resolved
    FROM tickets
    WHERE user_id=?
  `, [userId]);

export const getTicketStatsAll = () =>
    pool.query(`
    SELECT 
      COUNT(*) as total,
      SUM(status='OPEN') as open,
      SUM(status='IN_PROGRESS') as in_progress,
      SUM(status='RESOLVED') as resolved
    FROM tickets
  `);

export const getRecentTicketsByUser = (userId) =>
    pool.query(
        "SELECT * FROM tickets WHERE user_id=? ORDER BY created_at DESC LIMIT 5",
        [userId]
    );

export const getRecentTicketsAll = () =>
    pool.query(`
    SELECT 
      t.*, 
      u.name AS user_name
    FROM tickets t
    JOIN users u ON u.id = t.user_id
    ORDER BY t.created_at DESC
    LIMIT 5
  `);

