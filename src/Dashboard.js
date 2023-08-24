import React from 'react'
import styled from 'styled-components';

import Table from './components/Table'
import ProgressBar from './components/ProgressBar'
import Goals from './state/Goals'
import Checkins from './state/Checkins'

const Dashboard = () => {
  const {getGoalMap, selectedWeek} = Goals.useContainer()
  const {
    entries,
    getStartTime,
    adjustForTimezone,
    isLogged
  } = Checkins.useContainer()

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

  const getPercentRendered = (goal) => {
    const actualHours = getActualHours(goal);
    const { targetHrs } = goal;

    return (actualHours / targetHrs * 100).toFixed(2);
  }

  const projectsWorkedOn = [...new Set(getWeekCheckins(selectedWeek).map(
    ([_, entry]) => entry).filter(isLogged).map(_ => _.project))]

  const asGoal = project => getGoalMap()[project] || {
    project, targetHrs: 0, percentage: 0
  }

  return (
    <Container>
      <h1>Dashboard</h1>
      <p>This information is aggregated for the current week.</p>
      <StyledTable>
        <tbody>
          <tr>
            <th>Goal</th>
            <th>Actual hours</th>
            <th>Target hours</th>
            <th>Remaining hours</th>
            <th>Bar</th>
          </tr>
          {projectsWorkedOn.map(asGoal).map(goal => {
            const actualHours = getActualHours(goal)
            const remainingHours = (goal.targetHrs - actualHours).toFixed(2)
            return (
              <tr key={goal.project}>
                <td>{goal.project}</td>
                <td>{actualHours}</td>
                <td>{goal.targetHrs}</td>
                <td>{remainingHours}</td>
                <td>
                  <ProgressBar
                    actualHours={actualHours}
                    goal={goal}
                    progressPercent={getPercentRendered(goal)}
                  />
                </td>
              </tr>
            )
          })}
        </tbody>
      </StyledTable>
    </Container>
  )
};

const Container = styled.div`
  grid-area: dashboard;
`;

const StyledTable = styled(Table)`
  width: 100%;

  & td:last-child {
    width: 200px;
  }
`;

export default Dashboard;
