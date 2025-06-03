/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import Task from '../task/task';
import './task-list.css';

function TaskList({ tasks, onToggle, onDelete, onEdit, onUpdate }) {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <Task
          key={task.id}
          id={task.id}
          label={task.label}
          completed={task.completed}
          created={task.created}
          isTiming={task.isTiming}
          timeLeft={task.timeLeft}
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
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      created: PropTypes.instanceOf(Date).isRequired,
      isTiming: PropTypes.bool.isRequired,
      timeLeft: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default TaskList;
