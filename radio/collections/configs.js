import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Roles } from 'meteor/alanning:roles';

import { canUploadContent, canManageUsers } from '../lib/roleUtils.js';
import History from './history.js';

const Configs = new Mongo.Collection('configs');

ConfigsSchema = new SimpleSchema({
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
	modifiedBy: {
		type: String,
		label: 'Өөрчилсөн хэрэглэгчийн id',
		optional: true,
	},
	googleLink: {
		type: String,
		label: 'Google Play Store дахь холбоос',
		optional: true,
	},
	appleLink: {
		type: String,
		label: 'Apple App Store дахь холбоос',
		optional: true,
	},
	liveLink: {
		type: String,
		label: 'Шууд радио холбоос',
		optional: true,
	},
});

Configs.attachSchema(ConfigsSchema);

Meteor.methods({
	createConfigs(data) {
		if (canUploadContent(Meteor.userId())) {
			return Configs.insert(data);
		} else {
			throw new Meteor.Error(403, 'Таны эрх хүрэхгүй байна.');
		}
	},
	updateConfigs(data) {
		if (canUploadContent(Meteor.userId())) {
			check(data, ConfigsSchema);

			return Configs.update({ _id: data.id }, {
				$set: {
					modifiedBy: data.userId,
					googleLink: data.googleLink,
					appleLink: data.appleLink,
					liveLink: data.liveLink,
				}
			});
		} else {
			throw new Meteor.Error(403, 'Таны эрх хүрэхгүй байна.');
		}
	}
});

Configs.allow({
	insert() {
		return canUploadContent(Meteor.userId());
	},
	update() {
		return canUploadContent(Meteor.userId());
	},
	remove() {
		return canManageUsers(Meteor.userId());
	},
});


/* User actions history */
export function insertHistory(userId, doc, action) {
  const user = Meteor.users.findOne({ _id: userId }, { username: 1 });
  const conf = Configs.findOne({ _id: doc._id });

  if (Meteor.isServer) {
    History.insert({
      userId: userId,
      name: user.username,
      action: action,
      objectId: doc._id,
      objectName: conf._id,
    });
  }
}

export default Configs;
