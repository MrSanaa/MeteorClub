import React from 'react';

export default class ContactInfo extends React.Component {
	render() {
		return (
			<div className="row">
	            <div className="col-md-6 col-sm-12 col-xs-12 contact-info">
	                <h3>Хаяг:</h3>
	                <p>УБ хот, Баянгол дүүрэг 16-р хороо Амарсанаагийн гудамж-68</p>
	            </div>
	            <div className="col-md-6 col-sm-12 col-xs-12 contact-info">
	                <h3>Цахим шуудангийн хаяг:</h3>
	                <a href="mailto:info@business-radio.mn" target="_top">info@business-radio.mn</a>
	            </div>
	            <div className="col-md-6 col-sm-12 col-xs-12 contact-info">
	                <h3>Утас:</h3>
	                <a href="tel:70110989" target="_top">7011-0989</a>
	            </div>
	            <div className="col-md-6 col-sm-12 col-xs-12 contact-info">
	                <h3 className="fb">
	                    <i className="ion-social-facebook contact-fb"></i>
	                </h3>
	                <a href="http://www.facebook.com/BusinessRadio98.9" target="_blank">
	                	http://www.facebook.com/BusinessRadio98.9
	                </a>
	            </div>
	            <div className="clearfix"></div>
	        </div>
		);
	}
}