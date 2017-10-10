import { Meteor } from 'meteor/meteor';
import React from 'react';
import { composeWithTracker } from 'react-komposer';

class Downloader extends React.Component {

	download() {
		// connecting to soundcloud
		SC.connect().then(function(result) {
			console.log(result);
			if (result) {
				SC.get('/users/106896902/playlists').then(function(list) {
					Meteor.call('downloadPlaylists', list, function(error, success) {
						if (error) {
							console.log(error);
						} else {
							console.log(success);
							Meteor.call('downloadTracks', list, function(error2, success2) {
								if (error2) {
									console.log(error2);
								} else {
									console.log(success2);
									Meteor.call('updateTracksLocalListId', function(error3, success3) {
										if (error3) {
											console.log(error3);
										} else {
											console.log(success3);
										}
									});
						        	toastr.success('Мэдээлэл амжилттай татаж авлаа');
								}
							});
						}
					});

		        }).then(function(resolve) {
		        	toastr.success('Мэдээлэл амжилттай татаж авлаа');
		        });
			} else {
				toastr.error('Soundcloud-тай холбогдож чадсангүй.')
			}
		});

	}

	render() {
		return(
			this.props.userId || this.props.loggingIn ?	
				(<div id="connect-download">
					<a className="download" onClick={ this.download } title="Soundcloud-с мэдээлэл татах">
						<i className="fa fa-download"></i>
					</a>
				</div>) : null
		);
	}
}


function composer(props, onData) {
    const user = Meteor.userId();

    data = {
    	userId: Meteor.userId(),
    	loggingIn: Meteor.loggingIn()
    }

    if (data) {
	    onData(null, data);
    } else {
    	onData(null, null);
    }

}

export default composeWithTracker(composer)(Downloader);