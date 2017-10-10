import { Meteor } from 'meteor/meteor';
import Tracks from '../collections/tracks.js';
import Playlists from '../collections/playlists.js';

Meteor.methods({
	"downloadPlaylists": (playlists) => {
		for (let i = 0; i < playlists.length; i++) {
			const item = playlists[i];

			let data = {}, userId = Meteor.userId();
			data.authorId = userId;
			data.modifiedUserId = userId;
			data.name = item.title;
			data.cloudId = item.id.toString();
			data.imageUrl = item.artwork_url;
			data.permalinkUrl = item.permalink_url;
			data.trackCount = item.track_count;

			Meteor.call('insertPlaylist2', data, function(error, success) {
				if (error) {
					console.log(error);
				} else {
					console.log('inserted: ', success);
					// updating slug field
					Meteor.call('updatePlaylistSlug', success, function(error2, success2) {
						if (error2) {
							console.log('slug: error');
						} else {
							console.log('slug: successful');
						}
					});

					Meteor.call('updatePlaylistRemoteFields', data, function(error3, success3) {
						if (error3) {
							console.log('error updating remote fields');
						} else {
							console.log(data.imageUrl);
							console.log('updating remote fields was successful');
						}
					});
				}
			});
		}
	},
	"downloadTracks": (playlists) => {
		for (let i = 0; i < playlists.length; i++) {

			let tracks = playlists[i].tracks;

			for (let j = 0; j < tracks.length; j++) {
				let data = {}, userId = Meteor.userId();
				data.authorId = userId;
				data.modifiedUserId = userId;
				data.imageUrl = tracks[j].artwork_url;
				data.cloudId = tracks[j].id.toString();
				data.playbackCount = tracks[j].playback_count;
				data.favoritingsCount = tracks[j].favoritings_count;
				data.downloadCount = tracks[j].download_count;
				data.topic = tracks[j].title;
				data.playlistId = playlists[i].id.toString();
				data.permalinkUrl = tracks[j].permalink_url;
				data.streamable = tracks[j].streamable;
				data.streamUrl = tracks[j].stream_url;
				data.tagList = tracks[j].tag_list;
				data.uri = tracks[j].uri;

				Meteor.call('insertTrack2', data, function(error, success) {
					if (error) {
						console.log(error);
					} else {
						let data = {}
						data.id = success;
					}
				});
			}
		}
	},
	"updateTracksLocalListId": () => {
		//  
		const playlists = Playlists.find().fetch();
    	const tracks = Tracks.find().fetch();

    	for (let j = 0; j < tracks.length; j++) {
    		let id = tracks[j]._id;

        	for (let i = 0; i < playlists.length; i++) {
        		if (tracks[j].playlistId == playlists[i].cloudId) {
		        	Tracks.update({ _id: id }, 
		            	{
			                $set: {
			                    localListId: playlists[i]._id
			                }
		            	},
		            	{
		                	upsert: false, multi: true
		            	}
		        	);
        		}
        	}
    	} // end outer for	
	}
});
