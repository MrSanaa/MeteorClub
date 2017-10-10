import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { FlowRouter } from 'meteor/kadira:flow-router';

import Playlists from '../../../../collections/playlists.js';
import PlaylistUpdate from './PlaylistUpdate.jsx';
import Loader from '../general/Loader.jsx';

function composer(props, onData) {
	const id = FlowRouter.getParam('id'), user = Meteor.userId();
	const handle = Meteor.subscribe('Playlists.single', id);

  const update = (data) => {
    Meteor.call('updatePlaylist', data, function(error, result) {
      if (error) {
        toastr.error(error);
      } else {
        const cloudId = $('#form-program').data('cloudId');
          
        if (data.permalinkUrl !== cloudId || !cloudId) {
          // permalink is changed, fetch new data
          SC.resolve(data.permalinkUrl).then(function(playlist) {
            if (playlist) {
              // playlist exist on soundcloud
              const info = {
                id: id,
                cloudId: playlist.id,
                modifiedUserId: user,
                trackCount: playlist.track_count,
              };

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
        }

        toastr.success('Playlist амжилттай засагдлаа.');
      }
    });
  }

	const data = {
    isReady: handle.ready(),
    playlist: Playlists.findOne({ _id: id}),
    user: user,
    update,
  };

	if (data.isReady) {
    onData(null, data);
  } else {
    onData(null, null);
  }
}

export default composeWithTracker(composer, Loader)(PlaylistUpdate);
