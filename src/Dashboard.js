import React from 'react'

import Goals from './state/Goals'
// import Checkins from './state/Checkins'

const Dashboard = () => {

  const {
    goals
  } = Goals.useContainer()
  // const checkins = Checkins.useContainer()

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
            <td>[|||||.....]</td>
            <td>N</td>
            <td>{goal.targetHrs}</td>
            <td>N%</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Dashboard
