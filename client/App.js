import React from 'react'
import Navbar from './components/Navbar'
import Routes from './Routes'
import Copyright from './components/Copyright'

const App = () => {
  if (!window.localStorage.getItem('cart')) {
    window.localStorage.setItem('cart', '[]')
  }

  return (
    <div>
      <Navbar />
      <Routes />
      <Copyright />
    </div>
  )
}

export default App
