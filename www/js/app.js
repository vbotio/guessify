angular.module('starter', ['ionic', 'starter.controllers', 'ionic-ajax-interceptor'])

.run(function($ionicPlatform, $rootScope) {

    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})
.run(function(AjaxInterceptor) {
    AjaxInterceptor.run();
})
.config(function(AjaxInterceptorProvider){
    AjaxInterceptorProvider.config({
        title: "",
        defaultMessage: '',
        transformResult: function(data) {
            data.someKey = "algum valor";
            return data;
        }
    })
})

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.search', {
        url: '/search',
        views: {
            'menuContent': {
                templateUrl: 'templates/search.html'
            }
        }
    })

    .state('app.browse', {
        url: '/browse',
        views: {
            'menuContent': {
                templateUrl: 'templates/browse.html'
            }
        }
    })
    .state('app.playlists', {
        url: '/playlists',
        views: {
            'menuContent': {
                templateUrl: 'templates/playlists.html',
                controller: 'PlaylistsCtrl'
            }
        }
    })
    .state('app.single', {
        url: '/playlists/:playlistId',
        views: {
            'menuContent': {
                templateUrl: 'templates/playlist.html',
                controller: 'PlaylistCtrl'
            }
        }
    })
    .state('app.profile', {
        url: '/profile',
        views: {
            'menuContent': {
                templateUrl: 'templates/profile.html',
                controller: 'profileCtrl'
            }
        }
    })
    .state('app.login', {
        url: '/login',
        views: {
            'menuContent': {
                templateUrl: 'templates/login.html',
                controller: 'loginCtrl'
            }
        }
    })
    .state('app.newCard', {
        url: '/newCard',
        views: {
            'menuContent': {
                templateUrl: 'templates/newCard.html',
                controller: 'newCardCtrl'
            }
        }
    })
    .state('app.connection', {
        url: '/badConnection',
        views: {
            'menuContent': {
                templateUrl: 'templates/badConnection.html',
                controller: 'connectionCtrl'
            }
        }
    })
    $urlRouterProvider.otherwise('/app/login');
});
