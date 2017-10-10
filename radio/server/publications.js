/*
* @author S.Buyantogtokh, NMMA developer
* @for Business Radio
* @copyright 2016
*/

import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { check } from 'meteor/check';

import Schedules from '../collections/schedules.js';
import Playlists from '../collections/playlists.js';
import Tracks from '../collections/tracks.js';
import Messages from '../collections/messages.js';
import Configs from '../collections/configs.js';

function splitSearchInput(val) {
  let arr = [];
  if (val.indexOf(' ') !== -1) {
    arr = val.split(' ');
  }
  return arr;
}

function buildRegexLogicalOr(arr) {
  let str = '';
  for (let i = 0; i < arr.length; i++) {
    str += `${arr[i]}|`;
  }

  return str.substring(0, str.length - 1);
}

const isPositive = Match.Where(function(x) {
  check(x, Match.Integer);
  return x >= 0;
});

/*------------- PLAYLISTS -------------*/

// Publishes all playlists
Meteor.publish('Playlists.all', function() {
  return Playlists.find();
});

// Publishes all playlists that are saved on soundcloud
Meteor.publish('Playlists.atSoundcloud', function() {
  return Playlists.find({ cloudId: { $ne: '' } });
});

// Featured playlists to show
Meteor.publish('Playlists.featured', function() {
  return Playlists.find({ showInList: true });
});

// Single playlist
Meteor.publish('Playlists.single', function(id) {
  if (!id || id === null) {
    id = '';
  }
  check(id, String);
  return Playlists.find({ _id: id });
});

// Single playlist with tracks
Meteor.publish('Playlists.withTracks', function(id) {
  if (!id || id === null) {
    id = '';
  }
  check(id, String);
  return [
    Playlists.find({ _id: id }),
    Tracks.find({ localListId: id })
  ];
});

// Playlist names & ids
Meteor.publish('Playlists.names', function() {
  return Playlists.find({}, { name: 1, cloudId: 1 });
});

// Single playlist with tracks limited by result count
Meteor.publish('Playlists.withTracksLimited', function(data) {
  if (!data.limit || data.limit === null) {
    data.limit = 1;
  }
  if (!data.id) {
    data.id = '';
  }

  check(data.limit, isPositive);
  check(data.id, String);

  const options = {
    sort: { publishedAt: -1 },
    limit: data.limit * 10,
  };

  return [
    Playlists.find({ _id: data.id }),
    Tracks.find({ localListId: data.id }, options),
  ];
});

// Single playlist with paginated tracks
Meteor.publish('Playlists.withTracksPaginated', function(data) {
  if (!data.skip || data.skip === null || data.skip === 0 || data.skip === NaN) {
    data.skip = 0;
  }
  if (!data.id || data.id === null) {
    data.id = '';
  }

  check(data.featured, Boolean);
  check(data.skip, isPositive);
  check(data.id, String);

  const options = {
    sort: { publishedAt: -1 },
    skip: data.skip === 0 ? 0 : (data.skip - 1) * 10,
    limit: 10
  }

  const filter = {
    localListId: data.id,
  };

  if (data.featured) {
    filter.featured = true;
  }

  // Track counts of specific playlist
  Counts.publish(this, 'trackCountOfPlaylist', Tracks.find(filter));

  return [
    Playlists.find({ _id: data.id }),
    Tracks.find(filter, options),
  ];
});

/*-------------- TRACKS ---------------*/
// Tracks belonging to single playlist
Meteor.publish('PlaylistsAndTracks.inPlaylist', function(listId) {
  if (!listId || listId === null) {
    listId = '';
  }

  check(listId, String);

  return [
    Playlists.find({ cloudId: { $ne: '' } }),
    Tracks.find({ playlistId: listId }, { cloudId: 1 }),
  ];
});

// Playlists and single track for editing single track
Meteor.publish('PlaylistsAndSingleTrack', function(trackId) {
  if (!trackId || trackId === null) {
    trackId = '';
  }
  check(trackId, String);

  return [
    Playlists.find({}, { name: 1, cloudId: 1 }),
    Tracks.find({ _id: trackId }),
  ];
});

// Tracks in about page
Meteor.publish('Tracks.about', function(cloudId) {
  if (!cloudId || cloudId === null) {
    cloudId = '';
  }
  check(cloudId, String);

  return Tracks.find({ playlistId: cloudId });
});

// Single track
Meteor.publish('Tracks.single', function(id) {
  if (!id || id === null) {
    id = '';
  }
  check(id, String);

  return Tracks.find({ _id: id });
});

// Track count of single playlist used for pagination
Meteor.publish('Tracks.countInPlaylist', function(id) {
  check(id, String);

  return Tracks.find({ localListId: id });
});

/*-------------- Schedules ---------------*/

// Publishes all schedules
Meteor.publish('Schedules.all', function() {
  return Schedules.find();
});

// Publishes all schedules for selected day
Meteor.publish('Schedules.listByDay', function(day) {
  check(day, String);
  if (!day || day === '') {
    day = '0';
  }

  return Schedules.find({ day: day });
});

