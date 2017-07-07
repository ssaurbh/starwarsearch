'use strict';

angular.module('SWSearchApp').
controller('ParentController', ['$scope', '$rootScope', 'Auth', 'AUTH_EVENTS',
function($scope, $rootScope, Auth, AUTH_EVENTS){

	var clearCurrentUser = function(){
		$scope.currentUser = null;
	}
	
	var setCurrentUser = function(){
		$scope.currentUser = $rootScope.currentUser;
	}
	
	
	
	$scope.currentUser = null;
	$scope.isAuthorized = Auth.isAuthorized;
    $rootScope.$on(AUTH_EVENTS.notAuthenticated, setCurrentUser);
	$rootScope.$on(AUTH_EVENTS.loginSuccess, setCurrentUser);
	$rootScope.$on(AUTH_EVENTS.logoutSuccess, clearCurrentUser);
	
} ]);