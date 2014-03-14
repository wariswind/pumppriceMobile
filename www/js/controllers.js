var app=angular.module('pump.controllers', [])

.controller('MainCtrl', function($scope, $ionicSideMenuDelegate,$rootScope,fuelData) {
  $scope.leftButtons = [{
    type: 'button-light',
	content: '<i class="icon ion-ios7-paperplane-outline dark"></i>Buy Fuel',
    tap: function(e) {
      $ionicSideMenuDelegate.toggleLeft($scope.$$childHead);
    }
  }];
  $scope.rightButtons = [{
    type: 'button-icon button-clear ion-navicon',
    tap: function(e) {
      $ionicSideMenuDelegate.toggleRight($scope.$$childHead);
    }
  }];
  
  fuelData.getFuels().then(function(response) {
      $scope.fuels = response;
	  console.log($scope.fuels)
    })
	$scope.leaveside = function() {
		$ionicSideMenuDelegate.toggleLeft($scope.$$childHead);
	}
	$scope.menuside = function() {
		$ionicSideMenuDelegate.toggleRight($scope.$$childHead);
	}
  
})

// A simple controller that fetches a list of data from a service
.controller('homeCtrl', function($scope,$rootScope, $ionicModal,$ionicLoading,$http,localStorageService,fuelData) {
  // "Pets" is a service returning mock data (services.js)
   $scope.user={};
    $scope.buyfuel = function() {
    $scope.sideMenuController.toggleLeft();
  };
  
  //localStorageService.clearAll();
  $scope.show = function() {

    // Show the loading overlay and text
    $scope.loading = $ionicLoading.show({

      // The text to display in the loading indicator
      content: 'Loading',

      // The animation to use
      animation: 'fade-in',

      // Will a dark overlay or backdrop cover the entire view
      showBackdrop: true,

      // The maximum width of the loading indicator
      // Text will be wrapped if longer than maxWidth
      maxWidth: 200,
	 
    });
  };
$scope.hide = function(){
    $scope.loading.hide();
  };
  $ionicModal.fromTemplateUrl('templates/login.html', function(modal) {
    $scope.Mymodal = modal;
  }, {
    // Use our scope for the scope of the modal to keep it simple
    scope: $scope,
    // The animation we want to use for the modal entrance
    animation: 'slide-in-up'
  });
  $ionicModal.fromTemplateUrl('templates/register.html', function(modal) {
    $scope.MyRegModal = modal;
  }, {
    // Use our scope for the scope of the modal to keep it simple
    scope: $scope,
    // The animation we want to use for the modal entrance
    animation: 'slide-in-up'
  });
  $scope.memberReglog = function() {
    $scope.MyRegModal.show();
	$scope.Mymodal.hide();
  };
  $scope.memberlogmodel = function() {
	$scope.Mymodal.show();
	$scope.MyRegModal.hide();
  };
   $scope.openModal = function() {
    $scope.Mymodal.show();
  };

 $scope.Userdetails = localStorageService.get('localUser');
 
 
 if ($scope.Userdetails === null) {
	 
setTimeout( function() {$scope.openModal()}, 200);
      
 }
 else{
 }
 $scope.memberSignIn = function() {
	  $scope.show();
	  $http({
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    url: 'http://pumpprice.com.ng/index.php/mobileapp/member_login',
    method: "POST",
    data: {
      "username" : $scope.user.username,
      "pasd" : $scope.user.pasd
    },
  })
  .success(function(data) {
	  if(data.error == 1){
    	$scope.logdetails=data;
		localStorageService.add('localUser',$scope.logdetails);
		$scope.Userdetails = localStorageService.get('localUser');
		$scope.Mymodal.hide();
	  }
	  else if(data.error == 2){
		  $scope.logerror='Invalid login details';
	  }
	  $scope.hide(); 
  });
 }
   $scope.memberRegister = function() {
	$scope.show();
	 $http({
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    url: 'http://pumpprice.com.ng/index.php/mobileapp/member_register',
    method: "POST",
    data: {
      "name" : $scope.user.name,
      "email" : $scope.user.email,
	  "phone" : $scope.user.phone,
	  "pasd" : $scope.user.pasd,
	  "regtype" : $scope.user.type,
    },
  })
  .success(function(data) {
    if(data.error == 1){
    	$scope.logdetails=data;
		localStorageService.add('localUser',$scope.logdetails);
		$scope.Userdetails = localStorageService.get('localUser');
		$scope.MyRegModal.hide();
	  }
	  else if(data.error == 0){
		  $scope.logregerror='Email or phone has already been used';
	  }
	 $scope.hide(); 
  });
 }
  
  
})


// A simple controller that shows a tapped item's data
.controller('LoginCtrl', function($scope, $stateParams) {
  // "Pets" is a service returning mock data (services.js)
})

.controller('fuelformCtrl', function($scope,$rootScope,$stateParams,$ionicSideMenuDelegate, $ionicModal,$ionicLoading,$http,localStorageService,fuelData) {
	$scope.fuel = fuelData.get($stateParams.fuelid);
	$scope.buyProd={};
	$scope.cal_fuel = function() {
		if($scope.buyProd.cash_volume==0){
			$scope.buyProd.totallit=Number($scope.buyProd.cash_amt/$scope.fuel.price).toFixed(2);
			$scope.buyProd.total_val=Number($scope.buyProd.cash_amt).toFixed(2);
		}
		else if($scope.buyProd.cash_volume==1){
			$scope.buyProd.totallit=Number($scope.buyProd.cash_amt).toFixed(2);
			$scope.buyProd.total_val=Number($scope.buyProd.cash_amt*$scope.fuel.price).toFixed(2);
			
		}
	}
	 $ionicModal.fromTemplateUrl('templates/nopayment.html', function(modal) {
    $scope.nopaymentModal = modal;
  }, {
    // Use our scope for the scope of the modal to keep it simple
    scope: $scope,
    // The animation we want to use for the modal entrance
    animation: 'slide-in-up'
  });
	$scope.make_payment=function() {
		$scope.nopaymentModal.show();
	}
	$scope.back_payment=function() {
		$scope.nopaymentModal.hide();
	}
})

var FLOAT_REGEXP = /^\-?\d+((\.|\,)\d+)?$/;
app.directive('smartFloat', function() {
return {
require: 'ngModel',
link: function(scope, elm, attrs, ctrl) {
ctrl.$parsers.unshift(function(viewValue) {
if (FLOAT_REGEXP.test(viewValue)) {
ctrl.$setValidity('float', true);
return viewValue;
} else {
ctrl.$setValidity('float', false);
return undefined;
}
});
}
};
});