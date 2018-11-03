import './App.css';

import React, { Component } from 'react';

import { Beer } from './places/beer/Beer';
import { Home } from './places/home/Home';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Home />
        <Beer />
      </div>
    );
  }
}

export default App;
