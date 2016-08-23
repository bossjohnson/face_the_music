var app = angular.module('faceTheMusicApp', ['ngFileUpload', 'ngRoute', 'cloudinaryProvider']);
app.config(function($routeProvider, cloudinaryProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/upload.html',
            controller: 'uploadCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
    cloudinaryProvider
        .set("cloud_name", "face-the-music")
        .set("upload_preset", "dmrrvkjc");
});
