import { Meteor } from "meteor/meteor";
import { Picker } from "meteor/meteorhacks:picker";

Picker.route('/callback', function(req, res) {

	var SC = require('node-soundcloud');
	 
	// Initialize client 
	SC.init({
	  	id: "f93d4a30ede2ba3a347cb2356a8b4990",
	  	secret: "44bf51d1cf1391da86a8beb2643980b3",
	  	uri: "localhost:3000/callback",
	  	// current token
	  	accessToken: "1-260935-106896902-406812d6e0d0f"
	});

  	console.log(SC);
	var code = req.query.code;
	console.log(code);

	SC.authorize(code, function(err, accessToken) {
	    if (err) {
	      throw err;
	    } else {
	      // Client is now authorized and able to make API calls 
	      console.log('access token:', accessToken);
	    }
	});

});
