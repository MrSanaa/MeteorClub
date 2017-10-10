import React from 'react';

import CreateNew from '../components/general/CreateNew.jsx';
import LogoutContainer from '../components/LogoutContainer.js';
import Downloader from '../components/general/Downloader.jsx';
import MobileMenu from '../components/general/MobileMenu.jsx';
import MobileApps from '../components/general/MobileApps.jsx';
import Footer from '../components/Footer.jsx';

export default class MainLayout extends React.Component {
  render() {
    return (
      <div className="main-layout">
        <MobileMenu />
        <main>{this.props.content}</main>
        <LogoutContainer />
        {
          this.props.loggingIn || this.props.userId ?
          <CreateNew /> : null
        }
        <Footer conf={this.props.conf} />
      </div>
    );
  }
}
