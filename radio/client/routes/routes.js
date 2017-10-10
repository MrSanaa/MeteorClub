import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import React from 'react';
import { mount } from 'react-mounter';

// layout containers
import MainLayoutContainer from '../views/layout/MainLayoutContainer.jsx';
import SecondLayoutContainer from '../views/layout/SecondLayoutContainer.jsx';
import BlankLayoutContainer from '../views/layout/BlankLayoutContainer.jsx';

import Index from '../views/components/Index.jsx';
import AboutContainer from '../views/components/about/AboutContainer.js';
import AboutUs from '../views/components/about/AboutUs.jsx';
import Cooperate from '../views/components/about/Cooperate.jsx';
import ContactUs from '../views/components/about/ContactUs.jsx';
import Login from '../views/components/Login.jsx';
// Playlists
import PlaylistFormContainer from '../views/components/playlist/PlaylistFormContainer.js';
import PlaylistsAllContainer from '../views/components/playlist/PlaylistsAllContainer.js';
import PlaylistUpdateContainer from '../views/components/playlist/PlaylistUpdateContainer.js';
import PlaylistDetailContainer from '../views/components/playlist/PlaylistDetailContainer.js';
// Schedules
import ScheduleContainer from '../views/components/schedule/ScheduleContainer.js';
import ScheduleFormTable from '../views/components/schedule/ScheduleFormTable.js';
import ScheduleUpdateContainer from '../views/components/schedule/ScheduleUpdateContainer.js'
// Tracks
import TrackFormContainerLocal from '../views/components/track/TrackFormContainerLocal.js';
import TrackDetailContainer from '../views/components/track/TrackDetailContainer.js';
import TrackUpdateContainer from '../views/components/track/TrackUpdateContainer.js';
// Others
import MessageListContainer from '../views/components/messages/MessageListContainer.js';
import SearchResultsContainer from '../views/components/search/SearchResultsContainer.js';
import NotFound from '../views/components/general/NotFound.jsx';
import ConfigFormContainer from '../views/components/configs/ConfigFormContainer.js';

FlowRouter.route('/', {
  action() {
      mount(MainLayoutContainer, { content: <Index /> });
  },
  name: 'index'
});

/*--------Content routes----------*/
const playlist = FlowRouter.group({
  prefix: '/playlist',
  name: 'playlist',
});

// content list
playlist.route('/', {
  action() {
    mount(SecondLayoutContainer, { content: <PlaylistsAllContainer /> });
  },
  name: 'playlists',
});

// content new
playlist.route('/new', {
  action() {
    mount(SecondLayoutContainer, { content: <PlaylistFormContainer /> });
  },
  name: 'playlistNew',
});

// content detail
playlist.route('/:id?', {
  action(params, queryParams) {
    mount(SecondLayoutContainer, { content: <PlaylistDetailContainer {...params} />});
  },
  name: 'playlistDetail',
});

playlist.route('/edit/:id', {
  action(params) {
    mount(SecondLayoutContainer, { content: <PlaylistUpdateContainer {...params} />});
  },
  name: 'playlistEdit',
});

/*--------Schedule-----------*/
const schedule = FlowRouter.group({
  prefix: '/schedule',
  name: 'schedule',
});

schedule.route('/', {
  action() {
    mount(SecondLayoutContainer, {content: <ScheduleContainer />});
  },
  name: 'schedules',
});

schedule.route('/new', {
  action() {
    mount(SecondLayoutContainer, { content: <ScheduleFormTable /> });
  },
});

schedule.route('/edit/:id', {
  action(params) {
    mount(SecondLayoutContainer, { content: <ScheduleUpdateContainer {...params}/> });
  },
  name: 'scheduleEdit',
});


/*------------About------------*/

// About-us page
FlowRouter.route('/about-us', {
  action() {
    mount(BlankLayoutContainer, {content: <AboutUs />});
  },
  name: 'aboutUs',
});

// Cooperate page
FlowRouter.route('/cooperate', {
  action() {
    mount(BlankLayoutContainer, {content: <Cooperate />});
  },
  name: 'cooperate',
});

// Contact page
FlowRouter.route('/contact-us', {
  action() {
    mount(BlankLayoutContainer, {content: <ContactUs />});
  },
  name: 'contactUs',
});

/*----------Tracks-------------*/
const track = FlowRouter.group({
  prefix: '/track',
  name: 'track',
});

// New track
track.route('/new', {
  action() {
    mount(SecondLayoutContainer, { content: <TrackFormContainerLocal /> });
  },
  name: 'trackNew',
});

// Track detail
track.route('/:id', {
  action(params) {
    mount(SecondLayoutContainer, { content: <TrackDetailContainer {...params}/> });
  },
  name: 'trackDetail',
});

// Track edit
track.route('/edit/:id', {
  action(params) {
    mount(SecondLayoutContainer, { content: <TrackUpdateContainer {...params}/> });
  },
  name: 'trackEdit',
});

// Login page
FlowRouter.route('/login', {
  action() {
    if (Meteor.userId() || Meteor.loggingIn()) {
      FlowRouter.go('/');
    } else {
      mount(SecondLayoutContainer, { content: <Login /> });
    }
  },
  name: 'login',
});

// Search page
FlowRouter.route('/search', {
  action() {
    mount(SecondLayoutContainer, { content: <SearchResultsContainer /> });
  },
  name: 'search',
});

/*------------Messages-----------*/
const messages = FlowRouter.group({
  prefix: '/messages',
  name: 'messages',
});

// Messages list
messages.route('/', {
  action() {
    mount(SecondLayoutContainer, { content: <MessageListContainer />} );
  },
  name: 'messagesList',
});

/*----------Configs---------*/
FlowRouter.route('/configs', {
  action() {
    mount(SecondLayoutContainer, { content: <ConfigFormContainer /> });
  },
  name: 'configsEdit',
});

// Not found route
FlowRouter.notFound = {
  action() {
    mount(SecondLayoutContainer, { content: <NotFound /> });
  }
}
