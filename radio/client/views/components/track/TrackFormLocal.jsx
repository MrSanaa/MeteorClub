import { Meteor } from 'meteor/meteor';
import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import moment from 'moment';

import PermissionDenied from '../general/PermissionDenied.jsx';

export default class TrackFormLocal extends React.Component {
	constructor() {
		super();

		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		const list = this.props.playlists;
		const select = $('#playlist');

		$('#detail').redactor({
			minHeight: 300
		});

		const published = $('#published');

		published.datetimepicker({
			format: 'YYYY-MM-DD HH:mm',
			sideBySide: true,
		});
		published.val(moment().format('YYYY-MM-DD HH:mm'));

		// filling playlists
		for (let i = 0; i < list.length; i++) {
			select.append($('<option></option').val(list[i]._id + '-' + list[i].cloudId).html(list[i].name));
		}

		$('#featured').bootstrapSwitch();
		$('#downloadable').bootstrapSwitch();
	}

	cancel(e) {
		e.preventDefault();
		FlowRouter.go('playlists');
	}

	onSubmit(e) {
		e.preventDefault();

		let url;

		// local fields
		const data = {
			authorId: this.props.userId,
			modifiedUserId: this.props.userId,
			topic: $('#topic').val(),
			publishedAt: new Date($('#published').val()),
			guest: $('#guest').val(),
			description: $('#detail').redactor('get'),
			featured: $('#featured').bootstrapSwitch('state'),
			downloadable: $('#downloadable').bootstrapSwitch('state'),
		};

		// settings id fields
		const ids = $('#playlist').val();
		const splitIndex = ids.lastIndexOf('-');
		data.localListId = ids.substring(0, splitIndex);
		data.playlistId = ids.substring(splitIndex + 1);

		Meteor.call('insertTrack2', data, function(error, result) {
			if (error) {
				toastr.error(error.reason);
			} else {
				url = $('#permalink').val();
				/* use the track's permalink url to fetch remote details of the track
				* soundcloud permalink url now includes query params
				* with query params included, we can't fetch remote info about the track
				* so omit the query params with the code below
				*/
				const paramIndex = url.lastIndexOf('?');
				if (paramIndex > -1) {
					url = url.substring(0, paramIndex);
				}

				// upload to soundcloud
				SC.resolve(url).then(function(track) {
					if (track) {
	  				// track exist on soundcloud
			  		const info = {
			  			id: result,
			  			cloudId: track.id,
			  			modifiedUserId: data.authorId,
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
							downloadUrl: `${track.download_url}?client_id=f93d4a30ede2ba3a347cb2356a8b4990`
			  		};

			  		Meteor.call('updateTrackSlug', result, function(e, r) {
			  			if (e) {
			  				console.log(e);
			  			}
			  		});

			  		// update track remote fields
			  		Meteor.call('updateTrackRemoteFields', info, function(error2, result2) {
			  			if (error2) {
			  				console.log(error2);
			  			}
			  		});
					}
				}).catch(function(error) {
					console.log(error);
				});

				toastr.success('Track амжилттай хадгалагдлаа.');

			} // end insert success
  		}); // end Meteor insert

	}

	render() {
		if (this.props.userId) {
			return (
				<div className="admin-container">
					<h1>Track бүртгэх</h1>
					<form id="form-program" onSubmit={this.onSubmit}>
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
							<div className="row">
								<div className="form-group submit-buttons">
									<div className="col-sm-6">
										<button type="submit" className="form-control submit">Хадгалах</button>
									</div>
									<div className="col-sm-6">
										<button type="button" className="form-control cancel"
										onClick={this.cancel}>Цуцлах</button>
									</div>
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
