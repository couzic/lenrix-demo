import './App.css'

import React, { Component } from 'react'

import { BeerDetail } from './places/beer/BeerDetail'
import { Home } from './places/home/Home'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Home />
        <BeerDetail />
      </div>
    )
  }
}

export default App
