import React from "react";
import { Sesson } from "meteor/session";

import PageItem from "./PageItem.jsx";

export default class Paginator extends React.Component {
	constructor(props) {
		super(props);

		this.renderItems = this.renderItems.bind(this);
		this.previous = this.previous.bind(this);
		this.next = this.next.bind(this);
	}

	previous(e) {
		e.preventDefault();
		this.props.previous();
	}

	next(e) {
		e.preventDefault();
		this.props.next();
	}

	renderItems() {
		const items = this.props.trackCount;
		let list = [], pages = Math.ceil(items / 10);

		for (let i = 0; i < pages; i++) {
			list.push((<PageItem label={ i + 1 } key={ i + 1 } />));
		}

		return list;
	}

	componentDidMount() {
		let pageNumber = Session.get("pageNumber");

		if (!pageNumber) {
			pageNumber = 1;
		}

		$(".paginator-container ul li").each(function(index) {
			let self = $(this);
			if (self.find("a").html() == pageNumber) {
				self.addClass("active");
			} else {
				self.removeClass("active");
			}
		});
	}

	render() {
		const items = this.props.trackCount;
		const pageLimit = 10;

		if (items > pageLimit) {
			return (
				<ul className="pagination">
					<li>
						<a href="#" aria-label="Previous" onClick={ this.previous }>
				        	<i className="ion-chevron-left"></i>
				     	</a>
			     	</li>
					{ this.renderItems() }
					<li>
						<a href="#" aria-label="Next" onClick={ this.next }>
				        	<i className="ion-chevron-right"></i>
					     </a>
				     </li>
				</ul>
			);
		} else {
			return null;
		}

	}
}