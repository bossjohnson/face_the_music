var app = angular.module('faceTheMusicApp', ['ngFileUpload', 'ngRoute', 'dndLists']);
app.config(function($routeProvider) {
    $routeProvider
        .when('/upload', {
            templateUrl: 'partials/upload.html',
            controller: 'uploadCtrl'
        })
        .when('/faces', {
            templateUrl: 'partials/allFaces.html',
            controller: 'dataFetchCtrl'
        })
        .when('/sequencer', {
            templateUrl: 'partials/sequencer.html',
            controller: 'dataFetchCtrl'
        })
        .otherwise({
            redirectTo: '/faces'
        });
});
