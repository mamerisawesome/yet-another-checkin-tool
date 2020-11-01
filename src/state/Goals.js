import { useState } from 'react'
import { createContainer } from "unstated-next"

const Goals = createContainer(() => {

  const [baseHours, _setBaseHours] = useState(localStorage.baseHours || 40)
  const [goalsStr, _setGoalsStr] = useState(localStorage.goals || '')

  const setBaseHours = e => _setBaseHours(localStorage.baseHours = e.target.value)
  const setGoalsStr = e => _setGoalsStr(localStorage.goals = e.target.value)

  return {
    baseHours,
    setBaseHours,
    goalsStr,
    setGoalsStr
  }

})

export default Goals
