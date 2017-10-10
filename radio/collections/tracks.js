import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Roles } from 'meteor/alanning:roles';

import History from './history.js';
import { canUploadContent } from '../lib/roleUtils.js';

const Tracks = new Mongo.Collection('tracks');

TrackSchema = new SimpleSchema({
  createdAt: {
    type: Date,
    label: 'Үүсгэсэн огноо',
    optional: true,
    defaultValue: new Date()
  },
  modifiedAt: {
    type: Date,
    label: 'Өөрчилсөн огноо',
    optional: true,
    defaultValue: new Date()
  },
  authorId: {
    type: String,
    label: 'Нийтлэгчийн id',
    optional: false,
    defaultValue: ''
  },
  modifiedUserId: {
    type: String,
    label: 'Өөрчлөлт оруулсан хэрэглэгчийн id',
    optional: false,
    defaultValue: ''
  },
  publishedAt: {
    type: Date,
    label: 'Нийтэлсэн огноо',
    optional: true,
    defaultValue: new Date()
  },
  slug: {
    type: String,
    label: 'Track холбоос',
    optional: true,
    defaultValue: ''
  },
  localListId: {
    type: String,
    label: 'Local mongodb playlist _id',
    optional: true,
    defaultValue: ''
  },
  playlistId: {
    type: String,
    label: 'Playlist id, same as cloudId field of the playlist',
    optional: true,
    defaultValue: ''
  },
  guest: {
    type: String,
    label: 'Нэвтрүүлгийн зочин',
    optional: true,
    defaultValue: ''
  },
  topic: {
    type: String,
    label: 'Нэвтрүүлгийн сэдэв',
    optional: true,
    defaultValue: ''
  },
  description: {
    type: String,
    label: 'Нэвтрүүлгийн дэлгэрэнгүй',
    optional: true,
    defaultValue: '<p></p>'
  },
  imageUrl: {
    type: String,
    label: 'Зураг хадгалсан зам',
    optional: true,
    defaultValue: ''
  },
  cloudId: {
    type: String,
    label: 'Soundcloud id',
    optional: true,
    defaultValue: ''
  },
  playbackCount: {
    type: Number,
    label: 'Тоглуулсан тоо',
    optional: true,
    defaultValue: 0
  },
  favoritingsCount: {
    type: Number,
    label: 'Таалагдсан тоо',
    optional: true,
    defaultValue: 0
  },
  downloadCount: {
    type: Number,
    label: 'Татагдсан тоо',
    optional: true,
    defaultValue: 0
  },
  permalinkUrl: {
    type: String,
    label: 'Permalink url',
    optional: true,
    defaultValue: ''
  },
  streamable: {
    type: Boolean,
    label: 'Streamable',
    optional: true,
    defaultValue: true
  },
  streamUrl: {
    type: String,
    label: 'Stream url',
    optional: true,
    defaultValue: ''
  },
  tagList: {
    type: String,
    label: 'Tag list',
    optional: true,
    defaultValue: ''
  },
  uri: {
    type: String,
    label: 'Track uri',
    optional: true,
    defaultValue: ''
  },
  featured: {
    type: Boolean,
    label: 'Жагсаалтанд харагдах эсэх',
    optional: true,
    defaultValue: false
  },
  downloadable: {
    type: Boolean,
    label: 'Татах боломжтой эсэх',
    optional: true
  },
  downloadUrl: {
    type: String,
    label: 'Татах холбоос',
    optional: true
  },
});

Tracks.attachSchema(TrackSchema);

