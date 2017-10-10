import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import PlaylistForm from './PlaylistForm.jsx';
import Loader from '../general/Loader.jsx';

function composer(props, onData) {
	const user = Meteor.userId();
  	
	const savePlaylist = (data) => {
		Meteor.call('insertPlaylist', data, function(error, result) {
			if (error) {
				console.log(error);
			} else {
				// fetch soundcloud data				
				SC.resolve(data.permalinkUrl).then(function(playlist) {
					if (playlist) {
	  				// playlist exist on soundcloud
			  		const info = {
			  			id: result,
			  			cloudId: playlist.id,
			  			modifiedUserId: user,
			  			trackCount: playlist.track_count,
			  		};

				  		// update playlist slug
						Meteor.call('updatePlaylistSlug', result, function(error2, success2) {
							if (error2) {
								console.log('error creating slug');
							} else {
								console.log('success updating pl slug');
							}
						});

						// update remote fields
						Meteor.call('updatePlaylistRemoteFields', info, function(err, res) {
							if (err) {
								console.log('Error updating remote fields of playlist with id: ' + result);
							} else {
								console.log('success updating remote fields');
							}
						});

					} else {
						console.log('no playlist');
					}
				}).catch(function (error) {
					console.log(error);
				});

				toastr.success('Playlist амжилттай хадгалагдлаа.');
			}
		});
	}

	const data = {
		userId: user,
		savePlaylist,
	};

	if (user) {
  	onData(null, data);
	} else {
		onData(null, null);
	}
}

export default composeWithTracker(composer, Loader)(PlaylistForm);
