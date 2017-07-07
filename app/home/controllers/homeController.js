'use strict';
var myapp = angular.module('SWSearchApp');

myapp.controller('HomeCtrl', ['$scope',  'PlanetService', function($scope,planetService){

var planets = [];
	$scope.planets = planets;
	$scope.page =1;
    $scope.loading = true;
    var preCachedData = {};
   
	$scope.getPlanets = function(){
		var results = planetService.getPlanets($scope.page);
		 results.then(function(data){
		 	console.log(data);
     		 if(data.results && data.results.length > 0){
     		 	// sort the array based on population
     		 	 $scope.loading = true;
     		 	 $scope.planets = [];
     		 	data.results.sort(compare);
     		 	console.log(data.results);
     		 	var width = 350;
     		 	var lastPopulation;
     		 	var planets_all = [];
      			data.results.map(function(resultData,index){		
      		   	lastPopulation = getLastPopulation(planets_all,index);
      		    if(index !==0 && lastPopulation !== resultData.population){
      		    	width = width+50;
      		    }		
      			planets_all.push({'name': resultData.name, 'population': resultData.population,'width': width,
      				'climate': resultData.climate, 'water': resultData.surface_water,
      				'rotation': resultData.rotation_period, 'diameter': resultData.diameter,
      				'terrain': resultData.terrain, 'films': resultData.films, 'linkText': 'Show More'

      			});
      			});
                 preCachedData[$scope.page] = planets_all;
      			 $scope.planets = planets_all;
      			 $scope.loading = false;

      		}
      		
   		 });
	}

    $scope.nextBtnClicked = function(){
    $scope.page = $scope.page+1;
    if(preCachedData[$scope.page]){
    		$scope.planets = preCachedData[$scope.page] 
   
    }else{

      $scope.getPlanets();
    }

	}

  $scope.prevBtnClicked = function(){
    $scope.page = $scope.page-1;
    $scope.planets = [];
     if(preCachedData[$scope.page]){
    		$scope.planets = preCachedData[$scope.page] 
       }else{
    	
      $scope.getPlanets();
    }

  }

	var getLastPopulation = function(planets_all,index){
		  if(index !==0){
		  	index = index-1;
		  	  var population = planets_all[index].population;
		  	  return population;
		  }
	}

	$scope.showMore = function(index){
		var planet = $scope.planets[index];
		if(planet.linkText === 'Show Less'){
			planet.linkText = 'Show More';
		}else{
			planet.linkText = 'Show Less';
		}
		

	}

	$scope.ifMoreSelected = function(index){
         var planet = $scope.planets[index];
			if(planet.linkText === 'Show Less'){
				 return true;
			}
			return false;
	}

	var compare = function compare(a,b) {
		var a_population, b_population;
		if(a.population == 'unknown'){
			a_population = 0;	
		}else{
			a_population = a.population;	
		}

		if(b.population == 'unknown'){
			b_population = 0;	
		}else{
			b_population = b.population;	
		}

  		return a_population - b_population;
	}

	$scope.set_style = function (population,index) {
		 var width = $scope.planets[index].width;
 		 return { 
 		 	width: width +'px'
 		 	 }
  		
	}


	
}	
]);

myapp.filter('searchFor', function(){

	// All filters must return a function. The first parameter
	// is the data that is to be filtered, and the second is an
	// argument that may be passed with a colon (searchFor:searchString)

	return function(arr, searchString){

		if(!searchString){
			return arr;
		}

		var result = [];

		searchString = searchString.toLowerCase();

		// Using the forEach helper method to loop through the array
		angular.forEach(arr, function(item){

			if(item.name.toLowerCase().indexOf(searchString) !== -1){
				result.push(item);
			}

		});

		return result;
	};

});
