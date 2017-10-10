import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import Messages from '../../../../collections/messages.js';
import Login from '../Login.jsx';
import MessageList from './MessageList.jsx';

function composer(props, onData) {
	const handle = Meteor.subscribe('Messages.list');

	const data = {
		isReady: handle.ready(),
		messages: Messages.find({}, {
			sort: {
				createdAt: -1
			}
		}).fetch(),
		user: Meteor.userId() || Meteor.loggingIn()
	}

	if (data.isReady && data.user) {
		onData(null, data);
	} else {
		onData(null, null);
	}

}

export default composeWithTracker(composer, Login)(MessageList);