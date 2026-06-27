import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout'
import Home from './pages/Home'
import Documentation from './pages/Documentation'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}/>
          
          <Route index path="/home" element={<Home />}/>
        </Route>
        <Route path="/documentation" element={<Documentation />}/>
      </Routes>
    </Router>
  )
}

export default App
