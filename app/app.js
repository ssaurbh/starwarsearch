'use strict';

// Configure the main application module.
var SWSearchApp = angular.module('SWSearchApp', ['ui.router', 'loginmodule','homemodule'])
/*Constants regarding user login defined here*/
.constant('AUTH_EVENTS', {
	loginSuccess : 'auth-login-success',
	loginFailed : 'auth-login-failed',
	logoutSuccess : 'auth-logout-success',
	sessionTimeout : 'auth-session-timeout',
	notAuthenticated : 'auth-not-authenticated',
	notAuthorized : 'auth-not-authorized'
});



