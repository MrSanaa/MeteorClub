import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import MainLayout from './MainLayout.jsx';
import Configs from '../../../collections/configs.js';

function composer(props, onData) {
	const handle = Meteor.subscribe('Configs.last');
  const data = {
  	isReady: handle.ready(),
    userId: Meteor.userId(),
    loggingIn: Meteor.loggingIn(),
    conf: Configs.find().fetch(),
  };

  if (data.isReady) {
    onData(null, data);
  } else {
    onData(null , null);
  }
}

export default composeWithTracker(composer, null)(MainLayout);
