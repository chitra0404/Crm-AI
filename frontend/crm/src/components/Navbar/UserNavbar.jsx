import React from 'react'
import { useNavigate } from 'react-router-dom';

function UserNavbar() {
    const navigate=useNavigate();
    const handleLogout=()=>{
        localStorage.removeItem("tokenAuth");
      
     navigate("/");
       
       
      }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand fs-3 fw-bolder"href="#"></a>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNavDropdown" 
                    aria-controls="navbarNavDropdown" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                            <a className="nav-link " href="/user/search">search</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                            
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link btn btn-primary me-2 custom-button" onClick={handleLogout}>Logout</a>
                        </li>
                      
                    </ul>
                </div>
            </div>
        </nav> 
    )
}

export default UserNavbar
