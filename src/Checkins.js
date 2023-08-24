import { faChevronLeft, faChevronRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import React, { useMemo, useRef } from 'react';
import styled from 'styled-components';

import Button from './components/Button';
import CheckinTable from './components/CheckinTable';
import CheckinValidation from './components/CheckinValidation';
import Input from './components/Input';
import Header from './components/Header';
import IconButton from './components/IconButton';
import Select from './components/Select';
import Textarea from './components/Textarea';
import { BoxShadow, Colors, DefaultMediaBreakpoint, getSize } from './constants';
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
    clearEntries,
    shouldPlayAlert,
  } = CheckinsState.useContainer()

  const { goals, createNewGoal } = GoalsState.useContainer()

  // load the goals once and avoid state refresh
  const currentGoals = useMemo(
    () => goals.map(({ project }) => ({ label: project, value: project })),
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
      if (+i === entries.length - 1) {
        break
      }

      const e = entries[i];

      if (!isLogged(e)) {
        continue
      }

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
    // TODO: Change `execCommand` as it is deprecated
    document.execCommand('copy')
    alert('Copied to clipboard!')
  }

  const importState = () => {
    setState(JSON.parse(window.prompt('Enter state here:')))
  }

  return (
    <Container>
      <h1>Checkins</h1>

      <div>
        <Header>Selected Date</Header>

        <DateActions>
          <Button onClick={selectToday}>Today</Button>
          <DatePagination>
            <IconButton icon={faChevronLeft} onClick={backOneDay} />
            {selectedDate}
            <IconButton icon={faChevronRight} onClick={forwardOneDay} />
          </DatePagination>
        </DateActions>
      </div>

      <p>
        Make sure your project starts with #. Otherwise, the activity entry is treated as non-work (break, lunch, etc.)
      </p>

      <div>
        <Header>Input</Header>
        <InputsContainer>
          <Select
            id='checkins-select'
            styles={{ input: (styles) => ({ ...styles,  height: '20px' }) }}
            options={currentGoals}
            ref={projectRef}
            onCreateOption={(newGoal) => {
              createNewGoal(newGoal)
              projectRef.current.select.onChange(
                { label: newGoal, value: newGoal },
                { action: 'select-option' }
              )
            }}
            isValidNewOption={(inputVal) => inputVal[0] === '#'}
            onKeyDown={(e) => getInputRef(projectRef).value[0] !== '#' && handleKeyPress(e)}
            placeholder='#project / out / break / lunch'
            formatCreateLabel={inputValue => `Enter "${inputValue}"`}
          />
          <TasksInput ref={tasksRef} placeholder='stuff, i, did (optional)' onKeyDown={handleKeyPress} />
          <span><i>(Press enter)</i></span>
        </InputsContainer>
      </div>

      <div>
        <Header>
          Entries
          <Button onClick={confirmClearEntries}>
            Clear
          </Button>
        </Header>
        {sortedEntries().length
          ? (
            <CheckinContainer>
              <CheckinTable>
                <tbody>
                  {sortedEntries().map((e) => (
                    <tr key={e.id}>
                      {['project', 'tasks', 'date', 'hour', 'minute'].map(field => {
                        return (
                          <td key={field}>
                            <Input value={e[field] || ""} onChange={ev => updateEntry(e.id, field, ev.target.value)} />
                          </td>
                        )
                      })}
                      <td>
                        <IconButton icon={faTrash} onClick={_ => deleteEntry(e.id)} />
                      </td>
                    </tr>
                  )
                  )}
                </tbody>
              </CheckinTable>
            </CheckinContainer>
          )
          : <span>No checkins available</span>
        }
      </div>

      <OutputContainer>
        <Header>
          Output
          <Description isTargetMet={targetMet()} isInvalid={Number.isNaN(runningHours())}>
            {totalHours().toFixed(2)} hrs total
            going on <b>{runningHours().toFixed(4)}</b>
          </Description>
        </Header>
        <StyledTextarea value={output()} readOnly />
      </OutputContainer>

      <ExportTextarea ref={exportRef} value={JSON.stringify(state)} readOnly />
      <CheckinImportExport>
        <Button onClick={exportState}>Export</Button>
        <Button onClick={importState}>Import</Button>
      </CheckinImportExport>

      <CheckinValidation shouldPlayAlert={targetMet() && shouldPlayAlert} />
    </Container>
  )
}

const Container = styled.div`
  grid-area: checkins;
`;

const DateActions = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${getSize()};
`;

const DatePagination = styled.div`
  display: flex;
  gap: ${getSize()};
  align-items: center;

  height: ${getSize('* 3.75')};
  margin: 0;
  padding: 0 ${getSize()};

  border: 1px solid ${Colors.grey4};
  border-radius: ${getSize('/ 2')};
  box-shadow: ${BoxShadow.primary};
`;

const CheckinContainer = styled.div`
  ${DefaultMediaBreakpoint} {
    overflow: scroll;
    contain: inline-size;
  }
`;

const InputsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 0.5fr;
  grid-gap: ${getSize()};
  align-items: center;

  & span {
    color: ${Colors.grey3};
  }

  ${DefaultMediaBreakpoint} {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
  }
`;

const Description = styled.span`
  color: ${Colors.grey1};
  background-color: ${(props) => props.isTargetMet ? Colors.success : Colors.danger}33;
  border: 1px solid ${(props) => props.isTargetMet ? Colors.success : Colors.danger};
  transition: 300ms background-color;

  border-radius: ${getSize('/ 2')};
  padding: ${getSize('/ 2')} ${getSize()};
  font-weight: 400;

  ${(props) => props.isInvalid ? 'background-color: ' + Colors.grey3 : ''}
`;

const CheckinImportExport = styled.div`
  display: flex;
  gap: ${getSize()};
`;

const OutputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${getSize('* 2')};
`;

const TasksInput = styled(Input)`
  width: auto;
`;

const StyledTextarea = styled(Textarea)`
  width: auto;
  height: 300px;
`;

const ExportTextarea = styled(Textarea)`
  position: absolute;
  top: -10000px;
`;

export default Checkins
