//1.
describe('HomeCtrl', function () {
    //2.
beforeEach(module('SWSearchApp'));    
var homeController,
scope,
planetService;

beforeEach(inject(function(_$rootScope_,_$controller_,_planetService_){
    homeController = _$controller_;
    scope = _$rootScope_.$new();
    planetService = _planetService_; 
  }));

 it('should have a homeController', function() {
    expect(homeController).toBeDefined();
  });

 

});