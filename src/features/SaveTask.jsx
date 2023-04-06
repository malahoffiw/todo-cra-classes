import { Component } from 'react';

import { TasksContext, validateTitle } from 'entities/tasks';
import { Button } from 'shared/ui';

export class SaveTask extends Component {
  static contextType = TasksContext;

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.props.errorTitle) {
      return;
    }

    const error = validateTitle(this.props.values.title);
    if (error) {
      this.props.setError(error);
      return;
    }

    if (this.context.openedTask) {
      this.context.api.modifyTask({ id: this.context.openedTask.id, ...this.props.values });
    } else {
      this.context.api.createTask(this.props.values);
    }

    this.context.api.closeTask();
    this.props.clearState();
  };

  render() {
    return <Button label="Submit" type="submit" onClick={this.handleSubmit} />;
  }
}
