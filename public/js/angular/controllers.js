app.controller('testController', testController);
testController.$inject = ['$scope', '$http'];

app.controller('uploadCtrl', uploadCtrl);
uploadCtrl.$inject = ['$scope', '$http'];


function testController($scope, $http) {
    $scope.view = {};
    $scope.uploadImage = function() {
        console.log('uploading image...');
    }
}

function uploadCtrl($scope, $http) {
    console.log('uploadCtrl connected');
    $scope.uploadPhoto = function() {
      $http.post('/upload')
        .then(function(data) {
          console.log(data);
        })
    }
}
