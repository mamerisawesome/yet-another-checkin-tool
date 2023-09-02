import React from 'react';

import Main from './Main';
import Goals from './state/Goals';
import Checkins from './state/Checkins';
import Config from './state/Config';

import './App.css'

const App = () => {
  return (
    <Goals.Provider>
      <Checkins.Provider>
        <Config.Provider>
          <Main />
        </Config.Provider>
      </Checkins.Provider>
    </Goals.Provider>
  );
};

export default App;
