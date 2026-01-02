import express from "express";
import {
    createTicket,
    userTickets,
    adminTickets,
    ticketDetail,
    replyTicket,
    changeTicketStatus,
    getTicketStats,
    getRecentTickets,
    getTicketReplies
} from "../controller/ticket.controller.js";

import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth(), createTicket);
router.get("/", auth(), userTickets);
router.get("/admin", auth(["ADMIN"]), adminTickets);
router.get("/stats", auth(), getTicketStats);
router.get("/recent", auth(), getRecentTickets);
router.get("/:id", auth(), ticketDetail);
router.post("/:id/reply", auth(), replyTicket);
router.get("/:id/replies", auth(), getTicketReplies);
router.put("/:id/status", auth(["ADMIN"]), changeTicketStatus);

export default router;
