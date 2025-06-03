import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';

class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
      minutes: '',
      seconds: '',
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    if ((name === 'minutes' || name === 'seconds') && !/^\d*$/.test(value))
      return;
    this.setState({ [name]: value });
  };

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const { label, minutes, seconds } = this.state;
      const { onAdd } = this.props;

      if (!label.trim()) return;

      const min = Math.abs(parseInt(minutes, 10) || 0);
      const sec = Math.abs(parseInt(seconds, 10) || 0);

      const totalSeconds = min * 60 + Math.min(sec, 59);
      const duration = totalSeconds * 1000;

      onAdd(label.trim(), duration);
      this.setState({ label: '', minutes: '', seconds: '' });
    }
  };

  render() {
    const { label, minutes, seconds } = this.state;

    return (
      <form className="new-task-form" onSubmit={(e) => e.preventDefault()}>
        <input
          className="main-text"
          type="text"
          name="label"
          value={label}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          placeholder="What needs to be done?"
        />
        <input
          className="min"
          type="text"
          name="minutes"
          value={minutes}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          placeholder="Min"
        />
        <input
          className="sec"
          type="text"
          name="seconds"
          value={seconds}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          placeholder="Sec"
        />
      </form>
    );
  }
}

NewTaskForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default NewTaskForm;
