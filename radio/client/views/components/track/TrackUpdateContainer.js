import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { composeWithTracker } from 'react-komposer';

import Playlists from '../../../../collections/playlists.js';
import Tracks from '../../../../collections/tracks.js';
import TrackUpdate from './TrackUpdate.jsx';
import Loader from '../general/Loader.jsx';

function composer(props, onData) {
  const id = FlowRouter.getParam('id');
  const handle = Meteor.subscribe('PlaylistsAndSingleTrack', id);

  const data = {
  	isReady: handle.ready(),
  	track: Tracks.findOne({ _id: id }),
    playlists: Playlists.find({}, { name: 1, cloudId: 1 }).fetch(),
  	loggedIn: Meteor.userId() || Meteor.loggingIn(),
  };

	if (data.isReady && data.loggedIn) {
  	onData(null, data);
	} else {
		onData(null, null);
	}
}

export default composeWithTracker(composer, Loader)(TrackUpdate);
