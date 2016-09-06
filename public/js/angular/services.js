app.service('faceService', faceService);
app.service('dataService', dataService);
dataService.$inject = ['$http']

function faceService($rootScope) {
    this.getFacialAttributes = function(face) {
        return {
            age: face.age,
            beard: face.beard,
            moustache: face.moustache,
            sideburns: face.sideburns,
            smile: face.smile,
            gender: face.gender,
            glasses: face.glasses
        }
    };

    this.analyzeFace = function(face) {
        var faceWidth = face.faceRectangleWidth;
        var faceHeight = face.faceRectangleHeight;
        var faceLeft = face.faceRectangleLeft;
        var faceTop = face.faceRectangleTop;
        return {
            leftEye: {
                outerX: (face.eyeLeftOuterX - faceLeft) / faceWidth * 100,
                outerY: (face.eyeLeftOuterY - faceTop) / faceHeight * 100,
                topX: (face.eyeLeftTopX - faceLeft) / faceWidth * 100,
                topY: (face.eyeLeftTopY - faceTop) / faceHeight * 100,
                innerX: (face.eyeLeftInnerX - faceLeft) / faceWidth * 100,
                innerY: (face.eyeLeftInnerY - faceTop) / faceHeight * 100,
                bottomX: (face.eyeLeftBottomX - faceLeft) / faceWidth * 100,
                bottomY: (face.eyeLeftBottomY - faceTop) / faceHeight * 100
            },
            rightEye: {
                outerX: (face.eyeRightOuterX - faceLeft) / faceWidth * 100,
                outerY: (face.eyeRightOuterY - faceTop) / faceHeight * 100,
                topX: (face.eyeRightTopX - faceLeft) / faceWidth * 100,
                topY: (face.eyeRightTopY - faceTop) / faceHeight * 100,
                innerX: (face.eyeRightInnerX - faceLeft) / faceWidth * 100,
                innerY: (face.eyeRightInnerY - faceTop) / faceHeight * 100,
                bottomX: (face.eyeRightBottomX - faceLeft) / faceWidth * 100,
                bottomY: (face.eyeRightBottomY - faceTop) / faceHeight * 100
            },
            mouth: {
                leftX: (face.mouthLeftX - faceLeft) / faceWidth * 100,
                leftY: (face.mouthLeftY - faceTop) / faceHeight * 100,
                rightX: (face.mouthRightX - faceLeft) / faceWidth * 100,
                rightY: (face.mouthRightY - faceTop) / faceHeight * 100,
                upperLipTopX: (face.upperLipTopX - faceLeft) / faceWidth * 100,
                upperLipTopY: (face.upperLipTopY - faceTop) / faceHeight * 100,
                upperLipBottomX: (face.upperLipBottomX - faceLeft) / faceWidth * 100,
                upperLipBottomY: (face.upperLipBottomY - faceTop) / faceHeight * 100,
                underLipTopX: (face.underLipTopX - faceLeft) / faceWidth * 100,
                underLipTopY: (face.underLipTopY - faceTop) / faceHeight * 100,
                underLipBottomX: (face.underLipBottomX - faceLeft) / faceWidth * 100,
                underLipBottomY: (face.underLipBottomY - faceTop) / faceHeight * 100
            },
            nose: {
                rootLeftX: (face.noseRootLeftX - faceLeft) / faceWidth * 100,
                rootLeftY: (face.noseRootLeftY - faceTop) / faceHeight * 100,
                rootRightX: (face.noseRootRightX - faceLeft) / faceWidth * 100,
                rootRightY: (face.noseRootRightY - faceTop) / faceHeight * 100,
                leftAlarTopX: (face.noseLeftAlarTopX - faceLeft) / faceWidth * 100,
                leftAlarTopY: (face.noseLeftAlarTopY - faceTop) / faceHeight * 100,
                rightAlarTopX: (face.noseRightAlarTopX - faceLeft) / faceWidth * 100,
                rightAlarTopY: (face.noseRightAlarTopY - faceTop) / faceHeight * 100,
                leftAlarOutTipX: (face.noseLeftAlarOutTipX - faceLeft) / faceWidth * 100,
                leftAlarOutTipY: (face.noseLeftAlarOutTipY - faceTop) / faceHeight * 100,
                rightAlarOutTipX: (face.noseRightAlarOutTipX - faceLeft) / faceWidth * 100,
                rightAlarOutTipY: (face.noseRightAlarOutTipY - faceTop) / faceHeight * 100,
                tipX: (face.noseTipX - faceLeft) / faceWidth * 100,
                tipY: (face.noseTipY - faceTop) / faceHeight * 100
            }
        };
    };

    this.getNoseArea = function(nose) {
        var noseXArray = [
            nose.rootLeftX,
            nose.rootRightX,
            nose.rightAlarTopX,
            nose.rightAlarOutTipX,
            nose.tipX,
            nose.leftAlarOutTipX,
            nose.leftAlarTopX
        ];
        var noseYArray = [
            nose.rootLeftY,
            nose.rootRightY,
            nose.rightAlarTopY,
            nose.rightAlarOutTipY,
            nose.tipY,
            nose.leftAlarOutTipY,
            nose.leftAlarTopY
        ];;
        return Math.abs(polygonArea(noseXArray, noseYArray, 7));
    };

    this.makeTone = function(data, chain) {
        var a = Math.pow(2, 1 / 12); // Constant used in calculating note frequency

        var osc = $rootScope.audioContext.createOscillator();
        var gain = $rootScope.audioContext.createGain();
        gain.gain.value = 0;
        osc.connect(gain);
        osc.gainNode = gain;
        osc.frequency.value = keyFilter(440 * Math.pow(a, Math.floor(data)));

        connect(gain, chain.slice());
        osc.start();
        return osc;
    }
}

faceService.$inject = ['$rootScope'];

function dataService($http) {
    this.getFaces = function() {
        return $http.get('/faces/all');
    }
}

function connect(node, chain) {
    if (!chain.length) return;
    var nextNode = chain.shift();
    node.connect(nextNode);
    connect(nextNode, chain);
}

function polygonArea(X, Y, numPoints) {
    var area = 0; // Accumulates area in the loop
    var j = numPoints - 1; // The last vertex is the 'previous' one to the first

    for (var i = 0; i < numPoints; i++) {
        area = area + (X[j] + X[i]) * (Y[j] - Y[i]);
        j = i; //j is previous vertex to i
    }
    return area / 2;
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
