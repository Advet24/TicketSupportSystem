import bcrypt from "bcryptjs";
import { findByEmail, createUser } from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";

export const registerUser = async (name, email, password) => {
    const [exists] = await findByEmail(email);
    if (exists.length) throw new Error("Email already exists");

    const hash = await bcrypt.hash(password, 10);
    await createUser(name, email, hash);
};

export const loginUser = async (email, password) => {
    const [rows] = await findByEmail(email);
    if (!rows.length) throw new Error("Invalid credentials");

    const valid = await bcrypt.compare(password, rows[0].password);
    if (!valid) throw new Error("Invalid credentials");

    return {
        token: generateToken(rows[0].id, rows[0].role),
        role: rows[0].role,
        name: rows[0].name
    };
};
