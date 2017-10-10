import { Meteor } from 'meteor/meteor';
import React from 'react';
import { composeWithTracker } from 'react-komposer';

class CreateNew extends React.Component {
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
							Meteor.call('downloadTracks', list, function(error2, success2) {
								if (error2) {
									console.log(error2);
								} else {
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

	componentDidMount() {
		const link = $('#create-new > ul li a');
		link.hover(function() {
			$(this).children().toggleClass('hover');
		});
		link.click(function() {
			$(this).parent().parent().toggle();
		});
	}

	showMenu() {
		$('.dropdown').animate({ height: 'toggle'});
	}

	render() {
		return(
			this.props.userId || this.props.loggingIn ? 
				(<div id="create-new">
					<a className="create-new-link" onClick={ this.showMenu } title="Үйлдлүүд">
						<i className="fa fa-edit"></i>
					</a>
					<ul className="dropdown">
						<li>
							<a href="/playlist/new">
								<i className="fa fa-plus"></i>
								Playlist бүртгэх
							</a>
						</li>
						<li>
							<a href="/track/new">
								<i className="fa fa-plus"></i>
								Track бүртгэх
							</a>
						</li>
						<li>
							<a href="/schedule/new">
								<i className="fa fa-plus"></i>
								Хөтөлбөрийн хуваарь оруулах
							</a>
						</li>
						<li>
							<a href="/messages">
								<i className="fa fa-comments"></i>
								Санал хүсэлтүүд харах
							</a>
						</li>
						<li>
							<a href="/configs">
								<i className="fa fa-cogs"></i>
								Тохиргоо өөрчлөх
							</a>
						</li>
						{
						// <li>
						// 	<a onClick={ this.download } title="Soundcloud-с мэдээлэл татах">
						// 		<i className="fa fa-download"></i>
						// 		Мэдээлэл татах
						// 	</a>
						// </li>
						}
					</ul>
				</div>) : null
		);
	}
}

function composer(props, onData) {
  const data = {
  	userId: Meteor.userId(),
  	loggingIn: Meteor.loggingIn(),
  };

  if (data) {
    onData(null, data);
  } else {
  	onData(null, null);
  }
}

export default composeWithTracker(composer)(CreateNew);
