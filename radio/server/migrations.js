import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Migrations } from 'meteor/percolate:migrations';

Migrations.add({
    version: 1,
    name: "Create admin users",
    up() {
        if (Meteor.users.find().count() == 0) {
            // new media developer
            const id = Accounts.createUser({
                username: "admin",
                password: "radIO@11",
                email: "buyantogtokh.s@nmma.co",
                profile: {
                    firstName: "Buyantogtokh",
                    lastName: "Sambuu"
                }
            });
            Roles.addUsersToRoles(id, 'administrator');

            // business radio
            const radio = Accounts.createUser({
                username: "radio",
                password: "radIO@22",
                email: "info@business-radio.mn",
                profile: {
                    firstName: "Business",
                    lastName: "Radio 98.9"
                }
            });
            Roles.addUsersToRoles(radio, 'administrator');
        }
    }
});

Meteor.startup(function() {
    Migrations.migrateTo('latest');
});