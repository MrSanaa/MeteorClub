import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';

export default class SearchForm extends React.Component {
  componentDidMount(){
    $('#search-icon').click(function () {
      $('#call-search').toggle();
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const val = $('#call-search').val().trim();

    FlowRouter.go('/search?q=' + val);
  }

  render() {
    return (
      <form className="search-form" onSubmit={this.onSubmit}>
        <label className="search-label">
          <i className="ion-ios-search-strong" id="search-icon"></i>
        </label>
        <input
          id="call-search"
          type="search"
          placeholder="хайлт хийх"
          className="search-input"
        />
      </form>
    );
  }
}
