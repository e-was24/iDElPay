import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout'
import Home from './pages/Home'
import Documentation from './pages/Documentation'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}/>
          
          <Route path="/home" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
        </Route>
        <Route path='/Dashboard' element={<Dashboard />}>

        </Route>
        <Route path="/documentation" element={<Documentation />}/>
      </Routes>
    </Router>
  )
}

export default App
