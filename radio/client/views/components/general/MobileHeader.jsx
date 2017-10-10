import React from 'react';

export default class MobileHeader extends React.Component {
    
    componentDidMount() {
        let mobile;

        mobile = $(".mobile-menu");
        
        $(".navicon").click(function() {
            mobile.toggleClass("expanded");
        });
    }
	
    render() {
		return (
			<div className="mobile-header visible-xs clearfix">
                <a href="/">
                    <img src="/mobile-logo.png" alt="Mobile Logo" className="pull-left" />
                </a>
                <h1 className="pull-left">Business Radio</h1>
                <button className="navicon pull-right">
                	<i className="icon ion-navicon-round"></i>
                </button>
            </div>
		);
	}
}