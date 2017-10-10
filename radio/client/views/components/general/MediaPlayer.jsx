import React, { Component } from 'react';
import { MediaElementPlayer } from "meteor/delgermurun:mediaelementjs";

export default class MediaPlayer extends React.Component {
    componentDidMount() {
        const options = {
            alwaysShowControls: true,
            features: ['playpause', 'progress', 'duration', 'current', 'volume'],
            audioVolume: 'horizontal'
        }

        let audio = $(this.item);

        audio.mediaelementplayer(options);        
    }

    render() {
        return ( 
            <div className="audio-player-wrap">
                <audio src={ this.props.audio } controls preload="meta" 
                    type="audio/mpeg" className="audio" 
                    ref={ (item) => { this.item = item } }>
                </audio>
            </div>
        );
    }
}