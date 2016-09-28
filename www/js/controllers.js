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

    $rootScope.imgCardBg;
    $rootScope.authorCard;
    $rootScope.essayCard;
    $rootScope.countUpCard;
    $rootScope.commentsNumber;
    $rootScope.countDownCard;

    $http({
        method: 'GET',
        url: "http://www.mocky.io/v2/57e976ff0f00007d1f843a91"
    }).then(function(response){
        for (var i in response.data) {
            $scope.cards.push(response.data[i]);
        }
       
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
        
    })
})

.controller('profileCtrl', function($scope, $http, $rootScope) {
    $scope.bigProfilePic = "http://tilomitra.com/wp-content/uploads/2014/08/avatar-cartoon.png"
})
