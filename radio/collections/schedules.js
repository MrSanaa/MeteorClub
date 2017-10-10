import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Roles } from 'meteor/alanning:roles';

import History from './history.js';
import { canUploadContent } from '../lib/roleUtils.js';

const Schedules = new Mongo.Collection('schedules');

ScheduleSchema = new SimpleSchema({
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
  name: {
    type: String,
    label: 'Хөтөлбөрийн нэр',
    optional: true,
    defaultValue: '',
  },
  day: {
    type: String,
    label: 'Хөтөлбөрийн цацагдах өдөр',
    optional: false,
    defaultValue: '0',
  },
  hour: {
    type: Date,
    label: 'Хөтөлбөрийн цаг',
    optional: true,
    defaultValue: new Date(),
  },
  detail: {
    type: String,
    label: 'Нэвтрүүлгүүд',
    optional: true,
    defaultValue: '<p></p>',
  }
});

Schedules.attachSchema(ScheduleSchema);

if (Meteor.isServer) {
  Schedules._ensureIndex({ 'day': 1, 'hour': 1 }, { unique: true });
}

Meteor.methods({
  insertSchedule(data) {
    check(data, ScheduleSchema);
    if (Schedules.findOne({ day: data.day, hour: data.hour })) {
      throw new Meteor.Error(401, 
        `${data.day} өдрийн ${data.hour} цагт хөтөлбөр бүртгэгдсэн байна.`
      );
    } else {
      data.createdAt = new Date();
      return Schedules.insert(data);
    }
  },
  insertSchedule2(data) {
    const schedule = Schedules.findOne({ day: data.day });
    if (schedule) {
      return Schedules.update({ _id: schedule._id }, {
        $set: {
          modifiedUserId: data.modifiedUserId,
          day: data.day,
          modifiedAt: new Date(),
          detail: data.detail,
        }
      });
    } else {
      data.createdAt = new Date();
      return Schedules.insert(data);
    }
  },
  updateSchedule(data) {
    return Schedules.update({ _id: data.id }, {
      $set: {
        modifiedUserId: data.modifiedUserId,
        name: data.name,
        day: data.day,
        hour: data.hour,
        modifiedAt: new Date(),
      }
    });
  },
  updateSchedule2(data) {
    return Schedules.update({ _id: data.id }, {
      $set: {
        modifiedUserId: data.modifiedUserId,
        day: data.day,
        modifiedAt: new Date(),
        detail: data.detail,
      }
    });
  },
  deleteSchedule(id) {
    if (canUploadContent(Meteor.userId())) {
      return Schedules.remove({ _id: id });
    } else {
      throw new Meteor.Error(403, 'Таны эрх хүрэхгүй байна.');
    }
  }
});

Schedules.allow({
  insert(userId) {
    return canUploadContent(userId);
  },
  update(userId) {
    return canUploadContent(userId);
  },
  remove(userId) {
    return canUploadContent(userId);
  },
});

/* User actions history */
function insertHistory(userId, doc, action) {
  const user = Meteor.users.findOne({ _id: userId }, { username: 1 });
  const schedule = Schedules.findOne({ _id: doc._id }, { name: 1 });

  if (Meteor.isServer) {
    History.insert({
      userId: userId,
      name: user.username,
      action: action,
      objectId: doc._id,
      objectName: schedule.name,
    });
  }
}
// after insert
Schedules.after.insert(function(userId, doc) {
  insertHistory(userId, doc, 'insert');
});
// before remove
Schedules.before.remove(function(userId, doc) {
  insertHistory(userId, doc, 'delete');
});
// after update
Schedules.after.update(function(userId, doc, fieldNames, modifier, options) {
  insertHistory(userId, doc, 'update');
}, { fetchPrevious: true });

export default Schedules;
