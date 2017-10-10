import { Meteor } from 'meteor/meteor';
import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';

import PaginationContainer from '../general/PaginationContainer.js';
import TrackPlayer from '../track/TrackPlayer.jsx';
import SocialBar from '../SocialBar.jsx';
import ActionButtons from '../general/ActionButtons.jsx';

export default class PlaylistDetail extends React.Component {
  constructor() {
    super();

    this.remove = this.remove.bind(this);
    this.renderTracks = this.renderTracks.bind(this);
  }

  componentDidMount() {
    $('.content-desc .goal').append(this.props.data.goal);
  }

  remove() {
    const remove = confirm('Та энэ playlist-г устгахдаа итгэлтэй байна уу?');

    if (remove) {
      Meteor.call('deletePlaylist', this.props.data._id, function(error, result) {
        if (error) {
          toastr.info(error.reason);
        } else {
          toastr.info('Playlist-г устгалаа.');
        }
      });
      FlowRouter.go('/playlist');
    }
  }

  renderTracks() {
    const list = [];
    const tracks = this.props.tracks;

    if (this.props.isReady && tracks) {
      for (let i = 0; i < tracks.length; i++) {
        list.push(<TrackPlayer data={tracks[i]} key={i} />);
      }
      return list;
    }
  }

  render() {
    const playlist = this.props.data;
    const src = playlist.coverImage ? playlist.coverImage : '/bg_with_logo.jpg';
    const url = `${Meteor.absoluteUrl()}playlist/${playlist._id}`;

    return (
      <div className="cdetail-container">
        { this.props.loggedIn ?
          (
            <ActionButtons update={`/playlist/edit/${playlist._id}`}
            remove={this.remove} />
          ) : null
        }
        <div className="row">
          <div className="col-md-2 col-sm-2 col-xs-12">
            <div className="content-thumb">
              <img src={src} alt={playlist.name} />
            </div>
          </div>
          <div className="content-desc col-md-10 col-sm-10 col-xs-12">
            <h2>{playlist.name}</h2>
            <h4>{playlist.group}</h4>
            <div className="goal"></div>
            <SocialBar permalinkUrl={url} slug={playlist.slug}
              id={playlist._id} playlist={true}/>
          </div>
          <div className="clearfix"></div>
        </div>
        <div className="row">
          <div className="playlist col-md-12 col-sm-12 col-xs-12">
            {this.renderTracks()}
          </div>
          <div className="clearfix"></div>
        </div>
        {
        <div className="paginator-container text-center" aria-label="Track pagination">
          <PaginationContainer count={this.props.trackCount} />
        </div>
        }
      </div>
    );
  }
}
