import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import SearchForm from './search/SearchForm.jsx';

export default class Navigation extends React.Component {

	goBack() {
		if (FlowRouter.getQueryParam('page')) {
			FlowRouter.go('playlists');
		} else {
			window.history.back();
		}
	}

	render() {
  	return (
	    <div className="footer-navigation">
				<span className="pull-left nav-style_1">
					<ul>
						<li>
							<a href="/contact-us" className="btn btn-nav cope">
                <i className="icon ion-ios-briefcase"></i>
                Холбоо барих
              </a>
						</li>
						<li><SearchForm /></li>
					</ul>
				</span>
        <span className="pull-right nav-padd">
					<a href="/" className="btn btn-nav">
        		<i className="ion-ios-home"></i>
    	    	Нүүр хуудас
    	    </a>
        	<a className="btn btn-nav" onClick={this.goBack}>
        		<i className="ion-arrow-left-c"></i>
        		Буцах
        	</a>
        </span>
    	</div>
  	);
	}
}
