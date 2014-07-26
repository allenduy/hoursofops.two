app.service('placesService', function() {
   var service;
   var infowindow;                        // ?
   var nearbyResults = [];                // array of place objects, needed for referencing detailed results
   var detailedResults = [];              // array of detailed results
   var gps;
   var complete = false;

   this.getPlaces = function() {
      return detailedResults;
   };

   this.getVerif = function() {
      return complete;
   };

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
         for (var i in results) nearbyResults[i] = results[i];
         if (nearbyResults.length === 20) initDetails(0);
      } else {
         console.log("nearbyCallBack: PlacesServiceStatus not OK.");
      };
   }

   // recursive call to details
   // if withing range, make call and push to array
   // if fail, call again at delay 70ms to prevent consistently failed calls
   function initDetails(count) {
      if (count < nearbyResults.length) {
         service.getDetails(nearbyResults[count], function(place, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
               detailedResults.push(place);
               initDetails(count + 1);
            } else {
               setTimeout(function() { initDetails(count); }, 70);
            };
         }); // end call
      } else {
         complete = true;
         for (var i in detailedResults) console.log(detailedResults[i]);
      }; // end if
   }

   getLocation(init); // grabs coordinates and initializes nearbySearch
});