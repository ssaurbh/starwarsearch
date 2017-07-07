/**
 * Contains functions that are added to the root AngularJs scope.
 */
angular.module('SWSearchApp').run(function($rootScope, $state, Auth, AUTH_EVENTS,Session) {
	
	//before each state change, check if the user is logged in
	//and authorized to move onto the next state
	$rootScope.$on('$stateChangeStart', function (event, next) {
	  
	      if (Auth.isAuthenticated()) {
	        // user is not allowed
	        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
	      } else {
	        // user is not logged in
	        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
	      }
	    
	  });
	
	
	
	$rootScope.logout = function(){
		Auth.logout();
	};
});