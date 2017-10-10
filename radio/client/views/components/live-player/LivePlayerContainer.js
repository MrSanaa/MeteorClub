import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import Configs from '../../../../collections/configs.js';
import LivePlayer from './LivePlayer.jsx';

function composer(props, onData) {
	const old = 'http://78.129.234.163:34349/stream';

	const data = {
		conf: Configs.find().fetch(),
		old,
	};

	onData(null, data);
}

export default composeWithTracker(composer)(LivePlayer);
