import { Meteor } from 'meteor/meteor';
import React from 'react';

import moment from "moment";

export default class MessageListItem extends React.Component {

	constructor() {
		super();

		this.deleteMessage = this.deleteMessage.bind(this);
	}

	deleteMessage(event) {
		event.preventDefault();

		let remove = confirm('Энэ зурвасыг устгах уу?');

		if (remove) {
			Meteor.call('deleteMessage', this.props.message._id, function(error, success) {
				if (error) {
					console.log(error.message);
				} else {
					toastr.info('Зурвас устгагдлаа.');
				}
			});
		}
	}

	render() {

		const item = this.props.message;

		if (item) {
			return (
				<div className="message-item col-md-5 col-sm-5 col-xs-12">
					<a>
						<h3>{ item.name }</h3>
						<p>
							<span className="email pull-left">{ item.email }</span>
							<span className="created pull-right">{ moment(item.createdAt).format('YYYY-MM-DD HH:mm') }</span>
						</p>
						<p>{ item.phone }</p>
						<p className="message">{ item.message }</p>
					</a>
					<a className="delete btn btn-danger" onClick={ this.deleteMessage }>
						<i className="fa fa-remove"></i>
					</a>
				</div>
			);
		} else {
			return null;
		}
	}
}
