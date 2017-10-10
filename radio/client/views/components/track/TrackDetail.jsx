import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import React from 'react';
import MediaPlayer from '../general/MediaPlayer.jsx';
import SocialBar from '../SocialBar.jsx';
import ActionButtons from '../general/ActionButtons.jsx';

export default class TrackDetail extends React.Component {
  constructor() {
      super();

      this.remove = this.remove.bind(this);
  }

	componentDidMount() {
		$('.content-desc .description').append(this.props.track.description);
	}

	remove() {
		const remove = confirm('Та энэ track-г устгахдаа итгэлтэй байна уу?');
    const track = this.props.track;

    if (remove) {
      Meteor.call('deleteTrack', track._id, function(error, result) {
        if (error) {
          toastr.info(error.reason);
        } else {
          toastr.info('Track-г устгалаа.');
          window.history.back();
        }
      });
    }
	}

	render() {

		const track = this.props.track;

    if (track) {
      const src = track.imageUrl ? track.imageUrl : '/bg_with_logo.jpg';
      const audio = `${track.streamUrl}?client_id=f93d4a30ede2ba3a347cb2356a8b4990`;
      const url = `${Meteor.absoluteUrl()}track/${track._id}`;
      const downloadUrl = `${track.downloadUrl}?client_id=f93d4a30ede2ba3a347cb2356a8b4990`;

  		return (
  			<div className="cdetail-container track-detail">
          { this.props.loggedIn ?
            (<ActionButtons update={"/track/edit/" + track._id}
                remove={this.remove} />) : null
          }
          <div className="row track-info">
            <div className="col-md-3 col-sm-3 col-xs-12">
              <div className="content-thumb">
                  <img src={src} alt={track.topic} />
              </div>
            </div>
            <div className="content-desc col-md-9 col-sm-9 col-xs-10">
                <h2>{track.topic}</h2>
                <div className="description"></div>
                <SocialBar permalinkUrl={url} id={track._id} playlist={false} />
            </div>
            <div className="clearfix"></div>
          </div>
          <div className="row track-player">
          	<div className="col-md-6 col-sm-6 col-xs-9">
              <MediaPlayer audio={audio} />
          	</div>
            <div className="counts col-md-3 col-sm-3 col-xs-3">
              <span className="count-item" title="Нийт сонссон тоо">
                <i className="fa fa-headphones liked"></i>
                {track.playbackCount}
              </span>
              { track.downloadable ?
                <a className="count-item" href={downloadUrl}>
                  <i className="fa fa-download liked"></i>
                  Татах
                </a> : null
              }
            </div>
            <div className="clearfix"></div>
          </div>
        </div>
  		);
    } else {
      return null;
    }
	}
}
