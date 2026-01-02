import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import '../styles/Layout.css'

function Layout({ children }) {
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

export default Layout