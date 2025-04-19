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

  handleKeyDown = (e) => {
    const { tempLabel } = this.state;
    const { onEdit, id, label } = this.props;

    if (e.key === 'Enter') {
      const trimmed = tempLabel.trim();
      if (trimmed !== '') {
        onEdit(id, trimmed);
        this.setState({ isEditing: false });
      }
    } else if (e.key === 'Escape') {
      this.setState({ isEditing: false, tempLabel: label });
    }
  };

  render() {
    const { id, label, completed, created, onToggle, onDelete } = this.props;
    const { isEditing, tempLabel } = this.state;

    return (
      <li className={`task ${completed ? 'completed' : ''}`}>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(id)}
        />
        {isEditing ? (
          <>
            <label htmlFor={`task-input-${id}`} style={{ display: 'none' }}>
              {label}
            </label>
            <input
              id={`task-input-${id}`}
              type="text"
              value={tempLabel}
              onChange={(e) => this.setState({ tempLabel: e.target.value })}
              onKeyDown={this.handleKeyDown}
            />
          </>
        ) : (
          <>
            <label htmlFor={`task-checkbox-${id}`}>{label}</label>
            <span className="created">
              created {formatDistanceToNow(created, { addSuffix: true })}
            </span>
            <button
              type="button"
              onClick={() => this.setState({ isEditing: true, tempLabel: label })}
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
};

export default Task;
