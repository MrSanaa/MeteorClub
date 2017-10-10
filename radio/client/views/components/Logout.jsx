import { Meteor } from 'meteor/meteor';
import React from 'react';

export default class Logout extends React.Component {
  logout(e) {
    e.preventDefault();

    Meteor.logout();
  }

  render() {
    if (this.props.userId || this.props.loggingIn) {
      return (
        <a id="logout" onClick={ this.logout }>
          <i className="fa fa-sign-out"></i>
          Гарах
        </a>
      );
    } else {
      return null;
    }
  }
}
