import { Component } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

import { ThemeContext } from 'entities/navBar';
import { Icon } from 'shared/ui';

export class ToggleTheme extends Component {
  static contextType = ThemeContext;

  render() {
    return (
      <Icon onClick={this.context.toggleTheme}>
        {this.context.theme === 'dark' ? <FiSun /> : <FiMoon />}
      </Icon>
    );
  }
}
