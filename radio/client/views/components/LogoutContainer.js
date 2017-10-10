import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import Logout from './Logout.jsx';

function composer(props, onData) {
  const data = {
    userId: Meteor.userId(),
    loggingIn: Meteor.loggingIn(),
  };

  if (data) {
    onData(null, data);
  } else {
    onData(null, null);
  }
}

export default composeWithTracker(composer)(Logout);
