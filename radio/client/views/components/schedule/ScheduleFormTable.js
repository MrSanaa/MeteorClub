import { Meteor } from 'meteor/meteor';
import React from 'react';
import { composeWithTracker } from 'react-komposer';
import { FlowRouter } from "meteor/kadira:flow-router";

import Loader from '../general/Loader.jsx';

class ScheduleFormTable extends React.Component {
	constructor() {
		super();

		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		$('#content').redactor({
			minHeight: 300,
		});
	}


	onSubmit(e) {
		e.preventDefault();

		const data = {
			authorId: Meteor.userId(),
			modifiedUserId: Meteor.userId(),
			day: $('#day').val(),
			detail: $('#content').redactor('get'),
		};

		Meteor.call('insertSchedule2', data, function(error, result) {
			if (error) {
				console.log(error);
			} else {
				toastr.success('Хөтөлбөр амжилттай хадгалагдлаа.');
				FlowRouter.go('schedules');
			}
		});

	}

	cancel(e) {
		e.preventDefault();
		FlowRouter.go('schedules');
	}

	render() {
		return (
			<div className="admin-container">
				<h1>Хөтөлбөр шинээр бүртгэх</h1>
				<form id="form-program" onSubmit={this.onSubmit}>
					<div className="row">
						<div className="form-group col-md-6 col-sm-6 col-xs-12">
							<label htmlFor="day">Хөтөлбөр явагдах өдөр:</label>
							<select id="day" className="form-control">
								<option value="0">Даваа</option>
								<option value="1">Мягмар</option>
								<option value="2">Лхагва</option>
								<option value="3">Пүрэв</option>
								<option value="4">Баасан</option>
								<option value="5">Бямба</option>
								<option value="6">Ням</option>
							</select>
						</div>
						<div className="clearfix"></div>
					</div>
					<div className="row">
						<div className="form-group col-md-12 col-sm-12 col-xs-12">
							<label htmlFor="content">Хөтөлбөрүүд:</label>
							<textarea id="content"></textarea>
						</div>
						<div className="clearfix"></div>
					</div>
					<div className="form-group submit-buttons">
						<div className="row">
							<div className="col-sm-6">
								<button type="submit" className="form-control submit">Хадгалах</button>
							</div>
							<div className="col-sm-6">
								<button type="button" className="form-control cancel" onClick={this.cancel}>Цуцлах</button>
							</div>
							<div className="clearfix"></div>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

function composer(props, onData) {
	const data = {
		userId: Meteor.userId(),
		loggingIn: Meteor.loggingIn(),
	};

	if (data) {
		onData(null, data);
	} else {
		onData(null, null);
	}
}

export default composeWithTracker(composer, Loader)(ScheduleFormTable);
