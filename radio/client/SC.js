import { Meteor } from 'meteor/meteor';

SC = require('soundcloud');

SC.initialize({
 	client_id: 'f93d4a30ede2ba3a347cb2356a8b4990',
	redirect_uri: 'http://business-radio.mn/callback.html',
});
