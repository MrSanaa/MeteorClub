import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { composeWithTracker } from 'react-komposer';

import Tracks from '../../../../collections/tracks.js';
import TrackDetail from './TrackDetail.jsx';
import Loader from '../general/Loader.jsx';

function composer(props, onData) {
  const id = FlowRouter.getParam('id');
  const handle = Meteor.subscribe('Tracks.single', id);

  const data = {
    isReady: handle.ready(),
    track: Tracks.findOne({ _id: id }),
    loggedIn: Meteor.userId() || Meteor.loggingIn(),
  };

  if (data.isReady) {
    onData(null, data);
  } else {
    onData(null, null);
  }
}

export default composeWithTracker(composer, Loader)(TrackDetail);
