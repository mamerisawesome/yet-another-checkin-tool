import React, {useState} from 'react'
import './App.css'

import Tabs from "./Tabs";
import Goals from "./Goals";
import Checkins from "./Checkins";
import Dashboard from "./Dashboard";

const Main = () => {

  const [currentTab, setCurrentTab] = useState('dashboard')

  return <Tabs tabs={{
    'goals': Goals,
    'checkins': Checkins,
    'dashboard': Dashboard,
  }} current={currentTab} setCurrent={setCurrentTab} />

}

export default Main
