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
                // var mouthBox = angular.element('<div></div>');
                // var noseBox = angular.element('<div></div>');
                //
                element.prepend(faceRect);
                faceRect.append(leftEye);
                faceRect.append(rightEye);
                // faceRect.after(mouthBox);
                // faceRect.after(noseBox);
                //
                faceRect.css({
                    'z-index': 1,
                    border: '3px dotted white',
                    position: 'absolute',
                    top: face.faceRectangleTop * scale + 'px',
                    left: face.faceRectangleLeft * scale + 'px',
                    width: face.faceRectangleWidth * scale + 'px',
                    height: face.faceRectangleHeight * scale + 'px'
                });
                //
                leftEye.css({
                    'z-index': 1,
                    position: 'absolute',
                    width: '100%',
                    height: '100%'
                        // top: face.eyeLeftTopY * scale + 'px',
                        // left: face.eyeLeftOuterX * scale + 'px',
                        // width: (face.eyeLeftInnerX - face.eyeLeftOuterX) * scale + 'px',
                        // height: (face.eyeLeftBottomY - face.eyeLeftTopY) * scale + 'px'
                });
                //
                // rightEye.css({
                //     'z-index': 1,
                //     border: '2px dotted green',
                //     position: 'absolute',
                //     'border-radius': '50%',
                //     // 'background-color': 'black',
                //     top: face.eyeRightTopY * scale + 'px',
                //     left: face.eyeRightInnerX * scale + 'px',
                //     width: (face.eyeRightOuterX - face.eyeRightInnerX) * scale + 'px',
                //     height: (face.eyeRightBottomY - face.eyeRightTopY) * scale + 'px'
                // });
                //
                // mouthBox.css({
                //     'z-index': 1,
                //     border: '3px dotted red',
                //     position: 'absolute',
                //     'border-radius': '25%',
                //     left: face.mouthLeftX * scale + 'px',
                //     width: (face.mouthRightX - face.mouthLeftX) * scale + 'px',
                //     top: face.upperLipTopY * scale + 'px',
                //     height: (face.underLipBottomY - face.upperLipTopY) * scale + 'px'
                // });
                //
                // noseBox.css({
                //     'z-index': 1,
                //     border: '3px dotted blue',
                //     position: 'absolute',
                //     'border-radius': '40%',
                //     top: face.noseRootLeftY * scale + 'px',
                //     height: (face.noseTipY - face.noseRootLeftY) * scale + 'px',
                //     left: face.noseLeftAlarOutTipX * scale + 'px',
                //     width: (face.noseRightAlarOutTipX - face.noseLeftAlarOutTipX) * scale + 'px'
                // });


            }, 1000);
        }
    };
});
