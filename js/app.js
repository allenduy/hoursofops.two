var myApp = angular.module('myApp', ['ngRoute', function ($routeProvider) {
   $routeProvider.when('/', {
      templateUrl: '/index.html'
   }).otherwise({
      redirectTo: '/'
   });
}]);

// Controllers
myApp.controller('MainCtrl', function ($scope, placesFactory) {
   $scope.detailedPlaces = placesFactory.getDetailedResults();
});

// Services/Factories/Providers
myApp.factory('placesFactory', function() {

   var service;
   // var infowindow;                     // what is this?
   var detailsRequest = {};
   var nearbyResults = [];                // array of place objects, needed for referencing detailed results
   var detailedResults = [];               // array of detailed results
   var gps;

   var factory = {};

   factory.getDetailedResults = function() {
      return detailedResults;
   }

   //uses gps to grab coordinates of user location
   function getLocation(callback) {
      if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(function(position) {
            gps = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            return callback(gps);
         });
      } else {
         alert("Geolocation is not enabled or supported by browser/device.");
      }
   }

   // sends request for nearby places
   function initialize(location) {
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
         for (var i = 0; i < results.length; i++) {
            nearbyResults[i] = results[i];
         }
         if (nearbyResults.length === 20) {
            initializeDetails(detailsRequest);
         }
      } else {
         console.log("nearbyCallBack: PlacesServiceStatus not OK.");
      }
   }

   // places reference of nearbySearch results, and runs getDetails
   function initializeDetails(detailsRequest) {
      var count = -1;

      console.log("Begin Details")

      var detailInterval = setInterval(function() {
         if(count < (nearbyResults.length - 1)) {
            ++count;
            detailsRequest.reference = nearbyResults[count].reference;
            service.getDetails(detailsRequest, function(place, status) {
               if (status == google.maps.places.PlacesServiceStatus.OK) {
                  detailedResults[count] = place;
               } else {
                  console.log("detailCallBack: PlacesServiceStatus not OK.");
               }
            });
         } else {
            // stops interval after all results return
            clearInterval(detailInterval);
            console.log("Detailed Results Completed. There are " + detailedResults.length + " detail entries.");
            // refreshDialer();
            // for (var i = 0; i <= detailedResults.length; i++) {
            //    if (typeof detailedResults[i].photos[0] != "undefined") {
            //       for (var j = 0; j < detailedResults.photos.length; j++) {
            //          console.log(detailedResults[i].photos[j].getUrl({'max-height': 500, 'max-width': 500}));
            //       };
            //    };
            // };
         }
      }, 320);
   }

   getLocation(initialize); // grabs coordinates and initializes nearbySearch
   
   return factory;
});



function refreshDialer(){
   var container = document.getElementById("lister"); // currently displays "loading page"
   var content = container.innerHTML; // to display
   container.innerHTML= content;
   console.log("Content Refreshed");
}