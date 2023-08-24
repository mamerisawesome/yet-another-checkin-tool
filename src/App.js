import React from 'react';

import Main from './Main';
import Goals from './state/Goals';
import Checkins from './state/Checkins';

import './App.css'

const App = () => {
  return (
    <Goals.Provider>
      <Checkins.Provider>
        <Main />
      </Checkins.Provider>
    </Goals.Provider>
  );
};

export default App;
