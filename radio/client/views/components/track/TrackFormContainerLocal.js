import { Meteor } from 'meteor/meteor';
import Playlists from '../../../../collections/playlists.js';
import TrackFormLocal from './TrackFormLocal.jsx';
import { composeWithTracker } from 'react-komposer';
import Loader from '../general/Loader.jsx';

function composer(props, onData) {
  const handle = Meteor.subscribe('Playlists.names');

  const data = {
    isReady: handle.ready(),
    playlists: Playlists.find({}, { name: 1, cloudId: 1 }).fetch(),
    userId: Meteor.userId(),
  };

  if (data.isReady) {
    onData(null, data);
  } else {
    onData(null, null);
  }
}

export default composeWithTracker(composer, Loader)(TrackFormLocal);
