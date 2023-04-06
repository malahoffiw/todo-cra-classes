import { Component, createRef } from 'react';
import ReactSwipe from 'react-swipe';

import { Search, OpenForm } from 'features';
import { ThemeContext, ThemeProvider, pages, NavBar } from 'entities/navBar';
import { TaskForm, ActiveList, ArchivedList, DoneList, TasksProvider } from 'entities/tasks';
import { PageHeader } from 'shared/ui';
import './index.css';

export class App extends Component {
  static contextType = ThemeContext;

  constructor(props) {
    super(props);
    this.state = {
      pages: pages,
    };
    this.pagesSlider = createRef();
  }

  handlePageChange =
    (pageName, swiped = false) =>
    () => {
      if (!swiped) {
        const i = this.state.pages.findIndex((page) => page.name === pageName);
        this.pagesSlider.current.slide(i, 500);
        return;
      }
      this.setState((prevState) => ({
        pages: prevState.pages.map((page) => {
          if (page.active) return { ...page, active: false };
          if (page.name === pageName) return { ...page, active: true };
          return page;
        }),
      }));
    };

  render() {
    const { pages } = this.state;
    const currPageIndex = pages.findIndex((page) => page.active);

    return (
      <ThemeProvider>
        <TasksProvider>
          <NavBar pages={pages} handlePageChange={this.handlePageChange} />
          <TaskForm />
          <main>
            <ReactSwipe
              ref={this.pagesSlider}
              swipeOptions={{
                continuous: false,
                startSlide: currPageIndex,
                transitionEnd: (i) => {
                  if (i !== currPageIndex) {
                    this.handlePageChange(pages[i].name, true)();
                  }
                },
              }}
            >
              <section>
                <PageHeader>
                  <h1>Archive</h1>
                  <Search id="archive" isActive={currPageIndex === 0} />
                </PageHeader>
                <ArchivedList />
              </section>
              <section>
                <PageHeader>
                  <h1>Active</h1>
                  <Search id="active" isActive={currPageIndex === 1} />
                </PageHeader>
                <ActiveList />
              </section>
              <section>
                <PageHeader>
                  <h1>Done</h1>
                  <Search id="done" isActive={currPageIndex === 2} />
                </PageHeader>
                <DoneList />
              </section>
            </ReactSwipe>
          </main>
          <OpenForm />
        </TasksProvider>
      </ThemeProvider>
    );
  }
}
