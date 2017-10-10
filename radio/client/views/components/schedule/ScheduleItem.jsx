import { Meteor } from 'meteor/meteor';
import React from 'react';

export default class ScheduleItem extends React.Component {
	constructor() {
		super();

		this.remove = this.remove.bind(this);
	}

	componentDidMount() {
		const day = this.props.day;
		const detail = this.props.detail;

		$('.sch-scroll').each(function() {
			const self = $(this);

			if (self.data('day').toString() === day) {
				self.children('.sch-single').append($(detail));
			}
		});

    $('table > tbody > tr').each(function(index) {
    	const row = $(this);
    	row.children('td:first-child').addClass('sch-time');
    	row.children('td:nth-child(2)').addClass('sch-title');
    	row.children('td').removeAttr('rowspan');
    });
	}

	remove(e) {
		e.preventDefault();

		const confirmed = confirm('Та энэ өдрийн хөтөлбөрийг устгахдаа итгэлтэй байна уу?');

    if (confirmed) {
      Meteor.call('deleteSchedule', this.props.id, function(error, result) {
        if (error) {
            toastr.info(error.reason);
        } else {
            toastr.info('Хөтөлбөрийг устгалаа.');
        }
      });
    }
  }

	render() {
    return (
    	<div className="sch-scroll" data-day={this.props.day}>
    		{
    			this.props.userId ?
    			(<span className="actions">
    				<a className="btn btn-xs btn-primary edit" href={"/schedule/edit/" + this.props.id}>
    					<i className="fa fa-edit"></i>
    				</a>
    				<a className="btn btn-xs btn-danger remove" onClick={this.remove}>
    					<i className="fa fa-trash"></i>
    				</a>
    			</span>) : null
    		}
    		<div className="sch-single"></div>
      </div>
    );
	}
}
