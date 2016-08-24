// app.controller('testController', testController);
// testController.$inject = ['$scope', '$http'];

app.controller('uploadCtrl', uploadCtrl);
uploadCtrl.$inject = ['$scope', '$http', 'Upload'];


// function testController($scope, $http) {
//     $scope.view = {};
//     $scope.uploadImage = function() {
//         console.log('uploading image...');
//     }
// }

function uploadCtrl($scope, $http, Upload) {
    $scope.upload = {};

    $scope.uploadPhoto = function(photo) {
        Upload.upload({
            url: '/upload',
            data: {
                file: photo
            }
        }).then(function(data) {
            console.log(data);
        });
    }
}
