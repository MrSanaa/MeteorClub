import React from 'react';

import CreateNew from '../components/general/CreateNew.jsx';
import LogoutContainer from '../components/LogoutContainer.js';
import Downloader from '../components/general/Downloader.jsx';
import Footer from '../components/Footer.jsx';
import MobileHeader from '../components/general/MobileHeader.jsx';
import MobileMenu from '../components/general/MobileMenu.jsx';

export default class BlankLayout extends React.Component {
    render() {

        return (
            <div className="blank-layout">
                <MobileMenu />
                <MobileHeader />
                <main>
                    { this.props.content }
                </main>
                <LogoutContainer />
                {
                    this.props.loggingIn || this.props.userId ? 
                    <CreateNew /> : null
                }
            </div>
        );
    }
}