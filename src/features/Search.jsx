import { Component } from 'react';

import { TasksContext } from 'entities/tasks';
import { FormInputText } from 'shared/ui';

export class Search extends Component {
  static contextType = TasksContext;
  timeout;

  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.isActive && !this.props.isActive) {
      this.setState({ search: '' });
      this.context.api.setSearch('', this.props.id);
    }
  }

  handleChange = (e) => {
    this.setState({ search: e.target.value });

    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      this.context.api.setSearch(e.target.value, this.props.id);
    }, 500);
  };

  render() {
    return <FormInputText id="search" value={this.state.search} onChange={this.handleChange} />;
  }
}
