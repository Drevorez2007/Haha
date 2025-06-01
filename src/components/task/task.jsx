import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './task.css';
import { formatDistanceToNow } from 'date-fns';

class Task extends Component {
  componentDidMount() {
    this.interval = setInterval(() => {
      if (this.props.isTiming) {
        this.forceUpdate();
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleStartStop = () => {
    const { id, isTiming, timeSpent, startTime, onUpdate } = this.props;

    if (isTiming) {
      const now = Date.now();
      const elapsed = now - startTime;
      onUpdate(id, {
        isTiming: false,
        startTime: null,
        timeSpent: timeSpent + elapsed,
      });
    } else {
      onUpdate(id, {
        isTiming: true,
        startTime: Date.now(),
      });
    }
  };

  formatTime = (ms) => {
    const total = Math.floor(ms / 1000);
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    return [h, m, s].map((val) => String(val).padStart(2, '0')).join(':');
  };

  render() {
    const {
      id,
      label,
      completed,
      created,
      onToggle,
      onDelete,
      onEdit,
      timeSpent,
      isTiming,
      startTime,
    } = this.props;

    const actualTime =
      isTiming && startTime ? timeSpent + (Date.now() - startTime) : timeSpent;

    const { isEditing, tempLabel } = this.state || {
      isEditing: false,
      tempLabel: label,
    };

    return (
      <li className={`task ${completed ? 'completed' : ''}`}>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(id)}
        />
        {isEditing ? (
          <>
            <input
              type="text"
              value={tempLabel}
              onChange={(e) => this.setState({ tempLabel: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  if (tempLabel.trim()) {
                    onEdit(id, tempLabel.trim());
                    this.setState({ isEditing: false });
                  }
                } else if (e.key === 'Escape') {
                  this.setState({ isEditing: false, tempLabel: label });
                }
              }}
            />
          </>
        ) : (
          <>
            <label>{label}</label>
            <span className="created">
              created {formatDistanceToNow(created, { addSuffix: true })}
            </span>
            <div className="timer">
              <span>{this.formatTime(actualTime)}</span>
              <button type="button" onClick={this.handleStartStop}>
                {isTiming ? '⏸' : '▶'}
              </button>
            </div>
            <button
              type="button"
              onClick={() =>
                this.setState({ isEditing: true, tempLabel: label })
              }
            >
              ✎
            </button>
            <button type="button" onClick={() => onDelete(id)}>
              ✖
            </button>
          </>
        )}
      </li>
    );
  }
}

Task.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  created: PropTypes.instanceOf(Date).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  timeSpent: PropTypes.number.isRequired,
  isTiming: PropTypes.bool.isRequired,
  startTime: PropTypes.number,
  onUpdate: PropTypes.func.isRequired,
};

export default Task;
