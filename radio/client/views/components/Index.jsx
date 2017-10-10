import React from 'react';

import MobileHeader from './general/MobileHeader.jsx';
import LivePlayerContainer from './live-player/LivePlayerContainer.js';

export default class Index extends React.Component {
  render() {
    return (
      <div className="index">
        <MobileHeader />
        <div className="home-container container">
          <a href="/playlist" className="content-box-link hidden-xs">
            <div className="content-box text-center pull-right">
              <span>Нэвтрүүлэг сонгох</span>
              <div className="overlay"></div>
            </div>
          </a>
          <LivePlayerContainer />
        </div>
      </div>
    );
  }
}
