import React, { Component } from 'react';
import styled from 'styled-components';
import { TabList } from './TabList';
import fuzzyMatch from './fuzzyMatch';

declare global {
  interface Window {
    chrome: any
  }
}

type State = {
  allTabData: any;
  searchTerm: string;
  filteredTabData: any;
}

const Popup = styled.div`
  width: 1000px;
  height: 1000px;
`

export class App extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      allTabData: [],
      searchTerm: "",
      filteredTabData: [],
    }

    this.handleChange = this.handleChange.bind(this);
    this.filterTabs = this.filterTabs.bind(this);
    this.fuzzySearch = this.fuzzySearch.bind(this);
    this.tabCompare = this.tabCompare.bind(this);
  }

  componentDidMount() {
    window.chrome.tabs.query({currentWindow: true}, (allTabs: any) => {
      this.setState({
        allTabData: allTabs,
        filteredTabData: allTabs,
      });
    });
  }

  handleChange(event: any) {
    this.filterTabs(event.target.value);
  }

  fuzzySearch(searchTerm: string): Array<any> {
    let filteredTabs: Array<any> = [];
    this.state.allTabData.forEach((tab: any) => {
      const {
        hasMatch,
        letterMatchMap,
        matchCount,
      } = fuzzyMatch(searchTerm, tab.title);
      if (hasMatch) {
        filteredTabs.push({
          letterMatchMap,
          matchCount,
          ...tab,
        });
      }
    });
    return filteredTabs;
  }

  filterTabs(searchTerm: string) {
    if (searchTerm.length === 0 || !searchTerm) {
      this.setState({
        filteredTabData: this.state.allTabData,
        searchTerm
      });
      return;
    }
    // const filteredTabs = this.state.allTabData.filter((tab: any) => {
    //   return (tab.title.toLowerCase().includes(this.state.searchTerm) || tab.url.includes(this.state.searchTerm));
    // });
    const filteredTabs = this.fuzzySearch(searchTerm).sort(this.tabCompare);
    this.setState({
      filteredTabData: filteredTabs,
      searchTerm,
    });
  }

  tabCompare(a: any, b: any) {
    if (a.matchCount > b.matchCount) {
      return -1;
    }
    if (a.matchCount < b.matchCount) {
      return 1;
    }
    return 0;
  }

  render() {
    const { filteredTabData } = this.state;

    return (
      <Popup>
        <input
          type="text"
          id="search"
          placeholder="Search"
          autoFocus={true}
          value={this.state.searchTerm}
          onChange={this.handleChange}
        />
        <TabList filteredTabData={filteredTabData} />
      </Popup>
    );
  }
}

export default App;
