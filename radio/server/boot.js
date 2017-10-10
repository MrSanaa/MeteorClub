import { Meteor } from "meteor/meteor";
import { SyncedCron } from "meteor/percolate:synced-cron";

Meteor.startup(function() {
	// зураг ирэхгүй байгааг гараар зааж өгөх
	Meteor.call('updatePlaylistArtworkUrls', function(error, success) {
		if (error) {
			console.log(error);
		} else {
			console.log('updating artwork urls successful');
		}
	});
	// playlist арын зургийг чанартай болгох
	Meteor.call('updatePlaylistArtworkQuality', function(error, success) {
		if (error) {
			console.log(error);
		} else {
			console.log('updating playlist artwork img quality successful');
		}
	});
	// track арын зургийг чанартай болгох
	Meteor.call('updateTrackArtworkQuality', function(error, success) {
		if (error) {
			console.log(error);
		} else {
			console.log('updating track artwork img quality successful');
		}
	});

	SyncedCron.start();
});