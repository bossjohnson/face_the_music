// Register Controllers
app.controller('uploadCtrl', uploadCtrl);
app.controller('dataFetchCtrl', dataFetchCtrl);
app.controller('faceCtrl', faceCtrl);
app.controller('synthCtrl', synthCtrl);

// Inject Dependencies
uploadCtrl.$inject = ['$scope', '$http', 'Upload'];
dataFetchCtrl.$inject = ['$scope', '$http', '$rootScope'];
faceCtrl.$inject = ['$scope', '$timeout', '$http', '$rootScope', 'faceService'];
synthCtrl.$inject = ['$rootScope'];

// Controller Functions
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
        });
    }
}

function dataFetchCtrl($scope, $http, $rootScope) {
    $scope.view = {};
    $http.get('/faces/all').then(function(data) {
        $scope.view.faceIds = data.data;
    });

    $rootScope.imagesHidden = false;

    $rootScope.hideImages = function() {
        $rootScope.imagesHidden = !$rootScope.imagesHidden;
    }
}

function synthCtrl($rootScope) {
    $rootScope.audioContext = new window.AudioContext();
    $rootScope.tuna = new Tuna($rootScope.audioContext);
}

function faceCtrl($scope, $timeout, $http, $rootScope, faceService) {
    $http.get('/faces/' + $scope.faceId).then(function(data) {
        $scope.face = data.data[0];

        var face = $scope.face;

        var analyzedFace = faceService.analyzeFace(face);

        var leftEye = analyzedFace.leftEye;
        var rightEye = analyzedFace.rightEye;
        var mouth = analyzedFace.mouth;
        var nose = analyzedFace.nose;

        $scope.leftEye = leftEye;
        $scope.rightEye = rightEye;
        $scope.mouth = mouth;
        $scope.nose = nose;

        var audioContext = $rootScope.audioContext;
        var output = audioContext.destination;
        var tuna = $rootScope.tuna;
        var osc = audioContext.createOscillator();

        osc.connect(output);

        osc.frequency.value = (rightEye.outerX - leftEye.outerX) * 10;

        $scope.play = function() {
            osc.start();
            $timeout(function() {
                osc.stop();
            }, 1000);
        }
    });
}
