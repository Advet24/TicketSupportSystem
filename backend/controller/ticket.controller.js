import {
    createTicketService,
    getUserTicketsService,
    getAdminTicketsService,
    getTicketDetailService,
    addReplyService,
    updateStatusService,
    fetchAdminRecentTickets,
    fetchUserRecentTickets,
    fetchAdminTicketStats,
    fetchUserTicketStats
} from "../services/ticket.service.js";

export const createTicket = async (req, res) => {
    await createTicketService(
        req.user.id,
        req.body.title,
        req.body.description,
        req.body.priority
    );
    res.json({ msg: "Ticket created" });
};

export const userTickets = async (req, res) => {
    const [rows] = await getUserTicketsService(req.user.id);
    res.json(rows);
};

export const adminTickets = async (req, res) => {
    const [rows] = await getAdminTicketsService();
    res.json(rows);
};

export const ticketDetail = async (req, res) => {
    const data = await getTicketDetailService(req.params.id);
    res.json(data);
};

export const replyTicket = async (req, res) => {
    await addReplyService(req.params.id, req.user.id, req.body.message);
    res.json({ msg: "Reply added" });
};

export const changeTicketStatus = async (req, res) => {
    await updateStatusService(req.params.id, req.body.status);
    res.json({ msg: "Status updated" });
};

export const getTicketStats = async (req, res) => {
    try {
        const user = req.user;

        const stats =
            user.role === "ADMIN"
                ? await fetchAdminTicketStats()
                : await fetchUserTicketStats(user.id);

        res.json(stats);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getRecentTickets = async (req, res) => {
    try {
        const user = req.user;

        const tickets =
            user.role === "ADMIN"
                ? await fetchAdminRecentTickets()
                : await fetchUserRecentTickets(user.id);

        res.json(tickets);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getTicketReplies = async (req, res) => {
    const [rows] = await getRepliesByTicket(req.params.id);
    res.json(rows);
};
