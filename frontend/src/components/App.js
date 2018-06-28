import React, { Component } from 'react'
import ClientList from './ClientList'

import '../App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Quote Manager</h1>
        </header>
        <div>
          <ClientList />
        </div>
      </div>
    );
  }
}

export default App;
