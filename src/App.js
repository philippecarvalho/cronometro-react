import React, { Component } from 'react'
import Cronometro from "./Cronometro"
import Temporizador from "./Temporizador"
import Relogio from "./Relogio"
import "./App.css"

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Tabs>
          <TabList>
            <Tab>Temporizador</Tab>
            <Tab>Cronômetro</Tab>
            <Tab>Relógio</Tab>
          </TabList>

          <TabPanel>
            <Temporizador />
          </TabPanel>

          <TabPanel>
            <Cronometro />
          </TabPanel>

          <TabPanel>
            <Relogio />
          </TabPanel>

        </Tabs>
      </div>
    )
  }
}

export default App;