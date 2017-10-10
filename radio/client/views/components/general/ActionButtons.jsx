import React from 'react';

export default class ActionButtons extends React.Component {
	render() {
		return (
			<span className="actions">
				<a href={ this.props.update } className="btn btn-xs btn-primary edit">
					<i className="fa fa-edit"></i>
				</a>
				<a href="#" className="btn btn-xs btn-danger remove" onClick={ this.props.remove }>
					<i className="fa fa-trash"></i>
				</a>
			</span>
		);
	}
}