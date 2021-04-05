import React, { useMemo, useRef } from 'react'
import CreatableSelect from 'react-select/creatable';

import CheckinsState from "./state/Checkins";
import GoalsState from "./state/Goals";

const Checkins = () => {

  const {
    state,
    setState,
    getStartTime,
    sortedEntries,
    totalHours,
    isLogged,
    targetMet,
    runningHours,
    now,
    selectedDate,
    selectToday,
    backOneDay,
    forwardOneDay,
    addEntry,
    updateEntry,
    deleteEntry,
    clearEntries
  } = CheckinsState.useContainer()

  const { goals, goalsStr, setGoalsStr } = GoalsState.useContainer()

  // load the goals once and avoid state refresh
  const currentGoals = useMemo(
    () => goals().map(({ project }) => ({ label: project, value: project })),
    [goals]
  )

  const projectRef = useRef()
  const tasksRef = useRef()
  const exportRef = useRef()

  const getInputRef = (sourceRef) => sourceRef.current.select.select.inputRef
  const getSelectRef = (sourceRef) => sourceRef.current.select.props.value

  const addEntryAndClearInput = () => {

    const selectProjectValue = getSelectRef(projectRef) && getSelectRef(projectRef).value
    const projectValue = getInputRef(projectRef).value || selectProjectValue

    const [date, time] = now.toISOString().split('T')
    const [hour, minute] = time.split(':')

    const id = Date.now()
    const entry = {
      project: projectValue,
      tasks: tasksRef.current.value,
      date,
      hour,
      minute,
      id
    }

    addEntry(entry)

    if (getSelectRef(projectRef)) {
      projectRef.current.select.onChange(null, { action: 'select-option' })
    }
    getInputRef(projectRef).value = null
    tasksRef.current.value = null

  }

  const confirmClearEntries = () => {
    if (window.confirm('Are you sure you want to clear all entries for this date? You cannot undo this!')) {
      clearEntries()
    }
  }

  const output = () => {
    const lines = []
    const entries = sortedEntries()
    const date = entries.length ? entries[0].date : ''
    const header = `checkin ${date}`
    lines.push(header)
    for (const i in entries) {
      if (+i === entries.length - 1) break
      const e = entries[i]
      if (!isLogged(e)) continue
      const duration = ((getStartTime(entries[+i + 1]) - getStartTime(e)) / 3600000).toFixed(2)
      const line = ['-', duration, 'hrs', e.project, e.tasks].join(' ')
      lines.push(line)
    }
    return lines.join('\n')
  }

  const handleKeyPress = (e) => {
    if (e.which === 13) {
      addEntryAndClearInput()
      projectRef.current.focus()
    }
  }

  const exportState = () => {
    const target = exportRef.current
    target.focus()
    target.setSelectionRange(0, target.value.length)
    document.execCommand('copy')
    alert('Copied to clipboard!')
  }

  const importState = () => {
    setState(JSON.parse(window.prompt('Enter state here:')))
  }

  const createNewGoal = (newGoal) => {
    if (newGoal[0] === '#') {
      setGoalsStr({
        target: { value: `${goalsStr}\n- 0% ${newGoal}` },
      })
      projectRef.current.select.onChange(
        { label: newGoal, value: newGoal },
        { action: 'select-option' }
      )
    }
  }

  return (

    <div>

      <h1>Checkins</h1>

      <div>
        <h3>Selected Date</h3>
        <button onClick={selectToday}>Today</button>
        <button onClick={backOneDay}>&lt;</button>
        {selectedDate}
        <button onClick={forwardOneDay}>&gt;</button>
      </div>

      <p>
        Make sure your project starts with #. Otherwise, the activity entry is treated as non-work (break, lunch, etc.)
      </p>

      <div>
        <h3>Input</h3>
        <CreatableSelect
          id='checkins-select'
          styles={{ input: (styles) => ({ ...styles,  height: '20px' }) }}
          options={currentGoals}
          ref={projectRef}
          onCreateOption={createNewGoal}
          isValidNewOption={(inputVal) => inputVal[0] === '#'}
          onKeyDown={(e) => getInputRef(projectRef).value[0] !== '#' && handleKeyPress(e)}
          placeholder='#project / out / break / lunch / whatever'
          formatCreateLabel={inputValue => `Enter "${inputValue}"`}
        />
        <input id='task-input' ref={tasksRef} placeholder='stuff, i, did (optional)' onKeyPress={handleKeyPress} />
        <span>(Press enter)</span>
      </div>

      <div>
        <h3>
          Entries
          <button onClick={confirmClearEntries}>
            Clear
          </button>
        </h3>
        <table>
          <tbody>
            {sortedEntries().map(e => {
              return (
                <tr key={e.id}>
                  {['project', 'tasks', 'date', 'hour', 'minute'].map(field => {
                    return (
                      <td key={field}>
                        <input value={e[field] || ""} onChange={ev => updateEntry(e.id, field, ev.target.value)} />
                      </td>
                    )
                  })}
                  <td>
                    <button className='delete' onClick={_ => deleteEntry(e.id)}>
                      X
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div>
        <h3>
          Output [{totalHours().toFixed(2)} hrs total
          going on <span style={{color: targetMet() ? 'green' : '#000'}}>{runningHours().toFixed(4)}</span>]
        </h3>
        <textarea value={output()} readOnly />
      </div>

      <textarea id='export' ref={exportRef} value={JSON.stringify(state)} readOnly />
      <button onClick={e => exportState()}>Export</button>
      <button onClick={e => importState()}>Import</button>

      {
        targetMet()
          ? <iframe title='drugz' width='560' height='315' src='https://www.youtube.com/embed/olKXXF6iw2s?start=30&autoplay=1' frameBorder='0' allow='autoplay; encrypted-media' allowFullScreen />
          : null
      }

    </div>

  )
}

export default Checkins
