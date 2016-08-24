var app = angular.module('faceTheMusicApp', ['ngFileUpload', 'ngRoute']);
app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/upload.html',
            controller: 'uploadCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});
