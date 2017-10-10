import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Counts } from 'meteor/tmeasday:publish-counts';

import PlaylistDetail from './PlaylistDetail.jsx';
import Loader from '../general/Loader.jsx';
import Playlists from '../../../../collections/playlists.js';
import Tracks from '../../../../collections/tracks.js';

function composer(props, onData) {
  const id = FlowRouter.getParam('id');
  const userId = Meteor.userId();

  let skip = parseInt(FlowRouter.getQueryParam('page'));

  if (!skip) {
    skip = 0;
  }

  const info = {
    id: id,
    skip: skip === 1 ? 0 : skip,
    featured: userId ? false : true
  };

  let filter = {
    localListId: id,
  }

  if (!userId) {
    filter.featured = true;
  }

  const handle = Meteor.subscribe('Playlists.withTracksPaginated', info);

  const data = {
    isReady: handle.ready(),
    data: Playlists.findOne({ _id: id }),
    tracks: Tracks.find(filter, { sort: { publishedAt: -1 } }).fetch(),
    loggedIn: userId,
    trackCount: Counts.get('trackCountOfPlaylist'),
  }

  if (data.isReady) {
    onData(null, data);
  } else {
    onData(null, null);
  }
}

export default composeWithTracker(composer, Loader)(PlaylistDetail);
