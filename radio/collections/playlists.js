import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Roles } from 'meteor/alanning:roles';
import { Slingshot } from 'meteor/edgee:slingshot';
import moment from 'moment';

import { canUploadContent, canManageUsers } from '../lib/roleUtils.js';
import History from './history.js';

const Playlists = new Mongo.Collection('playlists');

PlaylistSchema = new SimpleSchema({
  createdAt: {
    type: Date,
    label: 'Үүсгэсэн огноо',
    optional: true,
    defaultValue: new Date(),
  },
  modifiedAt: {
    type: Date,
    label: 'Өөрчилсөн огноо',
    optional: true,
    defaultValue: new Date(),
  },
  authorId: {
    type: String,
    label: 'Нийтлэгчийн id',
    optional: false,
    defaultValue: '',
  },
  modifiedUserId: {
    type: String,
    label: 'Өөрчлөлт оруулсан хэрэглэгчийн id',
    optional: false,
    defaultValue: '',
  },
  publishedAt: {
    type: Date,
    label: 'Нийтэлсэн огноо',
    optional: true,
    defaultValue: new Date(),
  },
  slug: {
    type: String,
    label: 'Playlist холбоос',
    optional: true,
    defaultValue: '',
  },
  group: {
    type: String,
    label: 'Нэвтрүүлгийн бүлэг',
    optional: true,
    defaultValue: '',
  },
  name: {
    type: String,
    label: 'Нэвтрүүлгийн нэр',
    optional: true,
    defaultValue: '',
  },
  goal: {
    type: String,
    label: 'Нэвтрүүлгийн зорилго',
    optional: true,
    defaultValue: '<p></p>',
  },
  imageUrl: {
    type: String,
    label: 'Зураг хадгалсан зам',
    optional: true,
    defaultValue: '',
  },
  cloudId: {
    type: String,
    label: 'Soundcloud id',
    optional:  true,
    defaultValue: '',
  },
  permalinkUrl: {
    type: String,
    label: 'Soundcloud permalink url',
    optional: true,
    defaultValue: '',
  },
  trackCount: {
    type: Number,
    label: 'Track count',
    optional: true,
    defaultValue: 0,
  },
  showInList: {
    type: Boolean,
    label: 'Жагсаалтанд харагдах эсэх',
    optional: true,
    defaultValue: false,
  },
  coverImage: {
    type: String,
    label: 'Хэрэглэгчийн оруулсан cover зураг',
    optional: true,
    defaultValue: '',
  },
});

Playlists.attachSchema(PlaylistSchema);

if (Meteor.isServer) {
  Playlists._ensureIndex({ 'group': 1, 'name': 1 }, { unique: true });
  Playlists._ensureIndex({ 'group': 'text', 'name': 'text', 'goal': 'text' });
}

