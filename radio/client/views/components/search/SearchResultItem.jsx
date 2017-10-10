import { Meteor } from 'meteor/meteor';
import React from 'react';

export default class SearchResultItem extends React.Component {
	componentDidMount() {
		const link = $(this.item);
		const result = this.props.result;

		if (result.goal) {
			link.append($(result.goal));
		}
		if (result.description) {
			link.append($(result.description));
		}
	}

	render() {
		const item = this.props.result;

		if (item) {
			const src = item.imageUrl ? item.imageUrl : '/logo_black.jpg';
			const href = item.slug ? item.slug : `/track/${item._id}`;

			return (
				<li className="row search-item">
					<div className="col-md-2 col-sm-2 col-xs-4 item-img">
						<a href={href}>
							<img src={src} alt={item.name || item.topic} className="img-responsive" />
						</a>
					</div>
					<div className="col-md-10 col-sm-10 col-xs-8 item-text">
						<a href={href} ref={ (item) => {this.item = item} }>
							<h4>{item.name || item.topic}</h4>
						</a>
					</div>
					<div className="clearfix"></div>
				</li>
			);
		} else {
			return null;
		}
	}
}
