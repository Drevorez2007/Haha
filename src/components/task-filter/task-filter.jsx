import React from 'react';
import PropTypes from 'prop-types';
import './task-filter.css';

function TasksFilter({ filter, onFilterChange }) {
  const buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ];

  return (
    <div className="filters">
      {buttons.map(({ name, label }) => (
        <button
          key={name}
          className={filter === name ? 'selected' : ''}
          onClick={() => onFilterChange(name)}
          type="button"
        >
          {label}
        </button>
      ))}
    </div>
  );
}

TasksFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default TasksFilter;
