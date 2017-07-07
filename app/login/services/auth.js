'use strict';

angular.module('SWSearchApp')
.factory('Auth', [ '$http', '$rootScope', '$window', 'Session', 'AUTH_EVENTS','$state', 
function($http, $rootScope, $window, Session, AUTH_EVENTS,$state) {
	var authService = {};
	
	
	//the login function
	authService.login = function(user, success, error) {
		
		
		//this is my dummy technique, normally here the 
		//user is returned with his data from the db

		var url = 'https://swapi.co/api/people'; 

		 $http.get(url).then(function(response){ 
   			var data = response.data; 
   			var users = data.results; 

   			for(var i=0; i<users.length;i++){
   				    var usr = users[i]
   				    if(usr.name === user.username && usr.birth_year === user.password){

			   				var loginData = {
								'username': usr.name,
								'password': usr.birth_year
							};	
			   				$window.sessionStorage["userInfo"] = JSON.stringify(loginData);
							
							//delete password not to be seen clientside 
							delete loginData.password;
							
							//update current user into the Session service or $rootScope.currentUser
							//whatever you prefer
							Session.create(loginData);
							//or
							$rootScope.currentUser = loginData;
							
							//fire event of successful login
							$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
							//run success function
							success(loginData);
							break;
			   		} else{
							//OR ELSE
							//unsuccessful login, fire login failed event for 
							//the according functions to run
							$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
							error();
						}
   			}

   			     
   		});	

		
	};

	//check if the user is authenticated
	authService.isAuthenticated = function() {
		return !!Session.user;
	};
	
	//log out the user and broadcast the logoutSuccess event
	authService.logout = function(){
		Session.destroy();
		$rootScope.currentUser = undefined;
		$window.sessionStorage.removeItem("userInfo");
		$rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
		 var backlen = $window.history.length;
          $window.history.go(-backlen);
		$state.go('login');
	}

	return authService;
} ]);