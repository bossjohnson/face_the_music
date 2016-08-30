app.directive('musicalFace', function() {
    return {
        templateUrl: '../partials/face.html',
        restrict: 'A',
        scope: {
            faceId: '='
        },
        controller: faceCtrl,
        link: drawFaces
    };
});

function drawFaces(scope, element, attrs) {
    setTimeout(function() {

        var face = scope.face;
        var scale = 300 / face.originalHeight;

        // Face Rectangle
        var faceRect = angular.element('<div></div>');
        var faceH = face.faceRectangleHeight;
        var faceW = face.faceRectangleWidth;

        // Left Eye
        var leftEye = scope.leftEye;
        var leftEyeSVG = angular.element(
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                <polygon points="
                    ${leftEye.outerX},${leftEye.outerY}
                    ${leftEye.topX},${leftEye.topY}
                    ${leftEye.innerX},${leftEye.innerY}
                    ${leftEye.bottomX},${leftEye.bottomY}"
                    stroke="blue" stroke-width="1" fill="none" stroke-linejoin="round">
            </svg>`
        );

        // Right Eye
        var rightEye = scope.rightEye;
        var rightEyeSVG = angular.element(
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                <polygon points="
                    ${rightEye.outerX},${rightEye.outerY}
                    ${rightEye.topX},${rightEye.topY}
                    ${rightEye.innerX},${rightEye.innerY}
                    ${rightEye.bottomX},${rightEye.bottomY}"
                    stroke="blue" stroke-width="1" fill="none" stroke-linejoin="round">
            </svg>`
        );

        // Mouth
        var mouth = scope.mouth;
        var mouthSVG = angular.element(
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                <polygon points="
                    ${mouth.leftX},${mouth.leftY}
                    ${mouth.upperLipTopX},${mouth.upperLipTopY}
                    ${mouth.rightX},${mouth.rightY}
                    ${mouth.upperLipBottomX},${mouth.upperLipBottomY}
                    ${mouth.leftX},${mouth.leftY}
                    ${mouth.underLipBottomX},${mouth.underLipBottomY}
                    ${mouth.rightX},${mouth.rightY}
                    ${mouth.underLipTopX},${mouth.underLipTopY}"
                    stroke="red" stroke-width="1" fill="none" stroke-linejoin="round">
            </svg>`
        );

        // Nose
        var nose = scope.nose;
        var noseSVG = angular.element(
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                <polygon points="
                    ${nose.rootLeftX},${nose.rootLeftY}
                    ${nose.leftAlarTopX},${nose.leftAlarTopY}
                    ${nose.leftAlarOutTipX},${nose.leftAlarOutTipY}
                    ${nose.tipX},${nose.tipY}
                    ${nose.rightAlarOutTipX},${nose.rightAlarOutTipY}
                    ${nose.rightAlarTopX},${nose.rightAlarTopY}
                    ${nose.rootRightX},${nose.rootRightY}
                "
                stroke="green" stroke-width="1" fill="none" stroke-linejoin="round">
            </svg>
          `
        );

        element.prepend(faceRect);
        faceRect.append(leftEyeSVG);
        faceRect.append(rightEyeSVG);
        faceRect.append(mouthSVG);
        faceRect.append(noseSVG);

        faceRect.css({
            'z-index': 1,
            border: '2px dotted black',
            'border-radius': '50%',
            position: 'absolute',
            top: face.faceRectangleTop * scale + 'px',
            left: face.faceRectangleLeft * scale + 'px',
            width: faceW * scale + 'px',
            height: faceH * scale + 'px'
        });
    }, 1000);
}
