import React from 'react'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Home'
import Header from './Header'
import Analytics from './Analytics'
import Admin from './Admin'
import Login from './Login'
import './index.css'


function App() {
  return (
    <div className='App'>
     <Router>
      
      <Routes>
        <Route path="/" element={
          <>
          <Header />
          <Home />
          </>
          } />
      </Routes>
      {/* analytics page  */}
      <Routes>
        <Route path="/analytics" element={
          <>
          <Header />
          <Analytics />
          </>
          } />
      </Routes>

      {/* Admin page  */}
      <Routes>
        <Route path="/admin" element={
          <>
          <Header />
          <Admin />
          </>
          } />
      </Routes>

      {/* login page  */}
      <Routes>
        <Route path="/login" element={
          <>
          <Header />
          <Login />
          </>
          } />
      </Routes>
    </Router>
    </div>
  )
}

export default App