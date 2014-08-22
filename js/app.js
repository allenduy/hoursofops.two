// when [/path] use template [url]
var app = angular.module('hoursOps', ['ngAnimate', 'ngRoute', 'ngFitText']);

app.config(function ($routeProvider) {
  $routeProvider.when('/', {
    controller: 'MainController',
    controllerAs: 'mainCtrl',
    templateUrl: 'partials/main.html'
  }).when('/how', {
    // controller: '',
    // controllerAs: '',
    templateUrl: 'partials/how.html'
  }).otherwise({
    redirectTo: '/'
  });
});
