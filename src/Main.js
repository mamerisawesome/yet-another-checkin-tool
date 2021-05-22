import React from 'react'
import styled from "styled-components"
import './App.css'

import Goals from "./Goals";
import Checkins from "./Checkins";
import Dashboard from "./Dashboard";

const Main = ({className}) => (
  <div className={className}>
    {[Goals, Checkins, Dashboard].map(Component => <Component />)}
  </div>
)

export default styled(Main)`
  display: flex;
  padding: 5px;
  border: 2px solid red;
  border-radius: 5px;

  > div {
    margin: 10px;
    padding: 10px;
    border: 1px solid grey;
    border-radius: 5px;
  }
`
