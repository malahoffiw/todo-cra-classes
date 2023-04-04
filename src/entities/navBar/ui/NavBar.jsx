import { Component } from 'react';

import { ToggleTheme } from 'features/ToggleTheme';
import { Link, Header } from 'shared/ui';

export class NavBar extends Component {
  render() {
    const { pages, handlePageChange } = this.props;
    const pageLinks = pages.map((page) => (
      <Link key={page.name} to={page} onClick={handlePageChange(page.name)} />
    ));

    return (
      <Header>
        {pageLinks}
        <ToggleTheme />
      </Header>
    );
  }
}
