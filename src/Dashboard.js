import React from 'react'

import Goals from './state/Goals'
import Checkins from './state/Checkins'

const Dashboard = () => {

  const {goals, selectedWeek} = Goals.useContainer()
  const checkins = Checkins.useContainer()

  const getBar = goal => {
    return '[|||||.....]'
  }

  const getWeekDates = week => {
    const dates = []
    for (let i = 0; i <= 6; i++){
      const date = new Date(week)
      date.setDate(date.getDate() + i)
      dates.push(date.toISOString().split("T")[0])
    }
    return dates
  }

  const getWeekCheckins = (selectedWeek, checkins) => {
    const dates = getWeekDates(selectedWeek)
    const {entries} = checkins
    let results = []
    for (const date of dates){
      if (entries[date]){
        results = results.concat(Object.entries(entries[date]))
      }
    }
    return results
  }

  const getActualHours = goal => {
    const weekCheckins = getWeekCheckins(selectedWeek, checkins)
    return 'N'
  }

  return (
    <table>
      <tbody>
        <tr>
          <th>Goal</th>
          <th>Bar</th>
          <th>Actual hours</th>
          <th>Target hours</th>
          <th>% rendered</th>
        </tr>
        {goals().map(goal => (
          <tr key={goal.project}>
            <td>{goal.project}</td>
            <td>{getBar(goal)}</td>
            <td>{getActualHours(goal)}</td>
            <td>{goal.targetHrs}</td>
            <td>N%</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Dashboard
