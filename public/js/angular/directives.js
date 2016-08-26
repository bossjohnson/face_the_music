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

                var faceRect = angular.element('<div></div>');
                var leftEye = angular.element('<div></div>');
                var rightEye = angular.element('<div></div>');
                var mouthBox = angular.element('<div></div>');
                var noseBox = angular.element('<div></div>');

                element.prepend(faceRect);
                faceRect.after(leftEye);
                faceRect.after(rightEye);
                faceRect.after(mouthBox);
                faceRect.after(noseBox);

                faceRect.css({
                    'z-index': 1,
                    border: '3px dotted white',
                    position: 'absolute',
                    top: face.faceRectangleTop * scale + 'px',
                    left: face.faceRectangleLeft * scale + 'px',
                    width: face.faceRectangleWidth * scale + 'px',
                    height: face.faceRectangleHeight * scale + 'px'
                });

                leftEye.css({
                    'z-index': 1,
                    border: '2px dotted green',
                    'border-radius': '50%',
                    position: 'absolute',
                    // 'background-color': 'black',
                    top: face.eyeLeftTopY * scale + 'px',
                    left: face.eyeLeftOuterX * scale + 'px',
                    width: (face.eyeLeftInnerX - face.eyeLeftOuterX) * scale + 'px',
                    height: (face.eyeLeftBottomY - face.eyeLeftTopY) * scale + 'px'
                });

                rightEye.css({
                    'z-index': 1,
                    border: '2px dotted green',
                    position: 'absolute',
                    'border-radius': '50%',
                    // 'background-color': 'black',
                    top: face.eyeRightTopY * scale + 'px',
                    left: face.eyeRightInnerX * scale + 'px',
                    width: (face.eyeRightOuterX - face.eyeRightInnerX) * scale + 'px',
                    height: (face.eyeRightBottomY - face.eyeRightTopY) * scale + 'px'
                });

                mouthBox.css({
                    'z-index': 1,
                    border: '3px dotted red',
                    position: 'absolute',
                    'border-radius': '25%',
                    left: face.mouthLeftX * scale + 'px',
                    width: (face.mouthRightX - face.mouthLeftX) * scale + 'px',
                    top: face.upperLipTopY * scale + 'px',
                    height: (face.underLipBottomY - face.upperLipTopY) * scale + 'px'
                });

                noseBox.css({
                    'z-index': 1,
                    border: '3px dotted blue',
                    position: 'absolute',
                    'border-radius': '40%',
                    top: face.noseRootLeftY * scale + 'px',
                    height: (face.noseTipY - face.noseRootLeftY) * scale + 'px',
                    left: face.noseLeftAlarOutTipX * scale + 'px',
                    width: (face.noseRightAlarOutTipX - face.noseLeftAlarOutTipX) * scale + 'px'
                })


            }, 1000);
        }
    };
});
