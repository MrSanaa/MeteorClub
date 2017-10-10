import React from "react";
import { Session } from "meteor/session";
import { FlowRouter } from "meteor/kadira:flow-router";

export default class PageItem extends React.Component {
	constructor() {
		super();

		this.onPageClick = this.onPageClick.bind(this);
		this.state = {
			active: false
		}
	}

	onPageClick(e) {
		e.preventDefault();
		let page = $(e.target);

		this.setState({ active: true });
		Session.set("pageNumber", parseInt(page.html()));
		// FlowRouter.setQueryParams({ page: parseInt(page.html()) })
	}

	componentDidMount() {
		if (this.state.active) {
			console.log("is active");
		}
	}

	render() {
		return (
			<li>
				<a href="#" onClick={ this.onPageClick }>{ this.props.label }</a>
			</li>
		);
	}
}