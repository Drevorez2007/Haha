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

  componentDidMount() {
    this.timerID = setInterval(() => {
      this.setState((prev) => ({
        tasks: prev.tasks.map((task) => {
          if (!task.isTiming || task.timeLeft <= 0) return task;

          const newTimeLeft = task.timeLeft - 1000;
          return {
            ...task,
            timeLeft: newTimeLeft > 0 ? newTimeLeft : 0,
            isTiming: newTimeLeft > 0,
          };
        }),
      }));
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  handleEdit = (id, newLabel) => {
    this.setState((prev) => ({
      tasks: prev.tasks.map((t) =>
        t.id === id ? { ...t, label: newLabel } : t,
      ),
    }));
  };

  handleAdd = (label, duration) => {
    const newTask = {
      id: uuidv4(),
      label,
      completed: false,
      created: new Date(),
      timeLeft: duration,
      isTiming: false,
    };
    this.setState((prev) => ({ tasks: [...prev.tasks, newTask] }));
  };

  handleToggle = (id) => {
    this.setState((prev) => ({
      tasks: prev.tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t,
      ),
    }));
  };
  handleToggleTimer = (id) => {
    this.setState((prev) => ({
      tasks: prev.tasks.map((task) =>
        task.id === id ? { ...task, isTiming: !task.isTiming } : task,
      ),
    }));
  };

  handleDelete = (id) => {
    this.setState((prev) => ({
      tasks: prev.tasks.filter((t) => t.id !== id),
    }));
  };

  handleClearCompleted = () => {
    this.setState((prev) => ({
      tasks: prev.tasks.filter((t) => !t.completed),
    }));
  };

  handleFilterChange = (filter) => {
    this.setState({ filter });
  };

  handleUpdateTask = (id, updates) => {
    this.setState((prev) => ({
      tasks: prev.tasks.map((task) =>
        task.id === id ? { ...task, ...updates } : task,
      ),
    }));
  };

  render() {
    const { tasks, filter } = this.state;

    const filteredTasks = tasks.filter((t) => {
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
          onUpdate={this.handleUpdateTask}
        />

        <Footer
          count={tasks.filter((t) => !t.completed).length}
          filter={filter}
          onFilterChange={this.handleFilterChange}
          onClearCompleted={this.handleClearCompleted}
        />
      </section>
    );
  }
}

export default App;
