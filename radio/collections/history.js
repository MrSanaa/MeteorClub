import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Roles } from 'meteor/alanning:roles';

import { canUploadContent } from '../lib/roleUtils.js';

const History = new Mongo.Collection('history');

HistorySchema = new SimpleSchema({
  createdAt: {
    type: Date,
    label: 'Үүсгэсэн огноо',
    optional: true,
    defaultValue: new Date(),
  },
  userId: {
    type: String,
    label: 'User id',
    optional: false,
  },
  name: {
    type: String,
    label: 'User name',
    optional: true,
    defaultValue: '',
  },
  action: {
    type: String,
    label: 'User action',
  },
  objectId: {
    type: String,
    label: 'Object id',
  },
  objectName: {
    type: String,
    label: 'Object name',
    optional: true,
  },
  notes: {
    type: [String],
    label: 'Extra notes',
    optional: true,
  }
});

History.attachSchema(HistorySchema);

Meteor.methods({
  insertHistory(data) {
    check(data, HistorySchema);
    data.createdAt = new Date();
    return History.insert(data);
  },
  deleteHistory(id) {
    if (canUploadContent(Meteor.userId())) {
      return History.remove({ _id: id });
    } else {
      throw new Meteor.Error(403, 'Таны эрх хүрэхгүй байна.');
    }
  }
});

export default History;
