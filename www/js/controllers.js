angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  // $scope.playlists = [
  //   { title: 'Reggae', id: 1 },
  //   { title: 'Chillaaaaaaa', id: 2 },
  //   { title: 'Dubstep', id: 3 },
  //   { title: 'Indie', id: 4 },
  //   { title: 'Rap', id: 5 },
  //   { title: 'Cowbell', id: 6 }
  // ];
  $scope.cards = [
    {
      title: "O dolar vai chegar a R$4,00 no dia 14 de setembro de 2015",
      img: "http://goo.gl/RtTSKc",
      authorPhoto: "http://lorempixel.com/50/50/people/3/",
      author: "Vitor",
      datePosted: "27/08/2016",
      thumbsUp: "245",
      thumbsDown: "200"
    },
    {
      title: "Brasil será campeão olimpico de 2016",
      img: "http://goo.gl/VlmOJc",
      authorPhoto: "http://lorempixel.com/50/50/people/3/",
      author: "Thiago",
      datePosted: "15/03/2017",
      thumbsUp: "245",
      thumbsDown: "200"
    },
    {
      title: "O dolar vai chegar a R$4,00 no dia 14 de setembro de 2015",
      img: "http://goo.gl/RtTSKc",
      authorPhoto: "http://lorempixel.com/50/50/people/3/",
      author: "Vitor",
      datePosted: "27/08/2016",
      thumbsUp: "245",
      thumbsDown: "200"
    },
    {
      title: "O dolar vai chegar a R$4,00 no dia 14 de setembro de 2015",
      img: "http://goo.gl/RtTSKc",
      authorPhoto: "http://lorempixel.com/50/50/people/3/",
      author: "Vitor",
      datePosted: "27/08/2016",
      thumbsUp: "245",
      thumbsDown: "200"
    },
    {
      title: "O dolar vai chegar a R$4,00 no dia 14 de setembro de 2015",
      img: "http://goo.gl/RtTSKc",
      authorPhoto: "http://lorempixel.com/50/50/people/3/",
      author: "Vitor",
      datePosted: "27/08/2016",
      thumbsUp: "245",
      thumbsDown: "200"
    }
  ]
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});