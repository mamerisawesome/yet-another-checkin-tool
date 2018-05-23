import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = JSON.parse(localStorage.getItem('state')) || {entries: []};
  }

  save(){
    localStorage.state = JSON.stringify(this.state);
  }

  addEntry(){

    var {project, tasks} = this.refs;

    var newEntry = {
      project: project.value,
      tasks: tasks.value,
      startTime: Date.now()
    };

    this.setState({
      entries: this.state.entries.concat([newEntry]),
    });

    project.value = null;
    tasks.value = null;

  }

  deleteEntry(entry){
    this.setState({entries: this.state.entries.filter(e => e === entry)});
  }

  clearEntries(){
    this.setState({entries: []});
  }

  output(){
    var lines = ['checkin'];
    var entries = this.state.entries;
    for (var i in entries){
      if (i === entries.length - 1) break;
      var e = entries[i];
      if (!e.project.startsWith('#')) continue;
      var duration = ((entries[+i+1].startTime - e.startTime) / 360000).toFixed(2);
      var line = ['-', duration, 'hrs', e.project, e.tasks].join(' ');
      lines.push(line);
    }
    return lines.join('\n');
  }

  handleKeyPress(e){
    if(e.which === 13){
      this.addEntry();
      this.refs.project.focus();
    }
  }

  render() {
    return (
      <div>

        <h1>Checkin</h1>

        <p>
          Make sure your project starts with #. Otherwise, the activity entry is treated as non-work (break, lunch, etc.)
        </p>

        <div>
          <h3>Input</h3>
          <input ref="project" placeholder="#project / out / break / lunch / whatever" onKeyPress={e => this.handleKeyPress(e)}/>
          <input ref="tasks" placeholder="stuff, i, did (optional)" onKeyPress={e => this.handleKeyPress(e)}/>
          <span>(Press enter)</span>
        </div>

        <div>
          <h3>
            Entries
            <button onClick={e => this.clearEntries()}>
              Clear
            </button>
          </h3>
          <table>
            {this.state.entries.map(e => {
              return (
                <tr>
                  <td>{e.project}</td>
                  <td>{e.tasks}</td>
                  <td>{new Date(e.startTime).toString().split(' ')[4]}</td>
                  <td>
                    <button className="delete" timestamp={e.startTime} onClick={e => this.deleteEntry(e)}>
                      X
                    </button>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>

        <div>
          <h3>Output</h3>
          <textarea value={this.output()} readOnly></textarea>
        </div>

      </div>
    );
  }

}

export default App;
