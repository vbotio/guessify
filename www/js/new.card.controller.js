// angular.module('starter.controllers', ['ionic'])

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
})