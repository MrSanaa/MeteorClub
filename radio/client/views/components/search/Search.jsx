import React from "react";
import { FlowRouter } from "meteor/kadira:flow-router";

export default class Search extends React.Component {
	constructor() {
		super();

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			t: '0',
			q: '',
		}
	}

	onSubmit(e) {
		e.preventDefault();
		let val = $('.search-short .input-search input').val();
		val = val ? val.trim() : '';

		this.state = {
			q: val,
			t: this.state.t,
		};

		FlowRouter.go('/search', {}, this.state);
	}

	onChange(e) {
		e.target.checked = true;
		this.setState({
			t: e.target.value,
		});
	}

	componentDidMount() {
		const q = FlowRouter.getQueryParam('q');
		const t = FlowRouter.getQueryParam('t');
		const input = $('.search-short .input-search input');

		if (q === '')	{
			input.attr('placeholder', 'Хайх үгээ бичнэ үү');
		} else {
			input.attr('placeholder', q);
			input.val(q);
		}

		if (t === '0') {
			document.getElementById('playlist').checked = true;
		} else if (t === '1') {
			document.getElementById('track').checked = true;
		}
	}

	render() {
		return (
			<form className="search-short form-inline" onSubmit={this.onSubmit}>
        <div className="btn-group" role="group">
					<div className="radio">
						<input
							type="radio"
							id="playlist"
							name="search-from"
							value="0"
							onChange={this.onChange}
						/>
						<label htmlFor="playlist">Playlist</label>
						<div className="check"></div>
					</div>
					<div className="radio">
						<input
							type="radio"
							id="track"
							name="search-from"
							value="1"
							onChange={this.onChange}
						/>
						<label htmlFor="track">Track</label>
						<div className="check"></div>
					</div>
        </div>
        <div className="input-search">
          <input
            id="call-search"
            type="search"
            placeholder="Хайх үгээ бичнэ үү"
            className="search-input"
          />
          <button type="submit">
            <i className="ion-ios-search-strong" id="search-icon"></i>
          </button>
        </div>
      </form>
		);
	}
}
