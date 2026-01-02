import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import authRoutes from "./routes/auth.routes.js";
import ticketRoutes from "./routes/ticket.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000;
app.get("/ping", (req,res)=>{
   res.json({ msg:"API OK" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

