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
            feedback: 0.3, //0 to 1+
            delayTime: 200, //how many milliseconds should the wet signal be delayed?
            wetLevel: 0.6, //0 to 1+
            dryLevel: 1, //0 to 1+
            cutoff: 2000, //cutoff frequency of the built in lowpass-filter. 20 to 22050
            bypass: 0
        });

        $scope.oscillators = [];
        var a = Math.pow(2, 1 / 12); // Constant used in calculating note frequency

        var osc = audioContext.createOscillator();
        osc.frequency.value = keyFilter(440 * Math.pow(a, Math.floor(leftEye.innerX - leftEye.outerX)));
        osc.connect(delay);
        delay.connect(output);
        $scope.oscillators.push(osc);

        osc = audioContext.createOscillator();
        osc.frequency.value = keyFilter(440 * Math.pow(a, Math.floor(rightEye.outerX - rightEye.innerX)));
        osc.connect(delay);
        delay.connect(output);
        $scope.oscillators.push(osc);

        osc = audioContext.createOscillator();
        osc.frequency.value = keyFilter(440 * Math.pow(a, Math.floor(leftEye.bottomY - leftEye.topY)));
        osc.connect(delay);
        delay.connect(output);
        $scope.oscillators.push(osc);

        osc = audioContext.createOscillator();
        osc.frequency.value = keyFilter(440 * Math.pow(a, Math.floor(rightEye.bottomY - rightEye.topY)));
        osc.connect(delay);
        delay.connect(output);
        $scope.oscillators.push(osc);

        osc = audioContext.createOscillator();
        osc.frequency.value = keyFilter(440 * Math.pow(a, Math.floor(nose.rootRightX - nose.rootLeftX)));
        osc.connect(delay);
        delay.connect(output);
        $scope.oscillators.push(osc);

        osc = audioContext.createOscillator();
        osc.frequency.value = keyFilter(440 * Math.pow(a, Math.floor(nose.leftAlarTopY - nose.rootLeftY)));
        osc.connect(delay);
        delay.connect(output);
        $scope.oscillators.push(osc);

        osc = audioContext.createOscillator();
        osc.frequency.value = keyFilter(440 * Math.pow(a, Math.floor(nose.rightAlarTopY - nose.rootRightY)));
        osc.connect(delay);
        delay.connect(output);
        $scope.oscillators.push(osc);

        osc = audioContext.createOscillator();
        osc.frequency.value = keyFilter(440 * Math.pow(a, Math.floor(nose.rightAlarOutTipX - nose.rightAlarTopX)));
        osc.connect(delay);
        delay.connect(output);
        $scope.oscillators.push(osc);

        osc = audioContext.createOscillator();
        osc.frequency.value = keyFilter(440 * Math.pow(a, Math.floor(nose.rightAlarOutTipX - nose.rightAlarTopX)));
        osc.connect(delay);
        delay.connect(output);
        $scope.oscillators.push(osc);

        osc = audioContext.createOscillator();
        osc.frequency.value = keyFilter(440 * Math.pow(a, Math.floor(nose.rightAlarOutTipY - nose.rightAlarTopY)));
        osc.connect(delay);
        delay.connect(output);
        $scope.oscillators.push(osc);

        osc = audioContext.createOscillator();
        osc.frequency.value = keyFilter(440 * Math.pow(a, Math.floor(nose.rightAlarOutTipX - nose.tipX)));
        osc.connect(delay);
        delay.connect(output);
        $scope.oscillators.push(osc);

        // Assign relative lengths to each note in the sequence
        for (var i = 0; i < $scope.oscillators.length; i++) {
            var duration = Math.ceil(nose.area % ((i + 1) * 2) % 5) % 2 + 1;
            $scope.oscillators[i].duration = duration;
            $scope.oscillators[i].next = $scope.oscillators[i + 1] || null;
        }
    });

    // Play a face
    $scope.play = function() {
        var notes = $scope.oscillators;
        playNote(notes[0]);
    };

    function playNote(note) {
        if (!note) return;
        note.start();
        $timeout(function() {
            note.stop();
            playNote(note.next)
        }, note.duration * 300)
    }
}


function keyFilter(freq) { // for now just normalize to key of A // TODO: change function to pass in a key
    switch (true) {
        case freq <= keyA['A4']:
            return keyA['A4']
        case freq <= keyA['B4']:
            return keyA['B4'];
        case freq <= keyA['Csh5']:
            return keyA['Csh5'];
        case freq <= keyA['D5']:
            return keyA['D5'];
        case freq <= keyA['E5']:
            return keyA['E5'];
        case freq <= keyA['Fsh5']:
            return keyA['Fsh5'];
        case freq <= keyA['Gsh5']:
            return keyA['Gsh5'];
        case freq <= keyA['A5']:
            return keyA['A5'];
        default:
            return 440;
    }
}



// A B C# D E F# G# A
var keyA = {
    A4: 440,
    B4: 493.88,
    Csh5: 554.37,
    D5: 587.33,
    E5: 659.25,
    Fsh5: 739.99,
    Gsh5: 830.61,
    A5: 880
};
