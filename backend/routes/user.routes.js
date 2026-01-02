import express from "express";
import { auth } from "../middleware/auth.js";
import { listUsers, userCount } from "../controller/user.controller.js";

const router = express.Router();

router.get("/", auth(["ADMIN"]), listUsers);
router.get("/count", auth(["ADMIN"]), userCount);

export default router;
