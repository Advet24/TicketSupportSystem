import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import "../styles/Register.css";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Register() {

    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);

    const submit = async e => {
        e.preventDefault();

        const res = await axios.post(
            "http://localhost:3000/api/auth/register",
            form
        );
        console.log("res" , res.data);
        
        toast.success("Registration successful");

        navigate("/login");
    };

    return (
        <div className="register-layout">

            <div className="register-card">

                <h2>Create your account</h2>

                <p className="register-subtitle">
                    Join Support Hub and manage tickets smarter
                </p>

                <form onSubmit={submit}>

                    <label>Full Name</label>
                    <input
                        placeholder="John Carter"
                        onChange={e => setForm({ ...form, name: e.target.value })}
                    />

                    <label>Email</label>
                    <input
                        placeholder="example@mail.com"
                        onChange={e => setForm({ ...form, email: e.target.value })}
                    />

                    <label>Password</label>

                    <div className="password-box">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="********"
                            onChange={e => setForm({ ...form, password: e.target.value })}
                        />

                        <span
                            className="eye-icon"
                            onClick={() => setShowPassword(prev => !prev)}
                        >
                            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                        </span>
                    </div>

                    <button type="submit">Register</button>

                </form>

                <div className="switch-text">
                    Already have an account? <Link to="/login">Login</Link>
                </div>

            </div>

        </div>
    );
}

export default Register;
