import React, { Component, SyntheticEvent } from 'react';
import styled from 'styled-components';

type TabCardProps = { 
  title: string,
  id: number,
  url: string,
  favIconUrl: string,
  letterMatchMap: Array<number>,
  defaultFocus?: boolean
}

type TabCardState = {
  inFocus: boolean,
}

type CardProps = {
  highlighted: boolean,
}

const Card = styled.div`
  padding: 5px;
  background-color: ${(props: CardProps) => props.highlighted ? "#4b9fe3" : "none" };
`;

const Icon = styled.img`
  width: 1em;
  height: 1em;
  padding-left: 5px;
  padding-right: 5px;
`;

const Title = styled.h1`
  font-family: 'Courier New', Courier, monospace;
  font-size: 1.5em;
`;

const Url = styled.p`
  font-family: 'Courier New', Courier, monospace;
  font-size: 1em;
`

const Bold = styled.span`
  color: blue;
`;

export class TabCard extends Component<TabCardProps, TabCardState> {
  constructor(props: TabCardProps) {
    super(props);
    this.state = {
      inFocus: this.props.defaultFocus || false,
    }
    this.navigateToTab = this.navigateToTab.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.focus = this.focus.bind(this);
    this.unFocus = this.unFocus.bind(this);
  }

  handleClick(e: SyntheticEvent) {
    e.preventDefault();
    this.navigateToTab();
  }

  navigateToTab() {
    window.chrome.tabs.update(this.props.id, {active: true});
  }

  focus() {
    this.setState({ inFocus: true });
  }

  unFocus() {
    this.setState({ inFocus: false });
  }

  formatTitle(inputTitle: string, letterMatchMap: Array<number>) {
    if (!letterMatchMap || letterMatchMap.length === 0) {
      return inputTitle;
    }
    let startIndex = 0;
    const output: Array<any> = [];
    letterMatchMap.forEach((index) => {
      const unHighlighted = inputTitle.substring(startIndex, index);
      startIndex = index;
      const highlighted = inputTitle.substring(startIndex, index + 1);
      startIndex += 1;
      output.push(<span>{unHighlighted}</span>);
      output.push(<Bold>{highlighted}</Bold>);
    });
    output.push(inputTitle.substring(startIndex, inputTitle.length));
    return (
      <span>
        {output}
      </span>
    );
  }
  
  render() {
    const {
      id,
      title,
      url,
      favIconUrl,
      letterMatchMap,
    } = this.props;

    const { inFocus } = this.state;

    return (
      <Card id={`${id}`} onClick={this.handleClick} highlighted={inFocus}>
        <Title>
          <span><Icon src={favIconUrl}></Icon></span>
          { this.formatTitle(title, letterMatchMap) }
        </Title>
        <Url>{ url }</Url>
      </Card>
    );
  }
}
