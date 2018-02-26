angular.module('starter.controllers')

.controller('loginCtrl', ['$scope', '$state', '$http', '$rootScope', '$location', '$ionicPopup', '$timeout', '$ionicHistory', function($scope, $state, $http, $rootScope, $location, $ionicPopup, $timeout, $ionicHistory) {
    $scope.doLogin = doLogin;
    $rootScope.profileData = {};
    $rootScope.accessToken = '';

    function loginFacebook() {
    	FB.login(function(response) {
    	    if(response.authResponse) {
    	    	$rootScope.accessToken = response.authResponse.accessToken;
    	    	window.localStorage.setItem("accessToken", $rootScope.accessToken);
    	    	FB.api('/me?fields=id, name, about, email, picture.width(360).height(360)', function(res) {
    	    		console.log("res", res);
    	    		window.localStorage.setItem('fbId', res.id);
    	    		window.localStorage.setItem('fbname', res.name);
    	    		window.localStorage.setItem('about', res.about);
    	    		window.localStorage.setItem('email', res.email);
    	    		window.localStorage.setItem('picture', res.picture.data.url);
    	    		$state.go("app.profile");
    	    	})
    	    }
    	})
    }

    function doLogin() {
    	FB.getLoginStatus(function(response) {
    		if(response.status === 'connected') {
        		console.log("already logged in, just cached response")
        		// $state.go("app.profile")
        		FB.logout(window.localStorage.getItem("accessToken").JSON.stringify());
        	} else {
        		loginFacebook();
        	}
        })
    }
}])