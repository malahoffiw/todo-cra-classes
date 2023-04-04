import { Component } from 'react';

import { TasksContext } from '../model/tasksContext';
import { FormInputText, FormInputTextarea, Button, Modal, FormSelect, Footer } from 'shared/ui';

export class TaskForm extends Component {
  static contextType = TasksContext;

  constructor(props) {
    super(props);
    this.state = {
      values: {
        title: '',
        body: '',
        status: 'Active',
      },
      errorTitle: '',
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state === prevState && this.context.openedTask) {
      this.setState({
        values: {
          title: this.context.openedTask.title,
          body: this.context.openedTask.body,
          status: this.context.openedTask.status,
        },
      });
    } else if (this.state === prevState && !this.context.openedTask) {
      this.setState({
        values: {
          title: '',
          body: '',
          status: 'Active',
        },
      });
    }
  }

  validate = (title) => {
    if (!title) {
      return 'Required';
    }
    if (title.length < 2) {
      return 'Must be at least 2 characters';
    }
    return '';
  };

  handleChange = (event) => {
    const { id, value } = event.target;

    if (id !== 'title') {
      this.setState((prevState) => ({
        values: {
          ...prevState.values,
          [id]: value,
        },
      }));
      return;
    }

    const error = this.validate(value);
    this.setState((prevState) => ({
      values: {
        ...prevState.values,
        title: value,
      },
      errorTitle: error,
    }));
  };

  handleBlur = (event) => {
    const error = this.validate(event.target.value);
    this.setState({ errorTitle: error });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.errorTitle) {
      return;
    }

    const error = this.validate(this.state.values.title);
    if (error) {
      this.setState({ errorTitle: error });
      return;
    }

    if (this.context.openedTask) {
      this.context.api.modifyTask({ id: this.context.openedTask.id, ...this.state.values });
    } else {
      this.context.api.createTask(this.state.values);
    }

    this.context.api.closeTask();
    this.setState({
      values: {
        title: '',
        body: '',
        status: 'Active',
      },
      errorTitle: '',
    });
  };

  handleDelete = () => {
    this.context.api.deleteTask(this.context.openedTask.id);
    this.context.api.closeTask();
  };

  render() {
    const { values, errorTitle } = this.state;

    return (
      <Modal
        ref={this.context.modalRef}
        label={this.context.openedTask ? 'Modify task' : 'New task'}
        handleClose={this.context.api.closeTask}
      >
        <FormInputText
          label="Title"
          error={errorTitle}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={values.title}
        />
        <FormSelect
          label="Status"
          options={['Active', 'Archived', 'Done']}
          onChange={this.handleChange}
          value={values.status}
        />
        <FormInputTextarea label="Body" onChange={this.handleChange} value={values.body} />
        <Footer>
          {this.context.openedTask && (
            <Button label="Delete task" type="delete" onClick={this.handleDelete} />
          )}
          <Button label="Submit" type="submit" onClick={this.handleSubmit} />
        </Footer>
      </Modal>
    );
  }
}
