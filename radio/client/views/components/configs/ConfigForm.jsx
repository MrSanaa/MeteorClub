import React from 'react';

export default class ConfigForm extends React.Component {
	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(e) {
		e.preventDefault();
		const data = {
			liveLink: $('#live-link').val(),
			googleLink: $('#google-link').val(),
			appleLink: $('#apple-link').val(),
			modifiedBy: Meteor.userId(),
		};

		if (this.props.conf.length > 0) {
			data.id = this.props.conf[0]._id;
			this.props.updateConfig(data);
		} else {
			this.props.createConfig(data);
		}

	}

	cancel(e) {
		e.preventDefault();
		window.history.back();
	}

	render() {
		const conf = this.props.conf;

		return (
			<div className="full-screen">
				<div className="admin-container container">
					<h1>Тохиргоо засах</h1>
					<form onSubmit={this.onSubmit} id="form-conf">
						<div className="row">
							<div className="form-group col-sm-12">
								<label htmlFor="live-link">Шууд радио холбоос:</label>
								<input id="live-link" className="form-control" type="text" required="required" 
									defaultValue={conf.length > 0 ? conf[0].liveLink : ''} />
							</div>
							<div className="clearfix"></div>
						</div>
						<div className="row">
							<div className="form-group col-sm-12">
								<label htmlFor="google-link">Google Playstore холбоос:</label>
								<input id="google-link" className="form-control" type="url" 
									defaultValue={conf.length > 0 ? conf[0].googleLink : ''} />
							</div>
							<div className="clearfix"></div>
						</div>
						<div className="row">
							<div className="form-group col-sm-12">
								<label htmlFor="apple-link">Apple AppStore холбоос:</label>
								<input id="apple-link" className="form-control" type="url" 
									defaultValue={conf.length > 0 ? conf[0].appleLink : ''} />
							</div>
							<div className="clearfix"></div>
						</div>
						<div className="form-group submit-buttons">
							<div className="row">
								<div className="col-sm-6">
									<button type="submit" className="form-control submit">Хадгалах</button>
								</div>
								<div className="col-sm-6">
									<button type="button" className="form-control cancel" 
										onClick={this.cancel}>Цуцлах</button>
								</div>
								<div className="clearfix"></div>
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	}
}
