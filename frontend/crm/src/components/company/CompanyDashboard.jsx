import React from 'react'
import CompanyNavbar from '../Navbar/CompanyNavbar'
import { Outlet } from 'react-router-dom'

function CompanyDashboard() {
    return (
        <div>
            <CompanyNavbar/>
            <main style={{ marginTop: '60px' }}>
        <Outlet />
      </main>
        </div>
    )
}

export default CompanyDashboard
