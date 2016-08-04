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
  $scope.cards = [
    {
      title: "O dolar vai chegar a R$4,00 no dia 14 de setembro de 2015",
      img: "http://goo.gl/RtTSKc",
      authorPhoto: "http://lorempixel.com/40/40/people/4/",
      author: "Vitor Boccio",
      datePosted: "1 dia atrás",
      thumbsUp: "245",
      thumbsDown: "200",
      comments: "123",
      id: "1"
    },
    {
      title: "Brasil será campeão olimpico de 2016",
      img: "http://goo.gl/VlmOJc",
      authorPhoto: "http://lorempixel.com/40/40/people/4/",
      author: "Thiago Boccio",
      datePosted: "2 dias atrás",
      thumbsUp: "245",
      thumbsDown: "200",
      comments: "123",
      id: "2"
    },
    {
      title: "O dolar vai chegar a R$4,00 no dia 14 de setembro de 2015",
      img: "http://goo.gl/RtTSKc",
      authorPhoto: "http://lorempixel.com/40/40/people/4/",
      author: "Vitor Boccio",
      datePosted: "1 dia atrás",
      thumbsUp: "245",
      thumbsDown: "200",
      comments: "123",
      id: "3"
    },
    {
      title: "O dolar vai chegar a R$4,00 no dia 14 de setembro de 2015",
      img: "http://goo.gl/RtTSKc",
      authorPhoto: "http://lorempixel.com/40/40/people/4/",
      author: "Vitor Boccio",
      datePosted: "1 dia atrás",
      thumbsUp: "245",
      thumbsDown: "200",
      comments: "123",
      id: "4"
    },
    {
      title: "O dolar vai chegar a R$4,00 no dia 14 de setembro de 2015",
      img: "http://goo.gl/RtTSKc",
      authorPhoto: "http://lorempixel.com/40/40/people/4/",
      author: "Vitor Boccio",
      datePosted: "1 dia atrás",
      thumbsUp: "245",
      thumbsDown: "200",
      comments: "123",
      id: "5"
    }
  ]
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
    $scope.cards = [
        {
            "title": "O dolar vai chegar a R$4,00 no dia 14 de setembro de 2015",
            "img": "http://goo.gl/RtTSKc",
            "authorPhoto": "http://lorempixel.com/40/40/people/4/",
            "author": "Vitor Boccio",
            "datePosted": "1 dia atrás",
            "thumbsUp": "245",
            "thumbsDown": "200",
            "commentsNum": "123",
            "id": "1",
            "comments": [
                {
                    "authorCommentPhoto": "http://lorempixel.com/40/40/people/6/",
                    "author": "Beltrano de tal",
                    "text": "Ah sei la, acho que nao vai, sei lá... dificil",
                    "dateCommented": "8 hours ago"
                },
                {
                    "authorCommentPhoto": "http://lorempixel.com/40/40/people/5/",
                    "author": "Fulano de tal",
                    "text": "essa parada não vai acontecer não hein vixi epa opa vexe eita",
                    "dateCommented": "3 days ago"
                },
                {
                    "authorCommentPhoto": "http://lorempixel.com/40/40/people/7/",
                    "author": "Ciclano de tal",
                    "text": "também acho que vai acontecer isso aí!",
                    "dateCommented": "26/03/1990"
                },
                {
                    "authorCommentPhoto": "http://lorempixel.com/40/40/people/8/",
                    "author": "José Etvaldo",
                    "text": "ahuahuahuahauhauhauhauah",
                    "dateCommented": "2 minutes ago"
                }
            ]
        }
    ]
});
