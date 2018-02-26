angular.module('starter.controllers', ['ionic'])
.factory("dashboardService", ['$http', '$rootScope', function($http, $rootScope) {
	return {
		getData: function() {
			return $http.get($rootScope.apiUrl + "all").then(function(response) {
				return response.data;
			})
		}
	}
}]);

//login service
//item service
// new card service
//profile service
angular.module('starter.controllers')

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $rootScope) {
    $rootScope.apiUrl = "https://ndamus.herokuapp.com/api/guess/";
});
angular.module('starter.controllers')

.controller('PlaylistsCtrl', function($scope, $http, $rootScope, $ionicHistory, $ionicModal, $ionicGesture, $ionicActionSheet, $timeout, dashboardService) {
    $ionicHistory.clearHistory();
    $scope.cards = [];
    $scope.init = init;
    $scope.sumLike = sumLike;
    $scope.subLike = subLike;
    $scope.doRefresh = doRefresh;
    $scope.onHold = onHold;

    init();

    $ionicModal.fromTemplateUrl('my-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal){
        $scope.modal = modal;
    })


    function init() {
        dashboardService.getData().then(function(response) {
            for(var i in response) {
                $scope.cards.push(response[i]);
            }
            console.log($scope.cards)
        })   
    }

    function doRefresh() {
        init();
        $scope.$broadcast("scroll.refreshComplete")
    }
    
    function sumLike($event) {
        var click = angular.element($event.currentTarget)[0].getAttribute("data-click"),
            _id   = angular.element($event.currentTarget).parent().parent()[0].getAttribute("data-id"),
            elem  = angular.element($event.currentTarget)[0].innerText
        
        console.log(click);


        if(click === null || click === "") {
            var sum = Number(elem) + Number(1);

            angular.element($event.currentTarget)[0].innerHTML = '<i class="icon ion-arrow-up-c"></i>'+sum;
            angular.element($event.currentTarget)[0].setAttribute("data-click", "liked");
            $http({
                method: "PUT",
                url: $rootScope.apiUrl + _id + "/thumbup"
            }).then(function(response) {
                console.log("liked")
            })    
        } else if(click === "liked") {
            
            var sum = Number(elem) - Number(1);

            angular.element($event.currentTarget)[0].innerHTML = '<i class="icon ion-arrow-up-c"></i>'+sum;
            angular.element($event.currentTarget)[0].setAttribute("data-click", "");

            $http({
                method: "PUT",
                url: $rootScope.apiUrl + _id + "/thumbup"
            }).then(function(response) {
                console.log("remove like");
            })
        }
    }

    function subLike($event) {
        var click = angular.element($event.currentTarget)[0].getAttribute("data-click"),   
            _id = angular.element($event.currentTarget).parent().parent()[0].getAttribute("data-id"),
            elem = angular.element($event.currentTarget)[0].innerText;

        if (click === null || click === "") {
            sub = Number(elem) + Number(1);
        
            angular.element($event.currentTarget)[0].innerHTML = '<i class="icon ion-arrow-down-c"></i>'+sub;
            angular.element($event.currentTarget)[0].setAttribute("data-click", "disliked");

            $http({
                method: "PUT",
                url: $rootScope.apiUrl + _id + "/thumbdown"
            }).then(function(response) {
                console.log('disliked');
            })
        } else if(click === "disliked") {
            
            var sub = Number(elem) - Number(1);

            angular.element($event.currentTarget)[0].innerHTML = '<i class="icon ion-arrow-down-c"></i>'+sub;
            angular.element($event.currentTarget)[0].setAttribute("data-click", "");

            $http({
                method: "PUT",
                url: $rootScope.apiUrl + _id + "/thumbdown"
            }).then(function(response) {
                console.log('remove dislike');
            })
        }
        
    }

    function onHold() {
        $ionicActionSheet.show({
            buttons: [
                { text: 'report this' }
            ], 
            destructiveText: 'Delete',
            titleText: '',
            cancelText: 'Cancel',
            cancel: function() {
                  hideSheet();
            },
            buttonClicked: function(index) {
               return true;
            }
        });
    }
});
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
angular.module('starter.controllers')

.controller('PlaylistCtrl', function($scope, $stateParams, $http, $rootScope) {
    $scope.cardDetail = [];
    
    $http({
        method: "GET",
        url: "http://www.mocky.io/v2/57eac524130000711f63dd76"
    }).then(function(response) {
        for (var i in response.data) {
            $scope.cardDetail.push(response.data[i]);
        }
        console.log($scope.cardDetail);
    })
});
angular.module('starter.controllers')

.controller('newCardCtrl', function($scope, $http, $rootScope, $window, $ionicPopup) {
    $scope.params = {
        title: ""
    }
    $scope.submit = function() {
        $http({
            method: "POST",
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },
            url:    $rootScope.apiUrl,
            data:   "title=" + $scope.params.title
            
        }).then(function(response) {
            var alertPopup = $ionicPopup.alert({
                title: "",
                template: response.data.message
            });
        })
    }
});
angular.module("starter.controllers")
.controller('profileCtrl', function($scope, $state, $http, $rootScope, $ionicPopup) {
    $scope.profileDetail = [];
    $scope.profileDetailPrevOmens = [];
    $scope.profileDetailSocialMedia = [];

    $scope.loading = true;

    $http({
        method: "GET",
        url: "http://www.mocky.io/v2/57ec1104110000aa212d36a8"
    }).then(function(response){
        $scope.profileDetail = response.data;
        
        for (var i in response.data.previousOmen) {
            $scope.profileDetailPrevOmens.push(response.data.previousOmen[i])
        }

        for (var i in response.data.socialMedia) {
            $scope.profileDetailSocialMedia.push(response.data.socialMedia[i]);
        }

    }).catch(function(response){
        $scope.loading = false;
        if(response.status === -1) {
            var alertPopup = $ionicPopup.alert({
                title: 'Hum...',
                template: 'Parece que temos um problema com sua conexão :('
            });
            alertPopup.then(function(res) {
                $state.go("app.connection");
            })
        }
    }).finally(function(response) {
        $scope.loading = false;
    })
});