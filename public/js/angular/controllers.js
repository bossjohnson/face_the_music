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

        var chain = [output];
        chain.unshift(delay);

        $scope.oscillators = [];
        var a = Math.pow(2, 1 / 12); // Constant used in calculating note frequency

        var osc = faceService.makeTone(leftEye.outerX, leftEye.innerX, chain);
        $scope.oscillators.push(osc);

        osc = faceService.makeTone(rightEye.innerX, rightEye.outerX, chain);
        $scope.oscillators.push(osc);

        osc = faceService.makeTone(leftEye.topY, leftEye.bottomY, chain);
        $scope.oscillators.push(osc);

        osc = faceService.makeTone(rightEye.topY, rightEye.bottomY, chain);
        $scope.oscillators.push(osc);

        osc = faceService.makeTone(nose.rootLeftX, nose.rootRightX, chain);
        $scope.oscillators.push(osc);

        osc = faceService.makeTone(nose.rootLeftY, nose.leftAlarTopY, chain);
        $scope.oscillators.push(osc);

        osc = faceService.makeTone(nose.rootRightY, nose.rightAlarTopY, chain);
        $scope.oscillators.push(osc);

        osc = faceService.makeTone(nose.rightAlarTopX, nose.rightAlarOutTipX, chain);
        $scope.oscillators.push(osc);

        osc = faceService.makeTone(nose.rightAlarTopY, nose.rightAlarOutTipY, chain);
        $scope.oscillators.push(osc);

        osc = faceService.makeTone(nose.tipX, nose.rightAlarOutTipX, chain);
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

var keyA = { // TODO: generate key frequencies dynamically
    octD_Root: 220,
    octD_M2: 246.94,
    octD_M3: 277.18,
    octD_P4: 293.66,
    octD_P5: 329.63,
    octD_M6: 369.99,
    octD_M7: 415.30,
    root: 440,
    M2: 493.88,
    M3: 554.37,
    P4: 587.33,
    P5: 659.25,
    M6: 739.99,
    M7: 830.61,
    octUp: 880
};

function keyFilter(freq) { // TODO: change function to pass in a key
    switch (true) {
        case freq <= keyA['octD_Root']:
            return keyA['octD_Root'];
        case freq <= keyA['octD_M2']:
            return keyA['octD_M2'];
        case freq <= keyA['octD_M3']:
            return keyA['octD_M3'];
        case freq <= keyA['octD_P4']:
            return keyA['octD_P4'];
        case freq <= keyA['octD_P5']:
            return keyA['octD_P5'];
        case freq <= keyA['octD_M6']:
            return keyA['octD_M6'];
        case freq <= keyA['octD_M7']:
            return keyA['octD_M7'];
        case freq <= keyA['root']:
            return keyA['root'];
        case freq <= keyA['M2']:
            return keyA['M2'];
        case freq <= keyA['M3']:
            return keyA['M3'];
        case freq <= keyA['P4']:
            return keyA['P4'];
        case freq <= keyA['P5']:
            return keyA['P5'];
        case freq <= keyA['M6']:
            return keyA['M6'];
        case freq <= keyA['M7']:
            return keyA['M7'];
        case freq <= keyA['octUp']:
            return keyA['octUp'];
        default:
            return keyA['root'];
    }
}
