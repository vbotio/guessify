angular.module('starter.controllers')

.controller('loginCtrl', function($scope, $state, $http, $rootScope, $location, $ionicPopup, $timeout, $ionicHistory) {
    $scope.doLogin = doLogin;
    $rootScope.profileData = {};
    
    function doLogin() {
        FB.getLoginStatus(function(response) {
        	if(response.status === 'connected') {
        		console.log("already logged in, just cached response")
        		$state.go("app.profile")
        	} else {
        		FB.login(function(response) {
        		    if(response.authResponse) {
        		    	$scope.accessToken = response.authResponse.accessToken;
        		    	FB.api('/me?fields=id, name, about, email, picture.width(360).height(360)', function(res) {
        		    		// console.log("api", res);
        		    		$rootScope.profileData.id = res.id; 
        		    		$rootScope.profileData.name = res.name;
        		    		$rootScope.profileData.about = res.about;
        		    		$rootScope.profileData.email = res.email;
        		    		$rootScope.profileData.picture = res.picture.url;
        		    		console.log("api", $rootScope.profileData);
        		    	})
        		    }
        		})		
        	}
        })
        
    }
})