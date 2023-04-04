import { Component } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

import { ThemeContext } from '../model/themeContext';
import { Link, Header, Icon } from 'shared/ui';

export class NavBar extends Component {
  static contextType = ThemeContext;

  render() {
    const { pages, handlePageChange } = this.props;
    const pageLinks = pages.map((page) => (
      <Link key={page.name} to={page} onClick={handlePageChange(page.name)} />
    ));

    return (
      <Header>
        {pageLinks}
        {/* todo - extract btn into new feature */}
        <Icon onClick={this.context.toggleTheme}>
          {this.context.theme === 'dark' ? <FiSun /> : <FiMoon />}
        </Icon>
      </Header>
    );
  }
}
