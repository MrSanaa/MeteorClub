import React from 'react';
import { composeWithTracker } from 'react-komposer';

import TrackPlayerSmall from '../track/TrackPlayerSmall.jsx';
import Loader from '../general/Loader.jsx';
import Tracks from '../../../../collections/tracks.js';
import AboutLinks from './AboutLinks.jsx';

class Cooperate extends React.Component {

    renderAds() {
        let list = [], item;
        const tracks = this.props.tracks;

        if (this.props.isReady && tracks) {
            for (let i = 0; i < tracks.length; i++) {
                item = (<TrackPlayerSmall data={ tracks[i] } key={ i } />);
                list.push(item);
            }
            return list;
        }
    }

    componentDidMount(){

        let height = $(".cooperate .cope-left").height();

        $(".cooperate .cope-right").css("height", height);

        ul = $(".cooperate .cope-left .main-content ul");

        ul.children("li").each(function() {
            $(this).removeClass("active");
        });
        ul.children("li:nth-child(2)").addClass("active");

        // set hidden select value
        $("#about-select").val("1");
    }

    render() {
        return (
            <div className="cooperate">
                <div className="cope-left">
                    <div className="main-content">
                        <AboutLinks />
                        <div className="ads">
                            <img src="/cope-mobile.jpg" alt="Хамтран ажиллах" className="visible-xs visible-sm img-responsive" />
                            <h4>Бидний хийсэн радио сурталчилгаа:</h4>
                            <div className="ad-container">
                            {
                                this.renderAds()
                            }
                            </div>
                        </div>
                        <div className="footer-navigation">
                            <a href="/" className="btn btn-nav">
                                <i className="ion-ios-home"></i>
                                Нүүр хуудас
                            </a>
                        </div>
                    </div>
                </div>
                <div className="cope-right">
                </div>
            </div>
        );
    }
}

function composer(props, onData) {
    
    // playlist cloud id for radio advertisement
    let id = '187074893';

    const handle = Meteor.subscribe('Tracks.about', id);

    const data = {
        isReady: handle.ready(),
        tracks: Tracks.find({ playlistId: id }).fetch(),
    }

    if (data.isReady) {
        onData(null, data);
    } else {
        onData(null, null);
    }
}

export default composeWithTracker(composer, Loader)(Cooperate);