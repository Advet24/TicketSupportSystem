import React from 'react'
import '../styles/Layout.css'

function AdminLayout({ children }) {
    return (
        <div className="layout-container">

            <header className="admin-header">
                <h2>Admin Panel</h2>
            </header>

            <div className="layout-body">

                <aside className="admin-sidebar">
                    <ul>
                        <li>Dashboard</li>
                        <li>All Tickets</li>
                        <li>Users</li>
                    </ul>
                </aside>

                <main className="layout-content">
                    {children}
                </main>

            </div>

        </div>
    )
}

export default AdminLayout