import { Component } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { TasksContext } from 'entities/tasks';
import { Card, List, ListPlaceholder } from 'shared/ui';

dayjs.extend(relativeTime);

class TasksList extends Component {
  static contextType = TasksContext;

  getTasks = () => {
    return [];
  };

  getFilteredTasks = () => {
    return this.getTasks();
  };

  render() {
    const tasks = this.getFilteredTasks();
    const taskElements = tasks.map((task) => {
      return (
        <Card
          key={task.id}
          data={{ ...task, createdAt: dayjs(task.createdAt).fromNow() }}
          onClick={this.context.api.openTask(task)}
        />
      );
    });

    if (tasks.length === 0) {
      return <ListPlaceholder />;
    }
    return <List>{taskElements}</List>;
  }
}

export class ActiveList extends TasksList {
  getTasks = () => {
    return this.context.tasks.filter((task) => task.status === 'Active');
  };

  getFilteredTasks = () => {
    const tasks = this.getTasks();
    const search = this.context.search.active;

    if (!search) return tasks;
    return tasks.filter((task) => task.title.toLowerCase().includes(search.toLowerCase()));
  };
}

export class ArchivedList extends TasksList {
  getTasks = () => {
    return this.context.tasks.filter((task) => task.status === 'Archived');
  };

  getFilteredTasks = () => {
    const tasks = this.getTasks();
    const search = this.context.search.archive;

    if (!search) return tasks;
    return tasks.filter((task) => task.title.toLowerCase().includes(search.toLowerCase()));
  };
}

export class DoneList extends TasksList {
  getTasks = () => {
    return this.context.tasks.filter((task) => task.status === 'Done');
  };

  getFilteredTasks = () => {
    const tasks = this.getTasks();
    const search = this.context.search.done;

    if (!search) return tasks;
    return tasks.filter((task) => task.title.toLowerCase().includes(search.toLowerCase()));
  };
}
