import {
    insertTicket,
    getTicketsByUser,
    getAllTickets,
    getTicketById,
    updateTicketStatus,
    getTicketStatsByUser,
    getTicketStatsAll,
    getRecentTicketsByUser,
    getRecentTicketsAll
} from "../models/ticket.model.js";

import { insertReply, getRepliesByTicket } from "../models/reply.model.js";

export const createTicketService = (user_id, title, description, priority) =>
    insertTicket(user_id, title, description, priority);

export const getUserTicketsService = (user_id) =>
    getTicketsByUser(user_id);

export const getAdminTicketsService = () =>
    getAllTickets();

export const getTicketDetailService = async (ticket_id) => {
    const [[ticket]] = await getTicketById(ticket_id);
    const [replies] = await getRepliesByTicket(ticket_id);
    return { ticket, replies };
};

export const addReplyService = (ticket_id, user_id, message) =>
    insertReply(ticket_id, user_id, message);

export const updateStatusService = (ticket_id, status) =>
    updateTicketStatus(status, ticket_id);

export const fetchUserTicketStats = async (userId) => {
    const [rows] = await getTicketStatsByUser(userId);
    return rows[0];
};

export const fetchAdminTicketStats = async () => {
    const [rows] = await getTicketStatsAll();
    return rows[0];
};

export const fetchUserRecentTickets = async (userId) => {
    const [rows] = await getRecentTicketsByUser(userId);
    return rows;
};

export const fetchAdminRecentTickets = async () => {
    const [rows] = await getRecentTicketsAll();
    return rows;
};