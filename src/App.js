import React from 'react'
import './App.css'
import Main from "./Main";
import State from "./State";

const App = () =>
  <State.Provider>
    <Main />
  </State.Provider>

export default App
