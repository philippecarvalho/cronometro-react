import React, { Component } from 'react'
import Cronometro from "./Cronometro"
import "./App.css"

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="Timer">
          <Cronometro />
        </div>
      </div>
    )
  }
}

export default App;