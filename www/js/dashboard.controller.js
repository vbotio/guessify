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