Meteor.methods({
  insertTrack(data) {
    check(data, TrackSchema);
    if (Tracks.findOne({ playlistId: data.playlistId, cloudId: data.cloudId, localListId: data.localListId })) {
      throw new Meteor.Error(401, 'Track тухайн бүлэгт бүртгэгдсэн байна.');
    } else {
      data.createdAt = new Date();
      return Tracks.insert(data);
    }
  },
  insertTrack2(data) {
    check(data, TrackSchema);

    if (Tracks.findOne({ cloudId: data.cloudId })) {
      throw new Meteor.Error(401, `${data.topic} сэдэвтэй track бүртгэгдсэн байна.`);
    } else {
      return Tracks.insert(data);
    }
  },
  updateTrackSlug(id) {
    check(id, String);

    return Tracks.update({ _id: id }, {
      $set: {
        slug: `/track/${id}`,
      }
    });
  },
  updateTrack(data) {
    return Tracks.update({ _id: data.id }, {
      $set: {
        modifiedUserId: data.modifiedUserId,
        topic: data.topic,
        publishedAt: data.publishedAt,
        guest: data.guest,
        description: data.description,
        localListId: data.localListId,
        playlistId: data.playlistId,
        modifiedAt: new Date(),
        permalinkUrl: data.permalinkUrl,
        featured: data.featured,
        downloadable: data.downloadable,
        downloadUrl: data.downloadUrl ? data.downloadUrl : "#",
      }
    });
  },
  updateTrackRemoteFields(data) {
    return Tracks.update({ _id: data.id }, {
      $set: {
        modifiedUserId: data.modifiedUserId,
        modifiedAt: new Date(),
        cloudId: data.cloudId,
        imageUrl: data.imageUrl,
        playbackCount: data.playbackCount,
        favoritingsCount: data.favoritingsCount,
        downloadCount: data.downloadCount,
        permalinkUrl: data.permalinkUrl,
        streamable: data.streamable,
        streamUrl: data.streamUrl,
        tagList: data.tagList,
        uri: data.uri,
        downloadable: data.downloadable,
        downloadUrl: data.downloadUrl ? data.downloadUrl : "#",
      }
    });
  },
  updateCloudId(data) {
    return Tracks.update({ _id: data.id }, {
      $set: {
        modifiedUserId: data.modifiedUserId,
        modifiedAt: new Date(),
        cloudId: data.cloudId,
        localListId: data.localListId,
      }
    });
  },
  updateLocalListId(data) {
    return Tracks.update({ _id: data.id }, {
      $set: {
        modifiedUserId: data.modifiedUserId,
        modifiedAt: new Date(),
        localListId: data.localListId,
      }
    });
  },
  deleteTrack(id) {
    if (canUploadContent(Meteor.userId())) {
      return Tracks.remove({ _id: id });
    } else {
      throw new Meteor.Error(403, 'Таны эрх хүрэхгүй байна.');
    }
  },
  /*
   * default зураг нь 100х100 хэмжээтэй ба энэ нь бүрсийж байгаа болохоор 
   * crop буюу 300x300px хэмжээтэй зурагны замаар сольж байгаа
   */
  updateTrackArtworkQuality() {
    const list = Tracks.find().fetch();

    for (let i = 0; i < list.length; i++) {
      const url = list[i].imageUrl;
      let size;
      if (url) {
        size = url.replace(url.substring(url.lastIndexOf('-'), url.lastIndexOf('.')), '-crop');
        Tracks.update({ _id: list[i]._id }, {
          $set: {
            imageUrl: size,
          }
        });
      }
    }
  },
});

Tracks.allow({
  insert(userId) {
    return canUploadContent(userId);
  },
  update(userId) {
    return canUploadContent(userId);
  },
  remove(userId) {
    return canUploadContent(userId);
  }
});

/* User actions history */
function insertHistory(userId, doc, action) {
  const user = Meteor.users.findOne({ _id: userId }, { username: 1 });
  const track = Tracks.findOne({ _id: doc._id }, { topic: 1 });

  if (Meteor.isServer) {
    History.insert({
      userId: userId,
      name: user.username,
      action: action,
      objectId: doc._id,
      objectName: track.topic,
    });
  }
}
// after insert
Tracks.after.insert(function(userId, doc) {
  insertHistory(userId, doc, 'insert');
});
// before remove
Tracks.before.remove(function(userId, doc) {
  insertHistory(userId, doc, 'delete');
});
// after update
Tracks.after.update(function(userId, doc, fieldNames, modifier, options) {
  insertHistory(userId, doc, 'update');
}, { fetchPrevious: true });

export default Tracks;
