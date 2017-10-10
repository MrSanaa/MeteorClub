import { Meteor } from "meteor/meteor";
import { composeWithTracker } from "react-komposer";
import { ReactiveVar } from "meteor/reactive-var";

import Paginator from "./Paginator.jsx";
import Loader from "./Loader.jsx";
import Tracks from "../../../../collections/tracks.js";

function composer(props, onData) {
	const handle = Meteor.subscribe("Tracks.countInPlaylist", props.playlistId);
	const current = Session.get("pageNumber");
	
	const previous = () => {
		if (current > 1) {
			Session.set("pageNumber", current - 1);
		} else {
			Session.set("pageNumber", 1);
		}
	}
	const next = () => {
		if (current > data.trackCount) {
			Session.set("pageNumber",  data.trackCount);
		} else {
			Session.set("pageNumber",  current + 1);
		}
	}

	data = {
		isReady: handle.ready(),
		trackCount: Tracks.find({ localListId: props.playlistId }).fetch().length,
		previous,
		next
	}

	if (data.isReady) {
		onData(null, data);
	} else {
		onData(null, null);
	}
}

export default composeWithTracker(composer, Loader)(Paginator);