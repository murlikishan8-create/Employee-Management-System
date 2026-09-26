import React from 'react'

import NavBar from './components/NavBar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'


const App = () => {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
      </Routes>
    </Router>
  )
}

export default App
