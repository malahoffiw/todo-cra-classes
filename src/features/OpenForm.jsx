import { Component } from 'react';

import { TasksContext } from 'entities/tasks';
import { Button, Footer } from 'shared/ui';

export class OpenForm extends Component {
  static contextType = TasksContext;

  render() {
    return (
      <Footer>
        <Button label="New task" type="create" onClick={this.context.api.openTask(null)} />
      </Footer>
    );
  }
}
