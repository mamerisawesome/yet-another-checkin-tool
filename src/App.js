import React from 'react'
import './App.css'

import Goals from "./state/Goals";
import Checkins from "./state/Checkins";

import Main from "./Main";

const App = () =>
  <Goals.Provider>
    <Checkins.Provider>
      <Main />
    </Checkins.Provider>
  </Goals.Provider>

export default App
