import { Meteor } from 'meteor/meteor';
import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import moment from 'moment';

import PermissionDenied from '../general/PermissionDenied.jsx';

export default class TrackUpdate extends React.Component {
	constructor() {
		super();

		this.onSubmit = this.onSubmit.bind(this);
		this.cancel = this.cancel.bind(this);
	}

	componentDidMount() {
		const list = this.props.playlists;
		const track = this.props.track;
		const select = $('#playlist');
		const detail = $('#detail');
		let container = '';

		detail.redactor({
			minHeight: 300,
		});

		if (track.description) {
			detail.redactor('set', track.description);
		}
		if (track.topic) {
			$('#topic').val(track.topic);
		}
		if (track.guest) {
			$('#guest').val(track.guest);
		}

		// saving permalink in data attr to check in submit function
		const permalink = $('#permalink');
		permalink.val(track.permalinkUrl);
		permalink.data('url', track.permalinkUrl);

		const published = $('#published');

		published.datetimepicker({
			format: 'YYYY-MM-DD HH:mm',
			sideBySide: true,
		});
		published.val(moment(track.publishedAt).format('YYYY-MM-DD HH:mm'));

		// filling playlists
		for (let i = 0; i < list.length; i++) {
			select.append($('<option></option').val(list[i]._id + '-' + list[i].cloudId).html(list[i].name));

			if (list[i]._id === track.localListId) {
				current = list[i]._id + '-' + list[i].cloudId;
			}
		}

		select.val(current);

		// is track featured or not
		$('#featured').bootstrapSwitch('state', track.featured);
		$('#downloadable').bootstrapSwitch('state', track.downloadable);
	}

	cancel(e) {
		e.preventDefault();
		window.history.back();
	}

	onSubmit(e) {
		e.preventDefault();

		let url;

		const trackId = this.props.track._id;
		// settings id fields
		const ids = $('#playlist').val();

		// local fields
		const data = {
			id: trackId,
			modifiedUserId: Meteor.userId(),
			topic: $('#topic').val().trim(),
			publishedAt: new Date($('#published').val()),
			guest: $('#guest').val().trim(),
			description: $('#detail').redactor('get'),
			featured: $('#featured').bootstrapSwitch('state'),
			localListId: ids.substring(0, ids.lastIndexOf('-')),
			playlistId: ids.substring(ids.lastIndexOf('-') + 1, ids.length),
			downloadable: $('#downloadable').bootstrapSwitch('state'),
		};

		if (data.downloadable) {
			data.downloadUrl = `${this.props.track.uri}/download`;
		} else {
			data.downloadUrl = '';
		}

		url = $('#permalink').val();
		data.permalinkUrl = url;
		/* use the track's permalink url to fetch remote details of the track
		* soundcloud permalink url now includes query params
		* with query params included, we can't fetch remote info about the track
		* so omit the query params with the code below
		*/
		const paramIndex = url.lastIndexOf('?');
		if (paramIndex > -1) {
			url = url.substring(0, paramIndex);
		}

		Meteor.call('updateTrack', data, function(error, result) {
			if (error) {
				toastr.error(error);
			} else {
				// upload to soundcloud
				if (url === $('#permalink').data('url')) {
					// permalink wasn't changed
					toastr.success('Track амжилттай хадгалагдлаа.');
				} else {
					SC.resolve(url).then(function(track) {
			  		const info = {
			  			id: trackId,
			  			cloudId: track.id,
			  			modifiedUserId: Meteor.userId(),
			  			imageUrl: track.artwork_url,
			  			playbackCount: track.playback_count,
			  			favoritingsCount: track.favoritings_count,
			  			downloadCount: track.download_count,
			  			permalinkUrl: track.permalink_url,
			  			streamable: track.streamable,
			  			streamUrl: track.stream_url,
			  			tagList: track.tag_list,
			  			uri: track.uri,
							downloadable: track.downloadable,
							downloadUrl: track.download_url,
			  		};

			  		// update track remote fields
			  		Meteor.call('updateTrackRemoteFields', info, function(error2, result2) {
			  			if (error2) {
			  				console.log(error2);
			  			} else {
								toastr.success('Track амжилттай хадгалагдлаа.');
								window.history.back();
			  			}
			  		});

		  		});
				}

			} // end insert success
		}); // end Meteor insert

	}

	render() {
		const track = this.props.track;

		if (this.props.loggedIn) {
			return (
				<div className="admin-container">
					<h1>Track засах</h1>
					<form id="form-track" onSubmit={this.onSubmit}>
						<div className="form-group">
							<div className="row">
								<div className="form-group col-md-4 col-sm-4 col-xs-12">
									<label htmlFor="playlist">Агуулах Playlist:</label>
									<select id="playlist" className="form-control"></select>
								</div>
								<div className="form-group col-md-6 col-sm-6 col-xs-12">
									<label htmlFor="topic">Нэвтрүүлгийн сэдэв:</label>
									<input id="topic" className="form-control" type="text"
										placeholder="Нэвтрүүлгийн сэдэв оруулна уу" required="required" />
								</div>
								<div className="form-group col-md-2 col-sm-2 col-xs-12">
									<label htmlFor="published">Нийтлэх огноо:</label>
									<input id="published" className="form-control" type="text"
									required="required" />
								</div>
								<div className="clearfix"></div>
							</div>
							<div className="row">
								<div className="form-group col-md-4 col-sm-6 col-xs-12">
									<label htmlFor="guest">Нэвтрүүлгийн зочин/эх сурвалж:</label>
									<input id="guest" className="form-control" type="text"
										placeholder="Нэвтрүүлгийн зочин/эх сурвалж" />
								</div>
								<div className="form-group col-md-8 col-sm-8 col-xs-12">
									<label htmlFor="permalink">Soundcloud permalink url:</label>
									<input id="permalink" className="form-control" type="text"
										placeholder="Soundcloud URL оруулна уу" required="required" />
								</div>
								<div className="clearfix"></div>
							</div>
							<div className="row">
								<div className="form-group col-md-4 col-sm-4 col-xs-10">
									<label htmlFor="featured">Жагсаалтанд харагдах эсэх:</label>
									<input id="featured" className="form-control" type="checkbox" />
								</div>
								<div className="form-group col-md-4 col-sm-4 col-xs-10">
									<label htmlFor="downloadable">Татаж авах боломжтой эсэх:</label>
									<input id="downloadable" className="form-control" type="checkbox" />
								</div>
								<div className="clearfix"></div>
							</div>
							<div className="row">
								<div className="form-group col-md-12 col-sm-12 col-xs-12">
									<label htmlFor="detail">Нэвтрүүлгийн дэлгэрэнгүй:</label>
									<textarea id="detail"></textarea>
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
						</div>
					</form>
				</div>
			);
		} else {
			return (<PermissionDenied />);
		}
	}
}
