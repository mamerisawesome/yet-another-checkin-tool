import { useState } from 'react'
import { createContainer } from "unstated-next"

const Goals = createContainer(() => {

  const getCurrentWeek = () => {
    const tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    const date = new Date(Date.now() + tzoffset)
    const weekDay = date.getDay()
    const daysSinceLastMonday = (weekDay + 6) % 7
    date.setDate(date.getDate() - daysSinceLastMonday)
    const [monDate] = date.toISOString().split('T')
    return monDate
  }

  const [baseHours, _setBaseHours] = useState(localStorage.baseHours || 40)
  const [goalsStr, _setGoalsStr] = useState(localStorage.goals || '')
  const [selectedWeek, setSelectedWeek] = useState(localStorage.selectedWeek || getCurrentWeek())

  const setBaseHours = e => _setBaseHours(localStorage.baseHours = e.target.value)
  const setGoalsStr = e => _setGoalsStr(localStorage.goals = e.target.value)

  const getGoals = () => {
    const lines = goalsStr.split("\n")
    return lines.map(line => {
      const [percentStr, project] = line.split(" ").slice(1)
      const percentage = parseFloat(percentStr) / 100.0
      const targetHrs = baseHours * percentage
      return {project, targetHrs, percentage}
    }).sort((a, b) => b.targetHrs - a.targetHrs)
  }

  const getGoalMap = () => Object.fromEntries(
    getGoals().map(_ => [_.project, _]))

  const adjustSelectedWeek = weeks => {
    const newDate = new Date(selectedWeek)
    newDate.setDate(newDate.getDate() + (7 * weeks))
    setSelectedWeek(newDate.toISOString().split("T")[0])
  }

  const backOneWeek = () => adjustSelectedWeek(-1)
  const forwardOneWeek = () => adjustSelectedWeek(1)

  return {
    baseHours,
    setBaseHours,
    goalsStr,
    setGoalsStr,
    selectedWeek,
    backOneWeek,
    forwardOneWeek,
    getGoalMap
  }

})

export default Goals
