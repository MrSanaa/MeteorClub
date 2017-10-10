import React from 'react';

export default class LivePlayer extends React.Component {
  onClick(e) {
    e.preventDefault();

    const play = 'ion-ios-play';
    const pause = 'ion-ios-pause';
    const tag = $(e.target);

    if (e.target.nodeName.toLowerCase() === 'i') {
      tag.toggleClass(play);
      tag.toggleClass(pause);
    } else {
      tag.children('i').toggleClass(play);
      tag.children('i').toggleClass(pause);
    }
  }

  componentDidMount() {
    const src = this.props.conf.length > 0 ? this.props.conf[0].liveLink : this.props.old;

    $('.stream-player').mediaelementplayer({
      alwaysShowControls: true,
      features: ['current','progress'],
      audioVolume: 'horizontal',
    });

    new MediaElement('player-live', {
      success(mediaElement, domObject) {
        $('#play-audio').click(function(){
          if (mediaElement.paused) {
            mediaElement.setSrc(src);
            mediaElement.play();
          } else {
            mediaElement.pause();
          }
        });

        $('.mute-audio').click(function () {
          $('.unmute-audio').show();
          $('.mute-audio').hide();
          mediaElement.setMuted(true);
        });

        $('.unmute-audio').click(function () {
          $('.unmute-audio').hide();
          $('.mute-audio').show();
          mediaElement.setMuted(false);
        });
      }
    });
  }

  render() {
    const src = this.props.conf.length > 0 ? this.props.conf[0].liveLink : this.props.old;
    return(
      <div className="live-wrapper">
        <div className="live-inner">
          <h4 className="live-text">Шууд сонсох</h4>
          <a id="play-audio" href="#play" onClick={this.onClick}>
            <i className="icon ion-ios-play"></i>
          </a>
          <div className="live-player">
            <div className="icons-left pull-right">
              <div className="unmute unmute-audio hidden-a pull-left"></div>
              <div className="mute mute-audio pull-left"></div>
            </div>
            <div className="audio-player-wrap hidden">
              <audio className="stream-player" id="player-live"
                src={src} type="audio/mp3" controls="controls">
              </audio>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
