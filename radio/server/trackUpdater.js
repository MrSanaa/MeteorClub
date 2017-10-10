import { Meteor } from "meteor/meteor";
import { SyncedCron } from "meteor/percolate:synced-cron";

import Tracks from "../collections/tracks.js";

var SC = require('node-soundcloud');

// Initialize client
SC.init({
  	id: "f93d4a30ede2ba3a347cb2356a8b4990",
  	secret: "44bf51d1cf1391da86a8beb2643980b3",
  	accessToken: "1-260935-106896902-406812d6e0d0f"
});

SyncedCron.add({
    name: 'Update all tracks\'s play count',
    schedule(parser) {
        // parser is a later.parse object
        return parser.text("at 3:00 am");
    },
    job() {
    	const allTracks = Tracks.find({}, { permalinkUrl: 1 }).fetch();
    	let counter = 0;

    	for (let i = 0; i < allTracks.length; i++) {
    		let current = allTracks[i];

    		SC.get("/tracks/" + current.cloudId, Meteor.bindEnvironment(function(error, track) {
    			if (track) {
    				// playback count is updated on server
    				if (current.playbackCount < track.playback_count) {
		    			let one = Tracks.update(
		    				{ _id: current._id },
			    			{
			    				$set: {
						  			id: current._id,
						  			imageUrl: track.artwork_url,
						  			playbackCount: track.playback_count,
						  			favoritingsCount: track.favoritings_count,
						  			downloadCount: track.download_count,
						  			streamable: track.streamable,
						  			streamUrl: track.stream_url,
						  			tagList: track.tag_list,
						  			uri: track.uri,
                                    downloadable: track.downloadable,
                                    downloadUrl: track.download_url
							  	}
		    				});
	    				if (one == 1) {
	    					counter++;
	    				} else {
	    					console.log("no update", id);
	    				}
    				} else {
    					console.log("no one listened");
    				}
    			} else {
    				console.log(error);
    			}
    		}));
    	}
    }
});
