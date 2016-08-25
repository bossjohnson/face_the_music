var app = angular.module('faceTheMusicApp', ['ngFileUpload', 'ngRoute']);
app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
          templateUrl: 'partials/home.html',
          controller: ''
        })
        .when('/upload', {
            templateUrl: 'partials/upload.html',
            controller: 'uploadCtrl'
        })
        .when('/faces', {
            templateUrl: 'partials/allFaces.html',
            controller: 'dataFetchCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});
