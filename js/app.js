var myApp = angular.module('myApp', ['ngRoute', function ($routeProvider) {
   $routeProvider.when('/', {
      templateUrl: 'partials/main',
      controller: 'MainCtrl'
   }).otherwise({
      redirectTo: '/'
   });
}]);