import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

declare global {
  interface Window {
    chrome: any
  }
}

type State = {
  tabData: any;
}

export class App extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      tabData: null
    }
  }

  componentDidMount() {
    window.chrome.tabs.query({currentWindow: true}, (allTabs: any) => {
      console.log(allTabs);
      this.setState({
        tabData: allTabs
      });
      console.log(this.state);
    });
  }

  render() {
    const { tabData } = this.state;
    if (tabData) {
      console.log(tabData);
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
