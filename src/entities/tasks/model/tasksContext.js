import { Component, createContext, createRef } from 'react';
import dayjs from 'dayjs';

import styles from 'shared/ui/Modal/styles.module.css';

export const TasksContext = createContext(null);

export class TasksProvider extends Component {
  constructor(props) {
    super(props);
    this.modalRef = createRef();
    this.state = {
      openedTask: null,
      tasks: [],
      search: {
        active: '',
        archive: '',
        done: '',
      },
    };
  }

  componentDidMount() {
    const tasks = localStorage.getItem('tasks');
    if (tasks && tasks.length > 0) {
      this.setState({
        tasks: JSON.parse(tasks),
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.tasks !== this.state.tasks) {
      localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
    }
  }

  createTask = ({ title, body, status }) => {
    const newTask = {
      id: dayjs().valueOf(),
      createdAt: dayjs().valueOf(),
      title,
      body,
      status,
    };
    this.setState((prevState) => ({
      tasks: [newTask, ...prevState.tasks],
    }));
  };

  modifyTask = ({ id, title, body, status }) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            title,
            body,
            status,
          };
        }
        return task;
      }),
    }));
  };

  deleteTask = (id) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((task) => task.id !== id),
    }));
  };

  openTask = (task) => () => {
    this.setState({
      openedTask: task,
    });

    this.modalRef.current.classList.remove(styles.visible);
    this.modalRef.current.classList.remove(styles.out);
    this.modalRef.current.classList.add(styles.visible);
  };

  closeTask = () => {
    this.setState({
      openedTask: null,
    });
    this.modalRef.current.classList.add(styles.out);
  };

  setSearch = (search, group) => {
    this.setState({
      search: {
        [group]: search,
      },
    });
  };

  render() {
    return (
      <TasksContext.Provider
        value={{
          modalRef: this.modalRef,
          openedTask: this.state.openedTask,
          tasks: this.state.tasks,
          search: this.state.search,
          api: {
            createTask: this.createTask,
            modifyTask: this.modifyTask,
            deleteTask: this.deleteTask,
            openTask: this.openTask,
            closeTask: this.closeTask,
            setSearch: this.setSearch,
          },
        }}
      >
        {this.props.children}
      </TasksContext.Provider>
    );
  }
}
