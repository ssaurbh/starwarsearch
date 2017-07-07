var SWSearchApp = angular.module('SWSearchApp');

SWSearchApp.factory('PlanetService', ['$http',function($http) {
   var serviceObj = {};
   var url = 'https://swapi.co/api/planets/'; 
    serviceObj.getPlanets = function(pageNumber){
    return $http.get(url+ '?page=' +pageNumber).then(function(response){ 
   	var data = response.data;    
   	var results = data.results;      
   	return {results};
  });
    }

    return serviceObj;

}]);