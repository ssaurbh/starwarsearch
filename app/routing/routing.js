angular.module('SWSearchApp').config(['$stateProvider', '$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  // For any unmatched url, redirect to /
  $urlRouterProvider.otherwise("/");
  
  // Now set up the states
  $stateProvider
  	.state('login', {
      url: "/",
      templateUrl: "../login/templates/login.html"
    })
    .state('home', {
      url: "/home",
      templateUrl: "../home/templates/home.html",
      resolve: {
             auth: function(Session, $q, $timeout) {
               
                 var deferred = $q.defer();                                       
                  $timeout(function() {
                       if ( Session.user === null ) {
                           return deferred.reject({redirectTo: 'login'});
                       }
                       else {
                           return deferred.resolve(Session.user);
                       }
                   });
                   
                   return deferred.promise;
               }
           },
    })
  
    ;
}]);