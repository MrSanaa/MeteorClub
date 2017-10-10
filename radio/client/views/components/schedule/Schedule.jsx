import React from 'react';
import ScheduleItem from './ScheduleItem.jsx';
import Navigation from '../Navigation.jsx';

export default class Schedule extends React.Component {

	constructor() {
		super();

		this.showSchedule = this.showSchedule.bind(this);
	}

	componentDidMount(){
    $('.nav-tabs a').click(function(){
      $(this).tab('show');
    });

    $('#sch-select').on('change', function (e) {
      $('.nav-tabs li a').eq($(this).val()).tab('show');
    });
	}

  	showSchedule(day) {
  		const schedules = this.props.schedule;
  		let item;

  		if (schedules) {
		    for (let i = 0; i < schedules.length; i++) {
		    	let detail = $(schedules[i].detail);

		    	if (day == schedules[i].day) {
			    	item = (<ScheduleItem id={ schedules[i]._id } day={ schedules[i].day }
			    		userId={ this.props.userId } detail={ schedules[i].detail } />);
		    		break;
		    	}
		    }
  		}
  		return item;
  	}

	render() {
    return (
    	<div className="schedule-container">
				<div className="main-content">
					<h2>Нэвтрүүлгийн хуваарь</h2>
					<ul className="nav nav-tabs hidden-xs">
				    <li className="active" role="presentation">
				        <a href="#mon" role="tab" data-toggle="tab" data-day="0">Даваа</a>
				    </li>
				    <li role="presentation">
				        <a href="#tue" role="tab" data-toggle="tab" data-day="1">Мягмар</a>
				    </li>
				    <li role="presentation">
				        <a href="#wed" role="tab" data-toggle="tab" data-day="2">Лхагва</a>
				    </li>
				    <li role="presentation">
				        <a href="#thu" role="tab" data-toggle="tab" data-day="3">Пүрэв</a>
				    </li>
				    <li role="presentation">
				        <a href="#fri" role="tab" data-toggle="tab" data-day="4">Баасан</a>
				    </li>
				    <li role="presentation">
				        <a href="#sat" role="tab" data-toggle="tab" data-day="5">Бямба</a>
				    </li>
				    <li role="presentation">
				        <a href="#sun" role="tab" data-toggle="tab" data-day="6">Ням</a>
				    </li>
					</ul>
					<select className="form-control sch-tab-select visible-xs" id="sch-select">
            <option value="0">Даваа</option>
            <option value="1">Мягмар</option>
            <option value="2">Лхагва</option>
            <option value="3">Пүрэв</option>
            <option value="4">Баасан</option>
            <option value="5">Бямба</option>
            <option value="6">Ням</option>
          </select>
					<div className="tab-content schedule-list">
				    <div className="tab-pane fade in active" role="tabpanel" id="mon">
				    	{ this.showSchedule("0") }
				    </div>
				    <div className="tab-pane fade" role="tabpanel" id="tue">
				        { this.showSchedule("1") }
				    </div>
				    <div className="tab-pane fade" role="tabpanel" id="wed">
				        { this.showSchedule("2") }
				    </div>
				    <div className="tab-pane fade" role="tabpanel" id="thu">
				        { this.showSchedule("3") }
				    </div>
				    <div className="tab-pane fade" role="tabpanel" id="fri">
				        { this.showSchedule("4") }
				    </div>
				    <div className="tab-pane fade" role="tabpanel" id="sat">
				        { this.showSchedule("5") }
				    </div>
				    <div className="tab-pane fade" role="tabpanel" id="sun">
				        { this.showSchedule("6") }
				    </div>
					</div>
				</div>
			</div>
    );
	}
}
