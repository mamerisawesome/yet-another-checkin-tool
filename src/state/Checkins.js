import { useState } from 'react'
import { createContainer } from "unstated-next"
import { useInterval } from './hooks'

const Checkins = createContainer(() => {

  const adjustForTimezone = (date:Date):Date => {
    const timeOffsetInMS:number = date.getTimezoneOffset() * 60000;
    date.setTime(date.getTime() - timeOffsetInMS);
    return date
  }

  const getNow = () => adjustForTimezone(new Date())
  const [now, setNow] = useState(getNow())

  const getInitState = () => {
    const initState = JSON.parse(localStorage.getItem('state')) || {}
    initState.entries = initState.entries || {}
    return initState
  }
  const [state, setState] = useState(getInitState())

  const tick = () => setNow(getNow())

  const save = () => localStorage.state = JSON.stringify(state)

  const getStartTime = (entry) =>
    adjustForTimezone(new Date(`${entry.date} ${entry.hour}:${entry.minute}`)).getTime()

  const sortedEntries = () => (
    Object.values(state.entries).sort((x, y) =>
      getStartTime(x) - getStartTime(y)))

  useInterval(tick, 100)
  useInterval(save, 1000)

  const totalHours = () => {
    var total = 0
    const entries = sortedEntries()
    for (const i in entries) {
      if (+i === entries.length - 1) break
      const e = entries[i]
      if (!isLogged(e)) continue
      total += (getStartTime(entries[+i + 1]) - getStartTime(e)) / 3600000
    }
    return total
  }

  const pendingHours = () => {
    const lastEntry = sortedEntries().pop()
    if (isLogged(lastEntry)) {
      return (now.getTime() - getStartTime(lastEntry)) / 3600000
    } else {
      return 0
    }
  }

  const isLogged = entry => entry && entry.project.startsWith('#')

  const runningHours = () => totalHours() + pendingHours()

  const celebrate = () => {
    (new Audio('https://syk0saje.gitlab.io/junk/alvot/audio/annyeong.mp3')).play()
    // alert("You've logged 8 hours today! \\o/ Go buy some drugs!");
  }

  const targetMet = () => {
    const met = runningHours() >= 8
    if (state.met !== met) {
      setState({...state, met})
      if (met) celebrate()
    }
    return met
  }

  return {
    now,
    state,
    setState,
    getStartTime,
    sortedEntries,
    totalHours,
    pendingHours,
    isLogged,
    targetMet,
    runningHours
  }

})

export default Checkins
