app.service('placesService', function() {
   var service;

   this.getPlaces = function() { return detailedResults; };

   this.getVerif = function() { return complete; };

   this.makeRequest = function(typesArray, callback) {
      complete = false;
      init(requestResults, typesArray);
   };

   // self-called function (initialize) with request function passed in as callback
   // uses gps to grab coordinates of user location
   var gps;
   var requestTypes = ['cafe', 'restaurant', 'meal_takeaway', 'meal_delivery', 'bar', 'bakery'];
   (function init(requestTypes, callback) {
      if (navigator.geolocation)
         navigator.geolocation.getCurrentPosition(function(position) {
            gps = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            return callback(gps, requestTypes);
         });
      else
         alert("Geolocation is not enabled or supported by browser/device.");
   })(requestTypes, requestResults);

   // sends request for nearby places
   // var key = undefined;
   function requestResults(location, types) {
      nearbyRequest = {
         location: location,
         types: types,
         // keyword: key || null,
         // radius: 1000,
         rankBy: google.maps.places.RankBy.DISTANCE
      };

      var bounds = new google.maps.LatLngBounds();

      service = new google.maps.places.PlacesService(document.getElementById('map'));
      service.nearbySearch(nearbyRequest, nearbyCallback);
      // service.radarSearch(nearbyRequest, nearbyCallback);
   }

   // stores objects of nearbySearch in array
   var nearbyResults = [];                // array of place objects, needed for referencing detailed results
   function nearbyCallback(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
         nearbyResults = results;
         initDetails(0);
      } else {
         console.log("nearbyCallBack: PlacesServiceStatus not OK. Trying again.");
         setTimeout(function() { nearbyCallBack(results, status); }, 70);
      };
   }

   // recursive call to details ensures every detail is returned and completed
   // if withing range, make call and push to array
   // if fail, call again at delay 70ms to prevent consistently failed calls
   var complete = false;
   var detailedResults = [];              // array of detailed results
   function initDetails(count) {
      if (count < nearbyResults.length) {
         service.getDetails(nearbyResults[count], function(place, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
               detailedResults.push(place);
               initDetails(count + 1);
            } else {
               setTimeout(function() { initDetails(count) }, 70);
            };
         }); // end call
      } else {
         complete = true;
         for (var i in detailedResults) console.log(detailedResults[i]);
      }; // end if
   }
});