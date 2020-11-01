import React from 'react'

import Goals from './state/Goals'
import Checkins from './state/Checkins'

const Dashboard = () => {

  const goals = Goals.useContainer()
  const checkins = Checkins.useContainer()

  return (
    <table>
      <tr>
        <th>Goal</th>
        <th>Bar</th>
        <th>Actual hours</th>
        <th>Target hours</th>
        <th>% rendered</th>
      </tr>
      <tr>
        <td>work</td>
        <td>[|||||||||.]</td>
        <td>9</td>
        <td>10</td>
        <td>90</td>
      </tr>
      <tr>
        <td>work2</td>
        <td>[|||||||...]</td>
        <td>7</td>
        <td>10</td>
        <td>70</td>
      </tr>
    </table>
  )
}

export default Dashboard
