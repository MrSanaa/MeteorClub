import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Roles } from 'meteor/alanning:roles';
import { Email } from 'meteor/email';

import { canManageUsers } from '../lib/roleUtils.js';

const Messages = new Mongo.Collection('messages');

MessageSchema = new SimpleSchema({
  createdAt: {
    type: Date,
    label: 'Үүсгэсэн огноо',
    optional: true,
    defaultValue: new Date(),
  },
  name: {
    type: String,
    label: 'Хүсэлт гаргасан хүний нэр',
    optional: true,
    defaultValue: '',
  },
  email: {
    type: String,
    label: 'Холбогдох цахим шуудан',
    optional: true,
    defaultValue: '',
  },
  phone: {
    type: String,
    label: 'Холбогдох утасны дугаар',
    optional: true,
  },
  message: {
    type: String,
    label: 'Хүсэлтийн дэлгэрэнгүй',
    optional: true,
    defaultValue: '<p></p>',
  },
  slug: {
    type: String,
    label: 'Хүсэлтийн холбоос',
    optional: true,
    defaultValue: '#',
  }
});

Messages.attachSchema(MessageSchema);

Meteor.methods({
  insertMessage(data) {
    check(data, MessageSchema);
    data.createdAt = new Date();

    return Messages.insert(data);
  },
  deleteMessage(id) {
    if (canManageUsers(Meteor.userId())) {
      return Messages.remove({ _id: id });
    } else {
      throw new Meteor.Error(403, 'Таны эрх хүрэхгүй байна.');
    }
  },
  updateSlug(data) {
    return Messages.update({ _id: data.id }, {
      $set: {
          slug: data.slug
      }
    });
  }
});

Messages.after.insert(function(userId, doc) {
  if (Meteor.isServer) {
    let file;
    const local = '/Users/buyantogtokh/Documents/workspace-meteor/meteorcms/server/templates/template.html';
    const server = '/home/developer/sites/radio/repo/server/templates/template.html';

    const fs = require('file-system');

    file = fs.readFileSync(server, 'utf8');
    file = file.replace('{email}', doc.email);

    Email.send({
      to: 'info@business-radio.mn',
      cc: 'enkhmunkh123@gmail.com',
      from: doc.email,
      subject: 'Санал хүсэлт ирлээ',
      html: file,
    });
  }
});

Messages.allow({
  remove(userId) {
    return canManageUsers(userId);
  }
});

export default Messages;
