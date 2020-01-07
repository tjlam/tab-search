import React, { Component } from 'react';
import { TabCard } from './TabCard';

type TabListProps = {
  filteredTabData: any,
}

let currentSelection = 0;

export class TabList extends Component<TabListProps, {}> {

  render() {
    const { filteredTabData } = this.props;

    document.onkeyup = (e) => {
      if ((e.ctrlKey && e.which === 73) || e.which === 38) {
        // ctrl i -> go up
        // @ts-ignore
        this.refs[`tabcard${currentSelection}`].unFocus();
        currentSelection = Math.max(currentSelection - 1, 0);
        // @ts-ignore
        this.refs[`tabcard${currentSelection}`].focus();
      } else if ((e.ctrlKey && e.which === 75) || e.which === 40) {
        // ctrl k -> go down
        // @ts-ignore
        this.refs[`tabcard${currentSelection}`].unFocus();
        currentSelection = Math.min(currentSelection + 1, filteredTabData.length - 1);
        // @ts-ignore
        this.refs[`tabcard${currentSelection}`].focus();
      } else if (e.key === 'Enter') {
        // go to selected tab
        const tabId = filteredTabData[currentSelection].id;
        window.chrome.tabs.update(tabId, {active: true});
      } else if (e.which === 8) {
        // delete tab
        // closeTab(tabIds[currentPos]);
      }
    }
  
    return (
      <div>
        { filteredTabData ? filteredTabData.map((item: any, index: number) => (
            <TabCard
              ref={`tabcard${index}`}
              key={index}
              title={item.title}
              id={item.id}
              url={item.url}
              favIconUrl={item.favIconUrl}
              defaultFocus={index === 0}
            />
          )
        ) : null }
      </div>
    );
  }

}
