var myApp = angular.module('myApp', ['ngRoute', function ($routeProvider) {
   $routeProvider.when('/', {
      templateUrl: '/index.html'
   }).otherwise({
      redirectTo: '/'
   });
}]);

// Controllers
myApp.controller('MainCtrl', function ($scope, placesService) {
   $scope.detailedPlaces = placesService.getDetailedResults();
});

// Services/Factories/Providers
myApp.service('placesService', function() {

   var service;
   var infowindow;                        // what is this?
   var detailsRequest = {};
   var nearbyResults = [];                // array of place objects, needed for referencing detailed results
   var detailedResults = [];              // array of detailed results
   var gps;

   this.getDetailedResults = function() {
      return detailedResults;
   }

   //uses gps to grab coordinates of user location
   function getLocation(callback) {
      if (navigator.geolocation)
         navigator.geolocation.getCurrentPosition(function(position) {
            gps = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            return callback(gps);
         });
      else
         alert("Geolocation is not enabled or supported by browser/device.");
   }

   // sends request for nearby places
   function init(location) {
      nearbyRequest = {
         location: location,
         types: ['food'],
         rankBy: google.maps.places.RankBy.DISTANCE
      };

      var bounds = new google.maps.LatLngBounds();

      service = new google.maps.places.PlacesService(document.getElementById('map'));
      service.nearbySearch(nearbyRequest, nearbyCallBack);
   }

   // stores objects of nearbySearch in array
   function nearbyCallBack(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
         for (var i in results)
            nearbyResults[i] = results[i];
         if (nearbyResults.length === 20)
            initDetails(detailsRequest);
      } else {
         console.log("nearbyCallBack: PlacesServiceStatus not OK.");
      }
   }

   // places reference of nearbySearch results, and runs getDetails
   function initDetails(detailsRequest) {
      var count = -1;

      var detailInterval = setInterval(function() {
         if(count < (nearbyResults.length - 1)) {
            ++count;
            detailsRequest.reference = nearbyResults[count].reference;
            service.getDetails(detailsRequest, function(place, status) {
               if (status == google.maps.places.PlacesServiceStatus.OK)
                  detailedResults[count] = place;
               else
                  console.log("detailCallBack: PlacesServiceStatus not OK.");
            });
         } else {
            // stops interval after all results return
            clearInterval(detailInterval);
            for (var i in detailedResults)
               console.log(detailedResults[i]);
         }
      }, 390);
   }

   getLocation(init); // grabs coordinates and initializes nearbySearch
});