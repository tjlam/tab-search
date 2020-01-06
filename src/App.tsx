import React, { Component, KeyboardEvent } from 'react';
import styled from 'styled-components';
import { TabList } from './TabList';

declare global {
  interface Window {
    chrome: any
  }
}

type State = {
  allTabData: any;
}

const Popup = styled.div`
  width: 1000px;
  height: 1000px;
`

export class App extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      allTabData: []
    }
  }

  componentDidMount() {
    window.chrome.tabs.query({currentWindow: true}, (allTabs: any) => {
      this.setState({
        allTabData: allTabs
      });
    });
  }

  render() {
    const { allTabData } = this.state;
    const filteredTabData = allTabData;

    return (
      <Popup>
        <TabList filteredTabData={filteredTabData} />
      </Popup>
    );
  }
}

export default App;
