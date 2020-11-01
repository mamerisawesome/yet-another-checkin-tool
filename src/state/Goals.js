import { useState } from 'react'
import { createContainer } from "unstated-next"

const Goals = createContainer(() => {

  const [baseHours, _setBaseHours] = useState(localStorage.baseHours || 40)
  const [goalsStr, _setGoalsStr] = useState(localStorage.goals || '')

  const setBaseHours = e => _setBaseHours(localStorage.baseHours = e.target.value)
  const setGoalsStr = e => _setGoalsStr(localStorage.goals = e.target.value)

  const goals = () => {

    const [targetLine, ...lines] = goalsStr.split("\n")

    const weekStr = targetLine.split(" ").pop().slice(0, -1)

    return lines.map(line => {
      const [_, percentStr, project] = line.split(" ")
      const percentage = parseFloat(percentStr) / 100.0
      const targetHrs = baseHours * percentage
      return {project, targetHrs, percentage}
    }).sort((a, b) => b.targetHrs - a.targetHrs)

  }

  return {
    baseHours,
    setBaseHours,
    goalsStr,
    setGoalsStr,
    goals
  }

})

export default Goals
