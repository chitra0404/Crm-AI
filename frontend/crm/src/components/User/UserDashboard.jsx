import React from 'react'
import UserNavbar from '../Navbar/UserNavbar'
import { Outlet } from 'react-router-dom'

function UserDashboard() {
    return (
       <div>
        <UserNavbar/>
        <main style={{ marginTop: '60px' }}>
        <Outlet />
      </main>
       </div> 
    )
}

export default UserDashboard
