// when [/path] use template [url]
var app = angular.module('hoursOps', ['ngRoute'])

.config(function ($routeProvider) {
  $routeProvider.when('/', {
    controller: 'MainController',
    controllerAs: 'mainCtrl',
    templateUrl: 'partials/main'
  }).otherwise({
    redirectTo: '/'
  });
});