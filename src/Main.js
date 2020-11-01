import React, {useState} from 'react'
import './App.css'

import Tabs from "./Tabs";
import Checkins from "./Checkins";
import Goals from "./Goals";

const Main = () => {

  const [currentTab, setCurrentTab] = useState('goals')

  return <Tabs tabs={{
    'goals': Goals,
    'checkins': Checkins,
  }} current={currentTab} setCurrent={setCurrentTab} />

}

export default Main
