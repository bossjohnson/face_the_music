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

                element.prepend(faceRect);
                faceRect.after(leftEye);
                faceRect.after(rightEye);

                faceRect.css({
                    'z-index': 1,
                    border: '3px dotted red',
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
                    top: face.eyeRightTopY * scale + 'px',
                    left: face.eyeRightInnerX * scale + 'px',
                    width: (face.eyeRightOuterX - face.eyeRightInnerX) * scale + 'px',
                    height: (face.eyeRightBottomY - face.eyeRightTopY) * scale + 'px'
                });
            }, 1000);
        }
    };
});
