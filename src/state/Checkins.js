import { useState } from 'react'
import { createContainer } from "unstated-next"
import { useInterval } from './hooks'

const Checkins = createContainer(() => {

  const adjustForTimezone = (date:Date):Date => {
    const timeOffsetInMS:number = date.getTimezoneOffset() * 60000;
    date.setTime(date.getTime() - timeOffsetInMS);
    return date
  }

  const dateToDateStr = date => {
    const [dateStr] = date.toISOString().split('T')
    return dateStr
  }

  const getNow = () => adjustForTimezone(new Date())
  const [now, setNow] = useState(getNow())
  const [selectedDate, setSelectedDate] = useState(dateToDateStr(now))

  const selectToday = () => setSelectedDate(dateToDateStr(now))

  const offsetSelectedDateBy = days => {
    const date = new Date(selectedDate)
    date.setDate(date.getDate() + days)
    setSelectedDate(dateToDateStr(date))
  }

  const backOneDay = () => offsetSelectedDateBy(-1)
  const forwardOneDay = () => offsetSelectedDateBy(1)

  const isDate = str => /\d{4}-\d{2}-\d{2}/.exec(str)

  const timestampToDateStr = timestamp => {
    const date = new Date(parseInt(timestamp, 10))
    return dateToDateStr(date)
  }

  const update = initState => {
    const entryKeys = Object.keys(initState.entries)
    if (entryKeys.length){
      if (entryKeys.every(isDate)){
        return initState
      } else {
        const date = timestampToDateStr(entryKeys[0])
        return {...initState, entries: {[date]: initState.entries}
        }
      }
    } else {
      return initState
    }
  }

  const getInitState = () => {
    const initState = JSON.parse(localStorage.getItem('state')) || {}
    initState.entries = initState.entries || {}
    return update(initState)
  }

  const [state, setState] = useState(getInitState())

  const tick = () => setNow(getNow())

  const save = () => localStorage.state = JSON.stringify(state)

  const getStartTime = (entry) =>
    adjustForTimezone(new Date(`${entry.date} ${entry.hour}:${entry.minute}`)).getTime()

  const sortedEntries = () => {
    const entries = state.entries[selectedDate] || []
    return Object.values(entries).sort((x, y) =>
      getStartTime(x) - getStartTime(y))
  }

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

  const isLogged = entry => entry && entry.project && entry.project.startsWith('#')

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

  const addEntry = entry => {
    const newState = {...state}
    state.entries[selectedDate] = state.entries[selectedDate] || {}
    state.entries[selectedDate][entry.id] = entry
    setState(newState)
  }

  const updateEntry = (id, k, v) => {
    const newState = {...state}
    state.entries[selectedDate][id][k] = v
    setState(newState)
  }

  const deleteEntry = (id) => {
    const newState = {...state}
    delete newState.entries[selectedDate][id]
    setState(newState)
  }

  const clearEntries = () => {
    delete state.entries[selectedDate]
    setState(state)
  }

  return {
    addEntry,
    updateEntry,
    deleteEntry,
    clearEntries,
    selectedDate,
    now,
    state,
    setState,
    getStartTime,
    sortedEntries,
    totalHours,
    pendingHours,
    isLogged,
    targetMet,
    runningHours,
    selectToday,
    backOneDay,
    forwardOneDay,
    entries: state.entries,
    adjustForTimezone,
  }

})

export default Checkins
