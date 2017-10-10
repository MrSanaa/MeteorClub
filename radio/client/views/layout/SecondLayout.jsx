import { Meteor } from 'meteor/meteor';
import React from 'react';

import CreateNew from '../components/general/CreateNew';
import LogoutContainer from '../components/LogoutContainer';
import Navigation from '../components/Navigation';
import MobileHeader from '../components/general/MobileHeader';
import MobileMenu from '../components/general/MobileMenu';

export default class SecondLayout extends React.Component {
	render() {
  	return (
    	<div className="second-layout container">
        <MobileMenu />
        <MobileHeader />
      	{ this.props.content }
        <Navigation />
        <LogoutContainer />
        {
          this.props.userId || this.props.loggingIn ?
          <CreateNew /> : null
        }
    	</div>
  	);
	}
}
