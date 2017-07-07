angular.module('homemodule').directive('planets', function(){
return {
replace: false,	
restrict: 'E',
scope: true,	
templateUrl: 'home/templates/planets-view.html'
}
});