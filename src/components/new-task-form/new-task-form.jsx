import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';

class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = { label: '' };
  }

  handleChange = (e) => {
    const { value } = e.target;  
    this.setState({ label: value });
  };

  handleKeyDown = (e) => {
    const { label } = this.state;
    const { onAdd } = this.props;

    if (e.key === 'Enter' && label.trim()) {
      onAdd(label.trim());
      this.setState({ label: '' });
    }
  };

  render() {
    const { label } = this.state; 

    return (
      <form className="new-task-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={label}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          placeholder="What needs to be done?"
        />
      </form>
    );
  }
}

NewTaskForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default NewTaskForm;

