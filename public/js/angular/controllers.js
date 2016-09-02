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

        var faceAttrs = faceService.getFacialAttributes($scope.face);
        // console.log(faceAttrs);
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


        // 
        // var filter = new tuna.Filter({
        //     frequency: 440, //20 to 22050
        //     Q: .1, //0.001 to 100
        //     gain: 0, //-40 to 40
        //     filterType: 'bandpass', //lowpass, highpass, bandpass, lowshelf, highshelf, peaking, notch, allpass
        //     bypass: 0
        // });

        // Signal flow chain: node --> effects --> output
        var chain = [output];
        // chain.unshift(filter);

        chain.unshift(chorus);
        chain.unshift(delay);

        // Play a face
        $scope.play = function() {

            console.log(overdrive);
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
