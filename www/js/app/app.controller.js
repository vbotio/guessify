angular.module('starter.controllers')

.controller('AppCtrl', ['$scope', '$ionicModal', '$timeout', '$rootScope', function($scope, $ionicModal, $timeout, $rootScope) {
    $rootScope.apiUrl = "https://ndamus.herokuapp.com/api/guess/";
}]);