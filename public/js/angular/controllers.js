app.controller('testController', testController);

app.controller('uploadCtrl', uploadCtrl);

function uploadCtrl($scope, $rootScope, $routeParams, $location, $upload, cloudinary) {

    $scope.uploadFiles = function(files) {
        $scope.files = files;
        if (!$scope.files) return;
        angular.forEach(files, function(file) {
            if (file && !file.$error) {
                file.upload = $upload.upload({
                    url: "https://api.cloudinary.com/v1_1/" + cloudinary.config().cloud_name + "/upload",
                    data: {
                        upload_preset: cloudinary.config().upload_preset,
                        tags: 'faceAlbum',
                        context: 'photo=' + $scope.title,
                        file: file
                    }
                }).progress(function(e) {
                    file.progress = Math.round((e.loaded * 100.0) / e.total);
                    file.status = "Uploading... " + file.progress + "%";
                }).success(function(data, status, headers, config) {
                    $rootScope.photos = $rootScope.photos || [];
                    data.context = {
                        custom: {
                            photo: $scope.title
                        }
                    };
                    file.result = data;
                    $rootScope.photos.push(data);
                }).error(function(data, status, headers, config) {
                    file.result = data;
                });
            }
        });
    };




    // $scope.submit = function() {
    //     console.log($scope);
    //     console.log($scope.form);
    //     $scope.upload($scope.file);
    // };
    // $scope.upload = function(file) {
    //     Upload.upload({
    //         url: '/upload',
    //         data: {
    //             file: file
    //         }
    //     }).then(function(resp) {
    //         console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + JSON.stringify(resp.data));
    //     }, function(resp) {
    //         console.log('Error status: ' + resp.status);
    //     }, function(evt) {
    //         var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
    //         console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
    //     });
    // };
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
