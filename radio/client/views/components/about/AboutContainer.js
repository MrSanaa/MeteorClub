import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import Loader from '../general/Loader.jsx';
import Tracks from '../../../../collections/tracks.js';
import About from './About.jsx';

function composer(props, onData) {
    
    // playlist cloud id for radio advertisement
    let id = '187074893';

    const handle = Meteor.subscribe('Tracks.about', id);

    data = {
        isReady: handle.ready(),
        tracks: Tracks.find({ playlistId: id }).fetch(),
    };

    if (data.isReady) {
        onData(null, data);
    } else {
        onData(null, null);
    }
}

export default composeWithTracker(composer, Loader)(About);