// Publishes single schedule for a day
Meteor.publish('Schedules.single', function(id) {
  if (!id || id === null) {
    id = '';
  }
  check(id, String);

  return Schedules.find({ _id: id });
});

/*---------------- Search -----------------*/
// Text search in mongo 2.6 or above
Meteor.publish('Search.playlists', function(val) {
  if (!val || val === null) {
    val = '';
  }
  check(val, String);

  return Playlists.find({ $text: { $search: val } }, { score: { $meta: 'textScore' } });
});

// Regex search playlists
Meteor.publish('Search.playlistsRegex', function(data) {
  check(data, {
    val: Match.Optional(String),
    skip: Match.Optional(Number),
  });

  if (!data.val || data.val === null) {
    data.val = '';
  }

  const limits = {
    skip: data.skip === 0 ? 0 : (data.skip - 1) * 10,
    limit: 10,
  };

  let filter = {
    $or: [
      { group: { $regex: data.val, $options: '$i' } },
      { name: { $regex: data.val, $options: '$i' } },
      { goal: { $regex: data.val, $options: '$i' } },
    ],
  };

  const fullText = Playlists.find(filter, limits);

  if (fullText.count() > 0) {
    // бүтэн үгээр хайхад илэрц олдсон тул уг илэрцүүдийг буцаая
    Counts.publish(
      this,
      'searchResultsFromPlaylists',
      Playlists.find(filter),
      { noReady: true }
    );

    return fullText;
  } else {
    // бүтэн үгээр хайхад илэрц олдоогүй тул үгээр салгаж хайя
    const arr = splitSearchInput(data.val);

    if (arr.length > 0) {
      const str = buildRegexLogicalOr(arr);

      filter = {
        $or: [
          { group: { $regex: str, $options: '$i' } },
          { name: { $regex: str, $options: '$i' } },
          { goal: { $regex: str, $options: '$i' } },
        ],
      };

      Counts.publish(
        this,
        'searchResultsFromPlaylists',
        Playlists.find(filter),
        { noReady: true },
      );

      const list = Playlists.find(filter, limits);

      return list;
    } else {
      Counts.publish(
        this,
        'searchResultsFromPlaylists',
        Playlists.find(),
        { noReady: true },
      );

      return Playlists.find({}, limits);
    }
  }

});

// Regex search tracks
Meteor.publish('Search.tracks', function(data) {
  if (!data.val || data.val === null) {
    data.val = '';
  }
  check(data, {
    val: Match.Optional(String),
    skip: Match.Optional(Number),
  });

  const limits = {
    skip: data.skip === 0 ? 0 : (data.skip - 1) * 10,
    limit: 10,
  };

  let filter = {
    $or: [
      { topic: { $regex: data.val, $options: '$i' } },
      { description: { $regex: data.val, $options: '$i' } },
    ],
  };

  const fullText = Tracks.find(filter, limits);

  if (fullText.count() > 0) {
    // бүтэн үгээр хайхад илэрц олдсон тул уг илэрцүүдийг буцаана
    Counts.publish(
      this,
      'searchResultsFromTracks',
      Tracks.find(filter),
      { noReady: true },
    );
    return fullText;
  } else {
    // бүтэн үгээр хайхад илэрц олдоогүй тул үгээр салгаж хайя
    const arr = splitSearchInput(data.val);

    if (arr.length > 0) {
      const str = buildRegexLogicalOr(arr);

      filter = {
        $or: [
          { topic: { $regex: str, $options: '$i' } },
          { description: { $regex: str, $options: '$i' } },
        ],
      };

      Counts.publish(
        this,
        'searchResultsFromTracks',
        Tracks.find(filter),
        { noReady: true },
      );

      const tracks = Tracks.find(filter, limits);
      return tracks;
    } else {
      Counts.publish(
        this,
        'searchResultsFromTracks',
        Tracks.find(),
        { noReady: true },
      );

      return Tracks.find({}, limits);
    }
  }
});

// Regex search from playlists and tracks
Meteor.publish('Search.all', function(val) {
  if (!val || val === null) {
    val = 'business';
  }
  check(val, String);

  return [
    Playlists.find({
      $or: [
        { group: { $regex: val, $options: '$i' } },
        { name: { $regex: val, $options: '$i' } },
        { goal: { $regex: val, $options: '$i' } }
      ]
    }),
    Tracks.find({
      $or: [
        { guest: { $regex: val, $options: '$i' } },
        { topic: { $regex: val, $options: '$i' } },
        { description: { $regex: val, $options: '$i' } },
      ]
    })
  ];
});


// User messages list
Meteor.publish('Messages.list', function() {
  return Messages.find();
});

// User message detail
Meteor.publish('Messages.single', function(id) {
  if (!id || id == null) {
    id = '';
  }
  check(id, String);

  return Messages.find({
    _id: id
  });
});

// Configs
Meteor.publish('Configs.last', function() {
  return Configs.find({}, { 
    sort: { createdAt: -1 },
    limit: 1,
    fields: {
      liveLink: 1,
      googleLink: 1,
      appleLink: 1, 
    },
  });
});
