import { Component, createContext } from 'react';

export const ThemeContext = createContext(null);
export class ThemeProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: 'light',
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps === this.props && prevState === this.state) return;
    document.body.dataset.theme = this.state.theme;
  }

  handleThemeChange = () => {
    this.setState((prevState) => ({
      theme: prevState.theme === 'light' ? 'dark' : 'light',
    }));
  };

  render() {
    return (
      <ThemeContext.Provider
        value={{ theme: this.state.theme, toggleTheme: this.handleThemeChange }}
      >
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}
