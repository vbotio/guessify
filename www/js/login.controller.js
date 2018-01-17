// angular.module('starter.controllers', ['ionic'])

.controller('loginCtrl', function($scope, $state, $http, $rootScope, $location, $ionicPopup, $timeout, $ionicHistory) {
    $scope.loginData = {};
    $scope.loginData.username = null;
    $scope.loginData.password = null;

    $scope.doLogin = doLogin;

    function doLogin() {

        if($scope.loginData.username && $scope.loginData.password) {
            $ionicHistory.clearHistory();
            $state.go('app.playlists')
        } else {
            var alertPopup = $ionicPopup.alert({
                title: 'err',
                template: 'Usuário ou senha incorreto'
            });
            alertPopup.then(function(res) {

            })
        }
    }
})