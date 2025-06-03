import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './task.css';
import { formatDistanceToNow } from 'date-fns';

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      tempLabel: props.label,
    };
  }

  handleStartStop = () => {
    const { id, isTiming, onUpdate } = this.props;
    onUpdate(id, { isTiming: !isTiming });
  };

  formatTime = (ms) => {
    if (!Number.isFinite(ms) || ms < 0) return '00:00';
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
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
      isTiming,
      timeLeft,
    } = this.props;

    const { isEditing, tempLabel } = this.state;

    return (
      <li className={`task ${completed ? 'completed' : ''}`}>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(id)}
        />
        {isEditing ? (
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
        ) : (
          <>
            <label>{label}</label>
            <span className="created">
              created {formatDistanceToNow(created, { addSuffix: true })}
            </span>
            <div className="timer">
              <span>{this.formatTime(timeLeft)}</span>
              <button
                type="button"
                onClick={this.handleStartStop}
                disabled={timeLeft <= 0}
              >
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

export default Task;
