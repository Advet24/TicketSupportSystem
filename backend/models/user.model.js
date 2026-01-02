import pool from "../config/db.js";

export const findByEmail = (email) =>
    pool.query("SELECT * FROM users WHERE email=?", [email]);

export const createUser = (name, email, password) =>
    pool.query(
        "INSERT INTO users(name,email,password) VALUES (?,?,?)",
        [name, email, password]
    );

export const getAllUsers = () =>
    pool.query("SELECT id,name,email,role,created_at FROM users");

export const countUsers = () =>
    pool.query("SELECT COUNT(*) AS total FROM users");
