import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import SecondLayout from './SecondLayout.jsx';

function composer(props, onData) {

  const data = {
    userId: Meteor.userId(),
    loggingIn: Meteor.loggingIn(),
  };

  if (data) {
    onData(null, data);
  } else {
    onData(null , null);
  }

}

export default composeWithTracker(composer, null)(SecondLayout);
