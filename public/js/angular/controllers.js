app.controller('uploadCtrl', uploadCtrl);
uploadCtrl.$inject = ['$scope', '$http', 'Upload'];

function uploadCtrl($scope, $http, Upload) {
    $scope.upload = {};

    $scope.uploadPhoto = function(photo) {
        Upload.upload({
            url: '/upload',
            data: {
                file: photo
            }
        }).then(function(data) {
            $scope.upload.faceData = data.data.faceData;
            $scope.upload.url = data.data.faceUrl;
            console.log($scope.upload.faceData);
        });
    }
}
