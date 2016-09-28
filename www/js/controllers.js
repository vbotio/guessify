angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
    $scope.loginData = {};

    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.closeLogin = function() {
        $scope.modal.hide();
    };
    
    $scope.login = function() {
        $scope.modal.show();
    };

    $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);

        $timeout(function() {
            $scope.closeLogin();
        }, 1000);
    };
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
    $scope.profileDetailPrevOmens = []

    $http({
        method: "GET",
        url: "http://www.mocky.io/v2/57ebde9c110000251b2d3672"
    }).then(function(response){
        $scope.profileDetail = response.data;
        console.log($scope.profileDetail);

        for (var i in response.data.previousOmen) {
            $scope.profileDetailPrevOmens.push(response.data.previousOmen[i])
        }
    })
})
