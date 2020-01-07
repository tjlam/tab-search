import React, { Component, SyntheticEvent } from 'react';
import styled from 'styled-components';

type TabCardProps = { 
  title: string,
  id: number,
  url: string,
  favIconUrl: string,
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
  
  render() {
    const {
      id,
      title,
      url,
      favIconUrl,
    } = this.props;

    const { inFocus } = this.state;

    return (
      <Card id={`${id}`} onClick={this.handleClick} highlighted={inFocus}>
        <Title>
          <span><Icon src={favIconUrl}></Icon></span>
          { title }
        </Title>
        <Url>{ url }</Url>
      </Card>
    );
  }
}
