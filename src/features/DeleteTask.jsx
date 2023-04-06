import { Component } from 'react';

import { TasksContext } from 'entities/tasks';
import { Button } from 'shared/ui';

export class DeleteTask extends Component {
  static contextType = TasksContext;

  handleDelete = () => {
    this.context.api.deleteTask(this.context.openedTask.id);
    this.context.api.closeTask();
  };

  render() {
    return <Button label="Delete task" type="delete" onClick={this.handleDelete} />;
  }
}
