import React from 'react'
import Navbar from './components/Navbar'
import Routes from './Routes'

const App = () => {
  if (!window.localStorage.getItem('cart')) window.localStorage.setItem('cart', '{}');

  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
