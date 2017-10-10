import React from 'react';
import MobileApps from './general/MobileApps.jsx';
import SearchForm from "./search/SearchForm.jsx";
import moment from 'moment';

export default class Footer extends React.Component {
  render() {
    const year = moment(new Date()).format('YYYY');

    return (
      <footer className="footer">
        <div className="footer-menu-outer text-center">
          <div className="footer-menu">
            <ul className="hidden-xs">
              <li className="visible-xs"><a href="/playlist">Нэвтрүүлгүүд</a></li>
              <li><a href="/schedule">Нэвтрүүлгийн хуваарь</a></li>
              <li><a href="/cooperate">Хамтран ажиллах</a></li>
              <li><SearchForm /></li>
            </ul>
            <div className="copyright text-center">
              <span>Copyright {year} © Business radio 98.9</span>
            </div>
          </div>
        </div>
        <MobileApps conf={this.props.conf} />
      </footer>
    );
  }
}
