// when [/path] use template [url]
var app = angular.module('hoursOps', ['ngAnimate', 'ngRoute', 'ngFitText']);

app.config(function ($routeProvider, $locationProvider) {
  $routeProvider.when('/', {
    controller: 'MainCtrl',
    controllerAs: 'x',
    templateUrl: 'partials/splash.html'
  }).when('/home', {
    controller: 'MainCtrl',
    controllerAs: 'x',
    templateUrl: 'partials/main.html'
  }).otherwise({
    redirectTo: '/'
  });
  
  // $locationProvider.html5Mode(true);
});
