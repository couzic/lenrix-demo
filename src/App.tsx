import './App.css'

import React, { Component } from 'react'

import { BeerPage } from './pages/beer/BeerPage'
import { Home } from './pages/home/Home'

class App extends Component {
  render() {
    return (
      <div>
        <Home />
        <BeerPage />
      </div>
    )
  }
}

export default App
