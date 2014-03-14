// JavaScript Document
angular.module('pump.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('fuelData', function($http, $rootScope,$q) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var fuels=[];
  return {
    getFuels: function() {
		 var deferred = $q.defer();
      $http.get('http://pumpprice.com.ng/index.php/mobileapp/fetch_fuel').success(function(response) {
		  deferred.resolve(response);
        fuels = response;
      })
	  return deferred.promise;
    },
	get: function(fuelId) {
      // Simple index lookup
      return fuels[fuelId];
    }
  };

  
});
