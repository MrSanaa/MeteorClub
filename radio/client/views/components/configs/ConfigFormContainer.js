import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import Configs from '../../../../collections/configs.js';
import ConfigForm from './ConfigForm.jsx';

function composer(props, onData) {
	const handle = Meteor.subscribe('Configs.last');

	const createConfig = (data) => {
		Meteor.call('createConfigs', data, (err) => {
			if (err) {
				toastr.error('Тохиргоо үүссэнгүй.');
			} else {
				toastr.success('Тохиргоо амжилттай хадгалагдлаа.');
			}
		});
	};

	const updateConfig = (data) => {
		Meteor.call('updateConfigs', data, (err) => {
			if (err) {
				toastr.error('Тохиргоо өөрчлөгдсөнгүй.');
			} else {
				toastr.success('Тохиргоо амжилттай өөрчлөгдлөө.');
			}
		});
	};

	const data = {
		isReady: handle.ready(),
		conf: Configs.find().fetch(),
		createConfig,
		updateConfig,
	};

	if (data.isReady) {
		onData(null, data);
	} else {
		onData(null, null);
	}
}

export default composeWithTracker(composer)(ConfigForm);
