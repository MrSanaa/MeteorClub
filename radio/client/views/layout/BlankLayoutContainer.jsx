import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import BlankLayout from './BlankLayout.jsx';

function composer(props, onData) {

    data = {
        userId: Meteor.userId(),
        loggingIn: Meteor.loggingIn()
    }

    if (data) {
        onData(null, data);
    } else {
        onData(null , null);
    }

}

export default composeWithTracker(composer, null)(BlankLayout);