Meteor.methods({
  insertPlaylist(data) {
    check(data, PlaylistSchema);
    if (Playlists.findOne({ group: data.group, name: data.name })) {
      throw new Meteor.Error(401, 
        `${data.group} бүлэгт ${data.name} нэртэй нэвтрүүлэг бүртгэгдсэн байна.`);
    } else {
      data.createdAt = new Date();
      return Playlists.insert(data);
    }
  },
  // soundcloud-с татаж аваад оруулахад хэрэглэж байгаа
  insertPlaylist2(data) {
    check(data, PlaylistSchema);
    if (Playlists.findOne({ cloudId: data.cloudId })) {
      throw new Meteor.Error(401, `${data.name} нэртэй нэвтрүүлэг бүртгэгдсэн байна.`);
    } else {
      return Playlists.insert(data);
    }
  },
  // soundcloud-с татаж аваад оруулахад хэрэглэж байгаа
  updatePlaylistSlug(id) {
    check(id, String);
    return Playlists.update({ _id: id },
      {
        $set: {
          slug: `/playlist/${id}`,
        }
      }
    );
  },
  updatePlaylist(data) {
    return Playlists.update({ _id: data.id },
      {
        $set: {
          modifiedUserId: data.modifiedUserId,
          group: data.group,
          name: data.name,
          goal: data.goal,
          slug: data.slug,
          publishedAt: data.publishedAt,
          modifiedAt: new Date(),
          showInList: data.showInList,
          coverImage: data.coverImage,
          permalinkUrl: data.permalinkUrl,
        }
      }
    );
  },
  updatePlaylistRemoteFields(data) {
    return Playlists.update({ _id: data.id },
      {
        $set: {
          modifiedUserId: data.modifiedUserId,
          modifiedAt: new Date(),
          imageUrl: data.imageUrl,
          cloudId: data.cloudId,
          permalinkUrl: data.permalinkUrl,
          trackCount: data.trackCount,
        }
      }
    );
  },
  deletePlaylist(id) {
    if (canManageUsers(Meteor.userId())) {
      return Playlists.remove({ _id: id });
    } else {
      throw new Meteor.Error(403, 'Таны эрх хүрэхгүй байна.');
    }
  },
  // soundcloud-с ирэхдээ зарим талбарууд хоосон ирээд байсныг гараад оруулж өгөх болов
  updatePlaylistArtworkUrls() {
    const artworkUrls = [
      { cloudId: '219545436', artwork: 'https://i1.sndcdn.com/artworks-000163214510-uh9268-crop.jpg' }, // tal nutag
      { cloudId: '263192497', artwork: 'https://i1.sndcdn.com/artworks-000185797120-unjfxh-crop.jpg' }, // reuters news
      { cloudId: '119002006', artwork: 'https://i1.sndcdn.com/artworks-000121078799-0fvibq-crop.jpg' }, // baabar
      { cloudId: '250461235', artwork: 'https://i1.sndcdn.com/artworks-000170611532-t0afzq-crop.jpg' }, // shinjeech
      { cloudId: '263192439', artwork: 'https://i1.sndcdn.com/artworks-000185797827-ahxapp-crop.jpg' }, // 100 erhem
      { cloudId: 'm8LxhB5epTiasSZsX', artwork: 'https://i1.sndcdn.com/artworks-000185797079-g6ed2u-crop.jpg' }, // 5 minut medee
      { cloudId: '162223226', artwork: 'https://i1.sndcdn.com/artworks-000135090160-pdsxxa-crop.jpg' } // Tsenddoo
    ];

    for (let i = 0; i < artworkUrls.length; i++) {
      Playlists.update({ cloudId: artworkUrls[i].cloudId }, {
        $set: {
          imageUrl: artworkUrls[i].artwork,
        }
      });
    }
  },
  /*
  * default зураг нь 100х100 хэмжээтэй ба энэ нь бүрсийж байгаа болохоор crop буюу 300x300px хэмжээтэй
  * зурагны замаар сольж байгаа
  */
  updatePlaylistArtworkQuality() {
    const list = Playlists.find().fetch();

    for (let i = 0; i < list.length; i++) {
      const url = list[i].imageUrl;
      let size;
      if (url) {
        size = url.replace(url.substring(url.lastIndexOf('-'), url.lastIndexOf('.')), '-crop');
        Playlists.update({ _id: list[i]._id }, {
          $set: {
            imageUrl: size,
          }
        });
      }
    }
  }
});

Playlists.allow({
  insert(userId) {
    return canUploadContent(userId);
  },
  update(userId) {
    return canUploadContent(userId);
  },
  remove(userId) {
    return canManageUsers(userId);
  }
});

/* User actions history */
function insertHistory(userId, doc, action) {
  const user = Meteor.users.findOne({ _id: userId }, { username: 1 });
  const playlist = Playlists.findOne({ _id: doc._id }, { name: 1 });

  if (Meteor.isServer) {
    History.insert({
      userId: userId,
      name: user.username,
      action: action,
      objectId: doc._id,
      objectName: playlist.name,
    });
  }
}
// after insert
Playlists.after.insert(function(userId, doc) {
    insertHistory(userId, doc, 'insert');
});
// before remove
Playlists.before.remove(function(userId, doc) {
    insertHistory(userId, doc, 'delete');
});
// after update
Playlists.after.update(function(userId, doc, fieldNames, modifier, options) {
    insertHistory(userId, doc, 'update');
}, { fetchPrevious: true });

// Must be declared before the directive is instantiated
Slingshot.fileRestrictions('playlists', {
    allowedFileTypes: ['image/png', 'image/jpeg', 'image/gif'],
    maxSize: 5 * 1024 * 1024
});

if (Meteor.isServer) {
  Slingshot.createDirective('playlists', Slingshot.S3Storage, {
    bucket: 'businessradio',
    acl: 'public-read',
    authorize() {
      return canUploadContent(this.userId);
    },
    key(file) {
      const dateDirectory = moment(new Date()).format('YYYY/MM/DD');
      return `playlists/${dateDirectory}/${Meteor.uuid()}_${file.name}`;
    }
  });
}

export default Playlists;
