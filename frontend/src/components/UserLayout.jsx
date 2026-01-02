import React from 'react'
import '../styles/Layout.css'
function UserLayout({ children }) {
    return (
        <div className="layout-container">

            <Navbar />

            <div className="layout-body">

                <Sidebar />

                <main className="layout-content">
                    {children}
                </main>

            </div>

        </div>
    )
}

export default UserLayout