// Register Controllers
app.controller('uploadCtrl', uploadCtrl);
app.controller('dataFetchCtrl', dataFetchCtrl);
app.controller('faceCtrl', faceCtrl);
app.controller('synthCtrl', synthCtrl);
app.controller('sequencerCtrl', sequencerCtrl);


// Inject Dependencies
uploadCtrl.$inject = ['$scope', '$http', 'Upload'];
dataFetchCtrl.$inject = ['$scope', '$http', '$rootScope', 'dataService'];
faceCtrl.$inject = ['$scope', '$timeout', '$http', '$rootScope', 'faceService'];
synthCtrl.$inject = ['$rootScope'];
sequencerCtrl.$inject = ['$scope'];

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

function dataFetchCtrl($scope, $http, $rootScope, dataService) {
    $scope.view = {};
    dataService.getFaces().then(function(data) {
        $scope.view.faceIds = data.data;
    });
}

function synthCtrl($rootScope) {
    $rootScope.audioContext = new window.AudioContext();
    $rootScope.tuna = new Tuna($rootScope.audioContext);
}

function faceCtrl($scope, $timeout, $http, $rootScope, faceService) {
    $http.get('/faces/' + $scope.faceId).then(function(data) {
        $scope.face = data.data[0];
        // console.log('$scope.face:', $scope.face);

        var faceAttrs = faceService.getFacialAttributes($scope.face);
        var face = faceService.analyzeFace($scope.face);


        var leftEye = face.leftEye;
        var rightEye = face.rightEye;
        var mouth = face.mouth;
        var nose = face.nose;
        nose.area = faceService.getNoseArea(nose);

        $scope.leftEye = leftEye;
        $scope.rightEye = rightEye;
        $scope.mouth = mouth;
        $scope.nose = nose;

        var audioContext = $rootScope.audioContext;
        var output = audioContext.destination;

        // Tuna Effects
        var tuna = $rootScope.tuna;

        var delay = new tuna.Delay({
            feedback: 0.15, //0 to 1+
            delayTime: 6 * (rightEye.outerX - leftEye.outerX), //how many milliseconds should the wet signal be delayed?
            wetLevel: 0.3, //0 to 1+
            dryLevel: 1, //0 to 1+
            cutoff: 2000, //cutoff frequency of the built in lowpass-filter. 20 to 22050
            bypass: 0
        });

        var chorus = new tuna.Chorus({
            rate: (mouth.rightX / mouth.leftX) * 2, //0.01 to 8+
            feedback: mouth.leftX / mouth.rightX - .2, //0 to 1+
            delay: mouth.leftX / mouth.rightX, //0 to 1
            bypass: 0 //the value 1 starts the effect as bypassed, 0 or 1
        });

        // Signal flow chain: node --> effects --> output
        var chain = [output];
        // chain.unshift(filter);

        chain.unshift(chorus);
        chain.unshift(delay);

        // Play a face
        $scope.play = function() {

            $scope.oscillators = [];

            // Create a series of eight notes based on facial qualities

            // Left Eye Width
            var osc = faceService.makeTone((leftEye.innerX - leftEye.outerX), chain);
            $scope.oscillators.push(osc);

            // Left Eye Height
            osc = faceService.makeTone((leftEye.bottomY - leftEye.topY), chain);
            $scope.oscillators.push(osc);

            // Right Eye Width
            osc = faceService.makeTone((rightEye.outerX - rightEye.innerX), chain);
            $scope.oscillators.push(osc);

            // Right Eye Height
            osc = faceService.makeTone((rightEye.bottomY - rightEye.topY), chain);
            $scope.oscillators.push(osc);

            // Mouth Width
            osc = faceService.makeTone((mouth.rightX - mouth.leftX) / 3, chain);
            $scope.oscillators.push(osc);

            // Mouth Height
            osc = faceService.makeTone((mouth.underLipBottomY - mouth.underLipTopY) / 2, chain);
            $scope.oscillators.push(osc);

            // Nose Width
            osc = faceService.makeTone((nose.rightAlarOutTipX - nose.leftAlarOutTipX) / 2, chain);
            $scope.oscillators.push(osc);

            // Nose Height
            osc = faceService.makeTone((nose.tipY - nose.rootLeftY) / 2, chain);
            $scope.oscillators.push(osc);

            // Assign relative lengths to each note in the sequence
            for (var i = 0; i < $scope.oscillators.length; i++) {
                // var duration = Math.ceil(nose.area % ((i + 1) * 2) % 5) % 2 + 1;
                var duration = 1;
                $scope.oscillators[i].duration = duration;
                $scope.oscillators[i].next = $scope.oscillators[i + 1] || null;
            }

            // Play it!
            var notes = $scope.oscillators;
            $timeout(function() { // small time delay to let nodes start before playing - helps eliminate click
                playNote(notes[0]);
            }, 10);
        };

        function playNote(note) {
            if (!note) return;
            note.gainNode.gain.value = 1;
            $timeout(function() {
                note.gainNode.gain.value = 0;
                playNote(note.next)
            }, note.duration * 300);
        }
    });
}

function sequencerCtrl($scope) {
    $scope.view = {};
    $scope.view.faces = [];
}
