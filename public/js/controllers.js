app.controller('testController', testController);

function testController($scope, $http) {
    var cl = cloudinary.Cloudinary.new();
    cl.config("cloud_name", "face-the-music");

    $scope.view = {};
    $scope.uploadImage = function() {
        console.log('uploading image...');
    }
}
testController.$inject = ['$scope', '$http'];
