angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
    
})

.controller('loginCtrl', function($scope, $http, $rootScope, $location) {
    $scope.loginData = {};
    $scope.loginData.name = [];
    $scope.loginData.password = [];

    $scope.doLogin = doLogin;
    
    function doLogin() {
        if($scope.loginData.name && $scope.loginData.password != null) {
            $location.path('/playlists')
        }    
    }
})

.controller('PlaylistsCtrl', function($scope, $http, $rootScope) {
    $scope.cards = [];

    $http({
        method: 'GET',
        url: "http://www.mocky.io/v2/57e976ff0f00007d1f843a91"
    }).then(function(response){
        for (var i in response.data) {
            $scope.cards.push(response.data[i]);
        }
        console.log($scope.cards)
    })

})

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
})

.controller('profileCtrl', function($scope, $http, $rootScope) {
    $scope.profileDetail = [];
    $scope.profileDetailPrevOmens = [];
    $scope.profileDetailSocialMedia = [];

    $http({
        method: "GET",
        url: "http://www.mocky.io/v2/57ec1104110000aa212d36a8"
    }).then(function(response){
        $scope.profileDetail = response.data;
        console.log($scope.profileDetail);

        for (var i in response.data.previousOmen) {
            $scope.profileDetailPrevOmens.push(response.data.previousOmen[i])
        }

        for (var i in response.data.socialMedia) {
            $scope.profileDetailSocialMedia.push(response.data.socialMedia[i]);
        }

    })
})
