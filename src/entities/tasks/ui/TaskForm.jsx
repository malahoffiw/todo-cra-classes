import { Component } from 'react';

import { DeleteTask, SaveTask } from 'features';
import { TasksContext, validateTitle } from 'entities/tasks';
import { FormInputText, FormInputTextarea, Modal, FormSelect, Footer } from 'shared/ui';

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

  clearState = () => {
    this.setState({
      values: {
        title: '',
        body: '',
        status: 'Active',
      },
      errorTitle: '',
    });
  };

  setError = (error) => {
    this.setState({
      errorTitle: error,
    });
  };

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

    const error = validateTitle(value);
    this.setState((prevState) => ({
      values: {
        ...prevState.values,
        title: value,
      },
      errorTitle: error,
    }));
  };

  handleBlur = (event) => {
    const error = validateTitle(event.target.value);
    this.setState({ errorTitle: error });
  };

  render() {
    const { values, errorTitle } = this.state;
    const {
      api: { closeTask },
      openedTask,
    } = this.context;

    return (
      <Modal
        ref={this.context.modalRef}
        label={openedTask ? 'Modify task' : 'New task'}
        handleClose={closeTask}
      >
        <FormInputText
          label="Title"
          id="title"
          error={errorTitle}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={values.title}
        />
        <FormSelect
          label="Status"
          id="status"
          options={['Active', 'Archived', 'Done']}
          onChange={this.handleChange}
          value={values.status}
        />
        <FormInputTextarea
          label="Description"
          id="body"
          onChange={this.handleChange}
          value={values.body}
        />
        <Footer>
          {openedTask && <DeleteTask />}
          <SaveTask
            error={errorTitle}
            values={values}
            setError={this.setError}
            clearState={this.clearState}
          />
        </Footer>
      </Modal>
    );
  }
}
