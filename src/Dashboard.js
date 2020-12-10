import React from 'react'

import Goals from './state/Goals'
import Checkins from './state/Checkins'

const Dashboard = () => {

  const {goals, selectedWeek} = Goals.useContainer()
  const {entries, getStartTime, adjustForTimezone} = Checkins.useContainer()

  const getBar = goal => {
    const actualHours = getActualHours(goal)
    const {targetHrs} = goal

    return (
      <div style={{width: (10 * targetHrs), backgroundColor: 'white', border: '1px solid black'}}>
        <div style={{width: (10 * actualHours), backgroundColor: 'orange'}}>
          {getPercentRendered(goal)}%
        </div>
      </div>
    )
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

  const getWeekCheckins = selectedWeek => {
    const dates = getWeekDates(selectedWeek)
    let results = []
    for (const date of dates){
      if (entries[date]){
        results = results.concat(Object.entries(entries[date]))
      }
    }
    return results
  }

  const getActualHours = goal => {
    const weekCheckins = getWeekCheckins(selectedWeek)
    let total = 0
    for (let i in weekCheckins){
      const entry = weekCheckins[i][1]
      if (entry.project === goal.project){
        const nextEntry = weekCheckins[+i + 1]
        let endTime
        if (nextEntry){
          endTime = getStartTime(nextEntry[1])
        } else {
          endTime = adjustForTimezone(new Date()).getTime()
        }
        total += (endTime - getStartTime(entry)) / 3600000
      }
    }
    return total.toFixed(5)
  }

  const getPercentRendered = goal => {
    const actualHours = getActualHours(goal)
    const {targetHrs} = goal
    return (actualHours / targetHrs * 100).toFixed(2)
  }

  return (
    <table>
      <tbody>
        <tr>
          <th>Goal</th>
          <th>Actual hours</th>
          <th>Target hours</th>
          <th>Remaining hours</th>
          <th>Bar</th>
        </tr>
        {goals().map(goal => {
          const actualHours = getActualHours(goal)
          const remainingHours = (goal.targetHrs - actualHours).toFixed(2)
          return (
            <tr key={goal.project}>
              <td>{goal.project}</td>
              <td>{actualHours}</td>
              <td>{goal.targetHrs}</td>
              <td>{remainingHours}</td>
              <td>{getBar(goal)}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Dashboard
