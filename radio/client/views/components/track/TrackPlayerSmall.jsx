import React from 'react';
import MediaPlayer from '../general/MediaPlayer.jsx';
import SocialBar from '../SocialBar.jsx';

export default class TrackPlayer extends React.Component {

    componentDidMount() {
        $('.item desc').append(this.props.data.description);
    }

	render() {
		const track = this.props.data;

        let img, src;

        img = track.imageUrl ? track.imageUrl : '/logo_black_small.jpg'
        src = track.streamUrl + '?client_id=f93d4a30ede2ba3a347cb2356a8b4990';

		return (
            <div className="item row">
                <div className="thumb col-md-3 col-sm-3 col-xs-3">
                    <img src={ img } alt={ track.topic } className="img-responsive" />
                </div>
                <div className="player col-md-8 col-sm-8 col-xs-12">
                    <h5>{ track.topic }</h5>
                    <MediaPlayer audio={ src } />
                </div>
                <div className="clearfix"></div>
            </div>
		);
	}
}