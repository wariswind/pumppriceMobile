// JavaScript Document
angular.module('pump', ['ionic','LocalStorageModule', 'pump.controllers','pump.services'])


.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('products', {
      url: "/product",
      abstract: true,
      templateUrl: "templates/services.html",
	  
    })

    // the pet tab has its own child nav-view and history
    .state('products.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "templates/home.html",
		  controller: 'homeCtrl'
        }
      }
    })
	.state('products.fuelform', {
      url: "/fuelform/:fuelid",
      views: {
        'menuContent' :{
          templateUrl: "templates/fuelform.html",
		  controller: 'fuelformCtrl'
        }
      }
    })


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('product/home');

});

