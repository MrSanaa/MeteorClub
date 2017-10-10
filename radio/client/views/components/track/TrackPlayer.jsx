import { Meteor } from 'meteor/meteor';
import React from 'react';
import MediaPlayer from '../general/MediaPlayer.jsx';
import SocialBar from '../SocialBar.jsx';

export default class TrackPlayer extends React.Component {

    componentDidMount() {
        $('.item desc').append(this.props.data.description);
    }

	render() {
		const track = this.props.data;

        let style;

        const img = track.imageUrl ? track.imageUrl : '/logo_black.jpg'
        const src = track.streamUrl + '?client_id=f93d4a30ede2ba3a347cb2356a8b4990';
        const href = "/track/" + track._id;

        if (Meteor.userId() && track.featured) {
            style = {
                boxShadow: "1px 1px 10px 5px #f35d20"
            }
        }

		return (
            <div className="item row">
                <div className="info col-md-5 col-sm-12 col-xs-12">
                    <a href={ href } title={ track.topic }>
                        <div className="thumb pull-left" style={ style }>
                            <img src={ img } alt={ track.topic } className="img-responsive" />
                        </div>
                        <div className="desc pull-right">
                            <h2>{ track.topic }</h2>
                        </div>
                    </a>
                </div>
                <div className="player col-md-4 col-sm-12 col-xs-12">
                    <MediaPlayer audio={ src } />
                </div>
                <div className="social col-md-1 col-sm-6 col-xs-6">
                    <SocialBar permalinkUrl={ track.permalinkUrl } />
                </div>
                <div className="counts col-md-2 col-sm-6 col-xs-6">
                    <span className="count-item" title="Нийт сонссон тоо">
                        <i className="fa fa-headphones liked"></i>
                        { track.playbackCount }
                    </span>
                    { track.downloadable ?
                        <a className="count-item" target="_blank"
                            href={ track.downloadUrl + "?client_id=f93d4a30ede2ba3a347cb2356a8b4990" }>
                            <i className="fa fa-download liked"></i>
                            Татах
                        </a> : null
                    }
                </div>
                <div className="clearfix"></div>
            </div>
		);
	}
}
