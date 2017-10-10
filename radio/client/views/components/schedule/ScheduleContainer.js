import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import Schedules from '../../../../collections/schedules.js';
import Schedule from './Schedule.jsx';
import Loader from '../general/Loader.jsx';

function composer(props, onData) {
  const handle = Meteor.subscribe('Schedules.all');

  const data = {
    isReady: handle.ready(),
    // Fetch data from local db
    schedule: Schedules.find().fetch(),
    userId: Meteor.userId() || Meteor.loggingIn(),
  };

  if (data.isReady) {
    onData(null, data);
  } else {
    onData(null, null);
  }
}

export default composeWithTracker(composer, Loader)(Schedule);
