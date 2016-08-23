app.controller('testController', testController);

app.controller('uploadCtrl', uploadCtrl);

function uploadCtrl($scope, Upload) {
    $scope.submit = function() {
        console.log($scope);
        console.log($scope.form);
        $scope.upload($scope.file);
    };
    $scope.upload = function(file) {
        Upload.upload({
            url: '/upload',
            data: {
                file: file
            }
        }).then(function(resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + JSON.stringify(resp.data));
        }, function(resp) {
            console.log('Error status: ' + resp.status);
        }, function(evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };
}
uploadCtrl.$inject = ['$scope', 'Upload'];

function testController($scope, $http) {
    // var cl = cloudinary.Cloudinary.new();
    // cl.config("cloud_name", "face-the-music");

    $scope.view = {};
    $scope.uploadImage = function() {
        console.log('uploading image...');
    }
}
testController.$inject = ['$scope', '$http'];
