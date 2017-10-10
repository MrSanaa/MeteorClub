import { Roles } from 'meteor/alanning:roles';

export function isDeveloper(userId) {
	return Roles.userIsInRole(userId, 'developer');
}

export function isAdmin(userId) {
	return Roles.userIsInRole(userId, 'administrator');
}

export function isModerator(userId) {
	return Roles.userIsInRole(userId, 'moderator');
}

export function canManageUsers(userId) {
	return Roles.userIsInRole(userId, ['developer', 'administrator']);
}

export function canUploadContent(userId) {
	return Roles.userIsInRole(userId, ['developer', 'administrator', 'moderator']);
}