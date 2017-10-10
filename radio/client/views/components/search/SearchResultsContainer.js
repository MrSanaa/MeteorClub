import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Counts } from 'meteor/tmeasday:publish-counts';

import Playlists from '../../../../collections/playlists.js';
import Tracks from '../../../../collections/tracks.js';
import SearchResults from "./SearchResults.jsx";

function composer(props, onData) {
	const type = FlowRouter.getQueryParam('t');
	let handle;
	let skip = parseInt(FlowRouter.getQueryParam("page"));

	if (!skip) {
		skip = 0;
	}

	const filter = {
		val: FlowRouter.getQueryParam('q'),
		skip: skip === 1 ? 0 : skip,
	};

	switch (type) {
		case '0':
			handle = Meteor.subscribe('Search.playlistsRegex', filter);
			break;
		case '1':
			handle = Meteor.subscribe('Search.tracks', filter);
			break;
		default:
			handle = Meteor.subscribe('Search.playlistsRegex', filter);
			break;
	}

	const data = {
		isReady: handle.ready(),
		playlists: Playlists.find().fetch(),
		tracks: Tracks.find().fetch(),
		loadedCount:
			Counts.get('searchResultsFromPlaylists') ||
			Counts.get('searchResultsFromTracks'),
	};

	if (data.isReady) {
		onData(null, data);
	} else {
		onData(null, null);
	}
}

export default composeWithTracker(composer)(SearchResults);
