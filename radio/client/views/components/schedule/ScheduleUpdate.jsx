import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';

import PermissionDenied from '../general/PermissionDenied.jsx';

export default class ScheduleUpdate extends React.Component {
	constructor() {
		super();

		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		const schedule = this.props.schedule;

		const detail = $('#content');
		detail.redactor({
			minHeight: 300,
		});
		detail.redactor('set', schedule.detail);

		$('#day').val(schedule.day);
    $('table > tbody > tr').each(function(index) {
    	const row = $(this);
    	row.children('td:first-child').addClass('sch-time');
    	row.children('td:nth-child(2)').addClass('sch-title');
    	row.children('td').removeAttr('rowspan');
    });
	}

	cancel(e) {
		e.preventDefault();
		FlowRouter.go('schedules');
	}

	onSubmit(e) {
		e.preventDefault();

		const data = {
			id: this.props.schedule._id,
			modifiedUserId: this.props.userId,
			day: $('#day').val(),
			detail: $('#content').redactor('get'),
		};

		this.props.updateSchedule(data);
	}

	render() {
		if (this.props.userId || this.props.loggingIn) {
			return (
				<div className="admin-container">
					<h1>Хөтөлбөр засах</h1>
					<form id="sch-update" onSubmit={this.onSubmit} data-id={this.props.schedule._id}>
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
		} else {
			return (<PermissionDenied />);
		}
	}
}
