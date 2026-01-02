import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";

function AdminUsers() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const token = localStorage.getItem("token");

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const res = await axios.get(
                "http://localhost:3000/api/users",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("users", res.data);
            setUsers(res.data);
        } catch (err) {
            setError(err?.response?.data?.message || "Failed to load users");
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateStr) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateStr).toLocaleDateString(undefined, options);
    }

    return (
        <AdminLayout>

            <div className="dash-wrapper">

                <h2 className="dash-title">Users</h2>
                <p className="dash-sub">View and manage platform users</p>

                {loading && <p>Loading...</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}

                {!loading && !error && (
                    <div className="table-card">

                        <div className="table-header">
                            <h3>All Users</h3>
                        </div>

                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Created</th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map(u => (
                                    <tr key={u.id}>
                                        <td>#{u.id}</td>
                                        <td>{u.name}</td>
                                        <td>{u.email}</td>
                                        <td>
                                            <span className={`badge ${u.role.toLowerCase()}`}>
                                                {u.role}
                                            </span>
                                        </td>
                                        <td>{formatDate(u.created_at)}</td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>

                    </div>
                )}

            </div>

        </AdminLayout>
    );
}

export default AdminUsers;
