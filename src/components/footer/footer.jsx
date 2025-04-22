/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import './footer.css';
import TasksFilter from '../task-filter/task-filter';

function Footer({ count, filter, onFilterChange, onClearCompleted }) {
  return (
    <footer className="footer">
      <div className="footer-left">{count} items left</div>

      <div className="footer-center">
        <TasksFilter filter={filter} onFilterChange={onFilterChange} />
      </div>

      <div className="footer-right">
        <button className="clear" type="button" onClick={onClearCompleted}>
          Clear completed
        </button>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  count: PropTypes.number.isRequired,
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
};

export default Footer;
