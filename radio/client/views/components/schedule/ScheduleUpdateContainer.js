import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { composeWithTracker } from 'react-komposer';

import ScheduleUpdate from './ScheduleUpdate.jsx';
import Loader from '../general/Loader.jsx';
import Schedules from '../../../../collections/schedules.js';

function composer(props, onData) {
  const id = FlowRouter.getParam('id');
  const handle = Meteor.subscribe('Schedules.single', id);

  const updateSchedule = (sh) => {
    Meteor.call('updateSchedule2', sh, function(error, result) {
      if (error) {
        console.log(error);
      } else {
        toastr.success('Хөтөлбөр амжилттай хадгалагдлаа.');
        FlowRouter.go('schedules');
      }
    });
  }

  const data = {
    isReady: handle.ready(),
    userId: Meteor.userId(),
    loggingIn: Meteor.loggingIn(),
    schedule: Schedules.findOne({ _id: id }),
    updateSchedule,
  };

  if (data.isReady) {
    onData(null, data);
  } else {
    onData(null, null);
  }
}

export default composeWithTracker(composer, Loader)(ScheduleUpdate);
