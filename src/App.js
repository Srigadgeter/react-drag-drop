import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    hr: 0,
    tasks: [
      {
        category: 'incomplete',
        name: 'task1',
        hours: 10
      },
      {
        category: 'incomplete',
        name: 'task2',
        hours: 50
      },
      {
        category: 'incomplete',
        name: 'task3',
        hours: 30
      },
      {
        category: 'incomplete',
        name: 'task4',
        hours: 20
      }
    ]
  };

  onDragStart = (e, name) => {
      console.log(name);
      e.dataTransfer.setData('name', name);
  }

  onDragOver = (e) => {
    e.preventDefault();
  }

  onDrop = (e, category) => {
    let name = e.dataTransfer.getData('name');

    let tasks = this.state.tasks.filter((task) => {
      if(task.name === name)
        task.category = category;

      return task;
    });

    this.setState({
      ...this.state,
      tasks
    });

  }
  
  findHours = () => {
    var temp = 0;

    this.state.tasks.forEach((t) => {
      if(t.category === "complete")
        temp += t.hours;
    })

    return temp;
  }

  componentDidUpdate(prevState) {
    let hrs = this.findHours();
    if(this.state.hr !== hrs){
      this.setState({hr: hrs});
    }
  }
  
  render() {
    
    const { hr, tasks} = this.state;
    
    var taskCards = {
      incomplete: [],
      complete: []
    };
    
    tasks.forEach((t) => {
      taskCards[t.category].push(
        <div 
        draggable
        onDragStart = { (e) => this.onDragStart(e, t.name) }
        className="items">
            <span id="taskName">{t.name.toUpperCase()}</span> <span id="hours">{t.hours} {t.hours > 1 ? "hrs" : "hr"}</span>
        </div>
      )
    });

    return (
      <div className="App">

        <div 
          className="tasks"
          onDragOver = { this.onDragOver }
          onDrop={ (e) => this.onDrop(e, "incomplete") }>
          <span id="taskTitle">TASKS</span>
          {taskCards.incomplete}
        </div>

        <div 
          className="project"
          onDragOver = { this.onDragOver }
          onDrop={ (e) => this.onDrop(e, "complete") }>
          <span id="projectTitle">PROJECTS</span>
          {taskCards.complete}
          <div id="footer">
            <span id="totalPrice">${hr * 20}</span> - 
            <span id="totalHours">{hr} Hours</span>
          </div>
        </div>
        
      </div>
    );
  }
}

export default App;