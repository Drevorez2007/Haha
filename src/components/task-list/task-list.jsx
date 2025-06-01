/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import Task from '../task/task';
import './task-list.css';

function TaskList({ tasks, onToggle, onDelete, onEdit, onUpdate }) {
  return (
    <ul>
      {tasks.map((task) => (
        <Task
          key={task.id}
          {...task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default TaskList;
