/* eslint-disable no-unused-vars */

import React from 'react';
import TaskList from '../task-list/task-list';
import NewTaskForm from '../new-task-form/new-task-form';
import Footer from '../footer/footer';
import './app.css';
import { v4 as uuidv4 } from 'uuid';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      filter: 'all',
    };
  }

  handleEdit = (id, newLabel) => {
    this.setState(prev => ({
      tasks: prev.tasks.map(t => (t.id === id ? { ...t, label: newLabel } : t)),
    }));
  };
  

  handleAdd = (label) => {
    const newTask = {
      id: uuidv4(),
      label,
      completed: false,
      created: new Date(),
    };
    this.setState(prev => ({ tasks: [...prev.tasks, newTask] }));
  };

  handleToggle = (id) => {
    this.setState(prev => ({
      tasks: prev.tasks.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      ),
    }));
  };

  handleDelete = (id) => {
    this.setState(prev => ({
      tasks: prev.tasks.filter(t => t.id !== id),
    }));
  };



  handleClearCompleted = () => {
    this.setState(prev => ({
      tasks: prev.tasks.filter(t => !t.completed),
    }));
  };

  handleFilterChange = (filter) => {
    this.setState({ filter });
  };

  render() {
    const { tasks, filter } = this.state;

    const filteredTasks = tasks.filter(t => {
      if (filter === 'active') return !t.completed;
      if (filter === 'completed') return t.completed;
      return true;
    });

    return (
      <section className="todo-app">
        <NewTaskForm onAdd={this.handleAdd} />
        <TaskList
          tasks={filteredTasks}
          onToggle={this.handleToggle}
          onDelete={this.handleDelete}
          onEdit={this.handleEdit}
        />
        <Footer
          count={tasks.filter(t => !t.completed).length}
          filter={filter}
          onFilterChange={this.handleFilterChange}
          onClearCompleted={this.handleClearCompleted}
        />
      </section>
    );
  }
}

export default App;