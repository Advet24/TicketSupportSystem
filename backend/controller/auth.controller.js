import { registerUser, loginUser } from "../services/auth.service.js";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        await registerUser(name, email, password);
        res.json({ msg: "Registered successfully" });
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
};

export const login = async (req, res) => {
    try {
        const data = await loginUser(req.body.email, req.body.password);
        res.json(data);
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
};
