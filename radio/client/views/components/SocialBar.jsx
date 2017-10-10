import { Meteor } from 'meteor/meteor';
import React from 'react';

export default class SocialBar extends React.Component {
  	render() {

        let fb, twitter, plus, permalink = this.props.permalinkUrl, absoluteUrl;

        if (this.props.playlist) {
            absoluteUrl = Meteor.absoluteUrl() + "playlist/" + this.props.id;
        }

        if (permalink) {
            fb = "https://www.facebook.com/sharer/sharer.php?u=" + permalink;
            twitter = "https://twitter.com/share?url=" + permalink;
            plus = "https://plus.google.com/share?url=" + permalink;
        } else {
            fb = "https://www.facebook.com/sharer/sharer.php?u=" + absoluteUrl;
            twitter = "https://twitter.com/share?url=" + absoluteUrl;
            plus = "https://plus.google.com/share?url=" + absoluteUrl;
        }

    	return (
    	    <div className="social-bar">
                <div className="share-icon">
                    <span>Share</span>
                    <i className="fa fa-share-alt liked"></i>
                    <div className="social-icons pull-left"> 
                        <a href={ fb } target="_blank"><i className="fa fa-facebook"></i></a>
                        <a href={ twitter } target="_blank"><i className="fa fa-twitter"></i></a>
                        <a href={ plus } target="_blank"><i className="fa fa-google-plus"></i></a>
                    </div>
                </div>
        	</div>
    	);
  	}
}