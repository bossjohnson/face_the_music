app.directive('musicalFace', function() {
    return {
        templateUrl: '../partials/face.html',
        restrict: 'A',
        scope: {
            faceId: '='
        },
        controller: faceCtrl,
        link: function(scope, element, attrs) {
            setTimeout(function() {
                var clientRect = element[0].getBoundingClientRect();

                var face = scope.face;
                var scale = 300 / face.originalHeight;

                // Face Rectangle
                var faceRect = angular.element('<div></div>');

                // Left Eye
                var svgEyeLeftOuterX = (face.eyeLeftOuterX - face.faceRectangleLeft) / face.faceRectangleWidth * 100;
                var svgEyeLeftOuterY = (face.eyeLeftOuterY - face.faceRectangleTop) / face.faceRectangleHeight * 100;

                var svgEyeLeftTopX = (face.eyeLeftTopX - face.faceRectangleLeft) / face.faceRectangleWidth * 100;
                var svgEyeLeftTopY = (face.eyeLeftTopY - face.faceRectangleTop) / face.faceRectangleHeight * 100;

                var svgEyeLeftInnerX = (face.eyeLeftInnerX - face.faceRectangleLeft) / face.faceRectangleWidth * 100;
                var svgEyeLeftInnerY = (face.eyeLeftInnerY - face.faceRectangleTop) / face.faceRectangleHeight * 100;

                var svgEyeLeftBottomX = (face.eyeLeftBottomX - face.faceRectangleLeft) / face.faceRectangleWidth * 100;
                var svgEyeLeftBottomY = (face.eyeLeftBottomY - face.faceRectangleTop) / face.faceRectangleHeight * 100;

                var leftEye = angular.element(
                    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                        <polygon points="
                            ${svgEyeLeftOuterX},${svgEyeLeftOuterY}
                            ${svgEyeLeftTopX},${svgEyeLeftTopY}
                            ${svgEyeLeftInnerX},${svgEyeLeftInnerY}
                            ${svgEyeLeftBottomX},${svgEyeLeftBottomY}"
                            stroke="blue" stroke-width="1" fill="none" stroke-linejoin="round">
                    </svg>`
                );

                // Right Eye
                var svgEyeRightOuterX = (face.eyeRightOuterX - face.faceRectangleLeft) / face.faceRectangleWidth * 100;
                var svgEyeRightOuterY = (face.eyeRightOuterY - face.faceRectangleTop) / face.faceRectangleHeight * 100;

                var svgEyeRightTopX = (face.eyeRightTopX - face.faceRectangleLeft) / face.faceRectangleWidth * 100;
                var svgEyeRightTopY = (face.eyeRightTopY - face.faceRectangleTop) / face.faceRectangleHeight * 100;

                var svgEyeRightInnerX = (face.eyeRightInnerX - face.faceRectangleLeft) / face.faceRectangleWidth * 100;
                var svgEyeRightInnerY = (face.eyeRightInnerY - face.faceRectangleTop) / face.faceRectangleHeight * 100;

                var svgEyeRightBottomX = (face.eyeRightBottomX - face.faceRectangleLeft) / face.faceRectangleWidth * 100;
                var svgEyeRightBottomY = (face.eyeRightBottomY - face.faceRectangleTop) / face.faceRectangleHeight * 100;

                var rightEye = angular.element(
                    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                        <polygon points="
                            ${svgEyeRightOuterX},${svgEyeRightOuterY}
                            ${svgEyeRightTopX},${svgEyeRightTopY}
                            ${svgEyeRightInnerX},${svgEyeRightInnerY}
                            ${svgEyeRightBottomX},${svgEyeRightBottomY}"
                            stroke="blue" stroke-width="1" fill="none" stroke-linejoin="round">
                    </svg>`
                );

                // Mouth
                var svgMouthLeftX = (face.mouthLeftX - face.faceRectangleLeft) / face.faceRectangleWidth * 100;
                var svgMouthLeftY = (face.mouthLeftY - face.faceRectangleTop) / face.faceRectangleHeight * 100;

                var svgMouthRightX = (face.mouthRightX - face.faceRectangleLeft) / face.faceRectangleWidth * 100;
                var svgMouthRightY = (face.mouthRightY - face.faceRectangleTop) / face.faceRectangleHeight * 100;

                var svgUpperLipTopX = (face.upperLipTopX - face.faceRectangleLeft) / face.faceRectangleWidth * 100;
                var svgUpperLipTopY = (face.upperLipTopY - face.faceRectangleTop) / face.faceRectangleHeight * 100;

                var svgUpperLipBottomX = (face.upperLipBottomX - face.faceRectangleLeft) / face.faceRectangleWidth * 100;
                var svgUpperLipBottomY = (face.upperLipBottomY - face.faceRectangleTop) / face.faceRectangleHeight * 100;

                var svgUnderLipTopX = (face.underLipTopX - face.faceRectangleLeft) / face.faceRectangleWidth * 100;
                var svgUnderLipTopY = (face.underLipTopY - face.faceRectangleTop) / face.faceRectangleHeight * 100;

                var svgUnderLipBottomX = (face.underLipBottomX - face.faceRectangleLeft) / face.faceRectangleWidth * 100;
                var svgUnderLipBottomY = (face.underLipBottomY - face.faceRectangleTop) / face.faceRectangleHeight * 100;

                var mouth = angular.element(
                    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                        <polygon points="
                            ${svgMouthLeftX},${svgMouthLeftY}
                            ${svgUpperLipTopX},${svgUpperLipTopY}
                            ${svgMouthRightX},${svgMouthRightY}
                            ${svgUpperLipBottomX},${svgUpperLipBottomY}
                            ${svgMouthLeftX},${svgMouthLeftY}
                            ${svgUnderLipBottomX},${svgUnderLipBottomY}
                            ${svgMouthRightX},${svgMouthRightY}
                            ${svgUnderLipTopX},${svgUnderLipTopY}"
                            stroke="red" stroke-width="1" fill="none" stroke-linejoin="round">
                    </svg>`
                );

                // Nose
                var svgNoseRootLeftX = (face.noseRootLeftX - face.faceRectangleLeft) / face.faceRectangleWidth * 100;
                var svgNoseRootLeftY = (face.noseRootLeftY - face.faceRectangleTop) / face.faceRectangleHeight * 100;

                var svgNoseRootRightX = (face.noseRootRightX - face.faceRectangleLeft) / face.faceRectangleWidth * 100;
                var svgNoseRootRightY = (face.noseRootRightY - face.faceRectangleTop) / face.faceRectangleHeight * 100;

                var svgNoseLeftAlarTopX = (face.noseLeftAlarTopX - face.faceRectangleLeft) / face.faceRectangleWidth * 100;
                var svgNoseLeftAlarTopY = (face.noseLeftAlarTopY - face.faceRectangleTop) / face.faceRectangleHeight * 100;

                var svgNoseRightAlarTopX = (face.noseRightAlarTopX - face.faceRectangleLeft) / face.faceRectangleWidth * 100;
                var svgNoseRightAlarTopY = (face.noseRightAlarTopY - face.faceRectangleTop) / face.faceRectangleHeight * 100;

                var svgNoseLeftAlarOutTipX = (face.noseLeftAlarOutTipX - face.faceRectangleLeft) / face.faceRectangleWidth * 100;
                var svgNoseLeftAlarOutTipY = (face.noseLeftAlarOutTipY - face.faceRectangleTop) / face.faceRectangleHeight * 100;

                var svgNoseRightAlarOutTipX = (face.noseRightAlarOutTipX - face.faceRectangleLeft) / face.faceRectangleWidth * 100;
                var svgNoseRightAlarOutTipY = (face.noseRightAlarOutTipY - face.faceRectangleTop) / face.faceRectangleHeight * 100;

                var svgNoseTipX = (face.noseTipX - face.faceRectangleLeft) / face.faceRectangleWidth * 100;
                var svgNoseTipY = (face.noseTipY - face.faceRectangleTop) / face.faceRectangleHeight * 100;


                var nose = angular.element(
                    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                        <polygon points="
                            ${svgNoseRootLeftX},${svgNoseRootLeftY}
                            ${svgNoseLeftAlarTopX},${svgNoseLeftAlarTopY}
                            ${svgNoseLeftAlarOutTipX},${svgNoseLeftAlarOutTipY}
                            ${svgNoseTipX},${svgNoseTipY}
                            ${svgNoseRightAlarOutTipX},${svgNoseRightAlarOutTipY}
                            ${svgNoseRightAlarTopX},${svgNoseRightAlarTopY}
                            ${svgNoseRootRightX},${svgNoseRootRightY}
                        "
                        stroke="green" stroke-width="1" fill="none" stroke-linejoin="round">
                    </svg>
                  `
                );

                element.prepend(faceRect);
                faceRect.append(leftEye);
                faceRect.append(rightEye);
                faceRect.append(mouth);
                faceRect.append(nose);

                faceRect.css({
                    'z-index': 1,
                    border: '3px dotted black',
                    'border-radius': '25%',
                    position: 'absolute',
                    top: face.faceRectangleTop * scale + 'px',
                    left: face.faceRectangleLeft * scale + 'px',
                    width: face.faceRectangleWidth * scale + 'px',
                    height: face.faceRectangleHeight * scale + 'px'
                });
            }, 1000);
        }
    };
});
