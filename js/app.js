// when ... go to ...
var app = angular.module('hoursOps', ['ngRoute', function ($routeProvider) {
   $routeProvider.when('/', {
      controller: 'MainController',
      controllerAs: 'mainCtrl',
      templateUrl: 'partials/main'
   }).otherwise({
      redirectTo: '/'
   });
}]);