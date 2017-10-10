import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import Playlists from '../../../../collections/playlists.js';
import PlaylistsAll from './PlaylistsAll.jsx';
import Loader from '../general/Loader.jsx';

function composer(props, onData) {
  const userId = Meteor.userId();
  let handle;

  if (userId) {
    handle = Meteor.subscribe('Playlists.all');
  } else {
    handle = Meteor.subscribe('Playlists.featured');
  }

  const options = {
    sort: { publishedAt: -1 },
  };

  const data = {
    isReady: handle.ready(),
    userId: userId,
    list: Playlists.find({}, options).fetch(),
  };

  if (data.isReady) {
    onData(null, data);
  } else {
    onData(null, null);
  }        
}

export default composeWithTracker(composer, Loader)(PlaylistsAll);
