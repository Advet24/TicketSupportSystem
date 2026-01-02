import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Dashboard.css";
import AdminLayout from "../components/AdminLayout";
import { FiFolder, FiUsers, FiCheckCircle, FiClock, FiAlertCircle } from "react-icons/fi";

function AdminDashboard() {

  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };

      const statsRes = await axios.get(
        "http://localhost:3000/api/tickets/stats",
        { headers }
      );

      console.log("admin stats", statsRes.data);

      setStats(statsRes.data);

      const recentRes = await axios.get(
        "http://localhost:3000/api/tickets/recent",
        { headers }
      );
      console.log("admin recent", recentRes.data);


      setRecent(recentRes.data);

      const userData = await axios.get(
        "http://localhost:3000/api/users/count",
        { headers }
      );

      console.log("userData", userData.data);
      setStats(prev => ({ ...prev, total_users: userData.data.total }));


    } catch (err) {
      console.log(err);
    }
  };

  const formatDate = (dateStr) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  }

  return (
    <AdminLayout>

      <div className="dash-wrapper">

        {/* <h2 className="dash-title">Admin Dashboard</h2>
        <p className="dash-sub">System-wide ticket overview</p> */}

        {stats && (
          <div className="stats-row">

            <div className="stat-card">
              <div className="stat-icon">
                <FiFolder />
              </div>
              <div>
                <span className="stat-label">Total Tickets</span>
                <h3 className="stat-value">{stats.total}</h3>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <FiUsers />
              </div>
              <div>
                <span className="stat-label">Total Users</span>
                <h3 className="stat-value">{stats.total_users}</h3>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <FiAlertCircle />
              </div>
              <div>
                <span className="stat-label">Open</span>
                <h3 className="stat-value">{stats.open}</h3>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <FiClock />
              </div>
              <div>
                <span className="stat-label">Pending</span>
                <h3 className="stat-value">{stats.in_progress}</h3>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <FiCheckCircle />
              </div>
              <div>
                <span className="stat-label">Closed</span>
                <h3 className="stat-value">{stats.resolved}</h3>
              </div>
            </div>

          </div>

        )}

        <div className="table-card">

          <div className="table-header">
            <h3>Latest Tickets</h3>
          </div>

          <table>
            <thead>
              <tr>
                <th>Ticket</th>
                <th>User</th>
                <th>Title</th>
                <th>Description</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Created</th>
              </tr>
            </thead>

            <tbody>

              {recent.map(ticket => (
                <tr key={ticket.id}>
                  <td>#{ticket.id}</td>
                  <td>{ticket.user_name}</td>
                  <td>{ticket.title}</td>
                  <td>{ticket.description}</td>
                  <td>
                    <span className={`priority ${ticket.priority.toLowerCase()}`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${ticket.status.toLowerCase()}`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td>{formatDate(ticket.created_at)}</td>
                </tr>
              ))}

            </tbody>
          </table>

        </div>

      </div>

    </AdminLayout>
  );
}

export default AdminDashboard;
