import { Meteor } from 'meteor/meteor';
import React from 'react';
import FlowRouter from 'meteor/kadira:flow-router';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: Meteor.user(),
      loggingIn: Meteor.loggingIn(),
    };
  }

  login(e) {
    e.preventDefault();

    const username = $('#nameOrEmail').val().toLowerCase();
    const password = $('#password').val();

    Meteor.loginWithPassword(username, password, function(error) {
      if (error) {
        toastr.warning('Нэвтрэх нэр эсвэл нууц үг буруу байна.');
      } else {
        location.href='/';
      }
    });
  }

  render() {
    return (
      <div id="login" className="admin-container">
        <h3 className="text-center">Хэрэглэгч нэвтрэх</h3>
        <form onSubmit={this.login}>
          <div className="form-group">
            <label htmlFor="nameOrEmail">Нэвтрэх нэр:</label>
            <input id="nameOrEmail" className="form-control" type="text"
              placeholder="Нэвтрэх нэрээ оруулна уу" required="required" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Нууц үг:</label>
            <input id="password" className="form-control" type="password"
              placeholder="Нууц үгээ оруулна уу" required="required" />
            </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary form-control">Нэвтрэх</button>
          </div>
        </form>
      </div>
    );
  }
}
