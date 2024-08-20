import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home/Home'
import Product from './components/Product'
import CompanyDashboard from './components/company/companyDashboard'

function App() {

  return (
  <Router>
    <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/register" element={<Register/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/product" element={<Product/>} />
    <Route path="/company" element={<CompanyDashboard/>}/>
    

    </Routes>
  </Router>
)}

export default App
