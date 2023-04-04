import { Component, createRef } from 'react';
import ReactSwipe from 'react-swipe';

import { OpenForm } from 'features/openForm/OpenForm';
import { ThemeContext, ThemeProvider } from 'entities/navBar/model/themeContext';
import { TasksProvider } from 'entities/tasks/model/tasksContext';
import { pages } from 'entities/navBar/model/pages';
import { NavBar } from 'entities/navBar/ui/NavBar';
import { ActiveList, ArchivedList, DoneList } from 'entities/tasks/ui/TasksList';
import { TaskForm } from 'entities/tasks/ui/TaskForm';
import './index.css';
import { Search } from '../features/search/Search';
import { PageHeader } from '../shared/ui/PageHeader/PageHeader';

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
    const currPageIndex = this.state.pages.findIndex((page) => page.active);

    return (
      <ThemeProvider>
        <TasksProvider>
          <NavBar pages={this.state.pages} handlePageChange={this.handlePageChange} />
          <TaskForm />
          <main>
            <ReactSwipe
              ref={this.pagesSlider}
              swipeOptions={{
                continuous: false,
                startSlide: currPageIndex,
                transitionEnd: (i) => {
                  if (i !== currPageIndex) {
                    this.handlePageChange(this.state.pages[i].name, true)();
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
