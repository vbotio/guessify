angular.module('starter.controllers')

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $rootScope) {
    $rootScope.apiUrl = "https://ndamus.herokuapp.com/api/guess/";
});