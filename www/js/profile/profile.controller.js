angular.module("starter.controllers")
.controller('profileCtrl', ['$scope', '$state', '$http', '$rootScope', '$ionicPopup', function($scope, $state, $http, $rootScope, $ionicPopup) {
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
}]);