import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home/Home'

import CompanyDashboard from './components/company/companyDashboard'
import Product from './components/Product'
import Plan from './components/company/Plan'
import Search from './components/User/Search'
import UserDashboard from './components/User/UserDashboard'

function App() {

  return (
  <Router>
    <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/register" element={<Register/>} />
    <Route path="/login" element={<Login/>} />
    
    <Route path="/company" element={<CompanyDashboard/>}>
    <Route path="product" element={<Product/>} />
    <Route path='plan' element={<Plan/>}/>
    </Route>
    
    <Route path="/user" element={<UserDashboard/>}>
    <Route path="search" element={<Search/>}/>
    </Route>

    </Routes>
  </Router>
)}

export default App
