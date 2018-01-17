angular.module('starter.controllers', ['ionic'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $rootScope) {
    $rootScope.apiUrl = "https://ndamus.herokuapp.com/api/guess/";
})
// angular.module('starter.controllers', ['ionic'])

.controller('PlaylistsCtrl', function($scope, $http, $rootScope, $ionicHistory, $ionicModal, $ionicGesture, $ionicActionSheet, $timeout) {
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
        $http({
            method: 'GET',
            url: $rootScope.apiUrl + "all"
        }).then(function(response){
            console.log("playlists", response);
            for (var i in response.data) {
                $scope.cards.push(response.data[i]);
            }
        })    
    }

    function doRefresh() {
        init();
        $scope.$broadcast("scroll.refreshComplete")
    }
    
    function sumLike($event) {
        var click = angular.element($event.currentTarget)[0].getAttribute("data-click"),
            _id =   angular.element($event.currentTarget).parent().parent()[0].getAttribute("data-id"),
            elem =  angular.element($event.currentTarget)[0].innerText
        
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
})
// angular.module('starter.controllers', ['ionic'])

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
})