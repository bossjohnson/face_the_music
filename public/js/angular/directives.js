app.directive('musicalFace', function() {
    return {
        templateUrl: '../partials/face.html',
        restrict: 'A',
        scope: {
            faceId: '=',
            faceType: '@'
        },
        controller: faceCtrl,
        link: faceLink
    };
});

app.directive('playSequence', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.on('click', function() {
                var facesInSequence = document.querySelector('.sequencerRow').querySelectorAll('li');
                angular.element(facesInSequence[0]).triggerHandler('click');
                for (let i = 1; i < facesInSequence.length; i++) {
                    angular.element(facesInSequence[i]).triggerHandler('reset');
                    $timeout(function() {
                        angular.element(facesInSequence[i]).triggerHandler('click');
                    }, 300 * 8 * i);
                }

                var scrubBar = angular.element('<div/>');
                scrubBar.addClass('scrubBar');
                scrubBar.css({
                    transition: ((300 * 8) / 1000) * facesInSequence.length + 's linear'
                });

                $timeout(function() {
                    scrubBar.css({
                        left: 10 * facesInSequence.length + 'vw'
                    });
                }, 10);

                $timeout(function() {
                    scrubBar.remove();
                }, 300 * 8 * facesInSequence.length);

                angular.element(document.querySelector('.sequencerRow')).prepend(scrubBar);
            });

        }
    };
}).$inject = ['$timeout'];

app.directive('stopSequence', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.on('click', function() {
                var scrubBar = document.querySelector('.scrubBar');
                angular.element(scrubBar).remove();
                var facesInSequence = document.querySelector('.sequencerRow').querySelectorAll('li');
                for (var i = 0; i < facesInSequence.length; i++) {
                    angular.element(facesInSequence[i]).triggerHandler('pause');
                }
            });
        }
    };
});


function faceLink(scope, element, attrs) {
    element.on('click', function() {
        if (scope.canPlay) {
            scope.play();
        }
    });
    element.on('pause', function() {
        scope.canPlay = false;
        scope.stop();
    });
    element.on('reset', function() {
        scope.canPlay = true;
    });
    // console.log(scope);
    // setTimeout(function() {
    //
    //     var face = scope.face;
    //     var scale = scope.faceType === 'showAll' ? 300 / face.originalHeight : 100 / face.originalHeight;
    //
    //     // Face Rectangle
    //     var faceRect = angular.element('<div></div>');
    //     var faceHeight = face.faceRectangleHeight;
    //     var faceWidth = face.faceRectangleWidth;
    //
    //     // Left Eye
    //     var leftEye = scope.leftEye;
    //     var leftEyeSVG = angular.element(
    //         `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    //             <polygon points="
    //                 ${leftEye.outerX},${leftEye.outerY}
    //                 ${leftEye.topX},${leftEye.topY}
    //                 ${leftEye.innerX},${leftEye.innerY}
    //                 ${leftEye.bottomX},${leftEye.bottomY}"
    //                 stroke="blue" stroke-width="1" fill="none" stroke-linejoin="round">
    //         </svg>`
    //     );
    //
    //     // Right Eye
    //     var rightEye = scope.rightEye;
    //     var rightEyeSVG = angular.element(
    //         `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    //             <polygon points="
    //                 ${rightEye.outerX},${rightEye.outerY}
    //                 ${rightEye.topX},${rightEye.topY}
    //                 ${rightEye.innerX},${rightEye.innerY}
    //                 ${rightEye.bottomX},${rightEye.bottomY}"
    //                 stroke="blue" stroke-width="1" fill="none" stroke-linejoin="round">
    //         </svg>`
    //     );
    //
    //     // Mouth
    //     var mouth = scope.mouth;
    //     var mouthSVG = angular.element(
    //         `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    //             <polygon points="
    //                 ${mouth.leftX},${mouth.leftY}
    //                 ${mouth.upperLipTopX},${mouth.upperLipTopY}
    //                 ${mouth.rightX},${mouth.rightY}
    //                 ${mouth.upperLipBottomX},${mouth.upperLipBottomY}
    //                 ${mouth.leftX},${mouth.leftY}
    //                 ${mouth.underLipBottomX},${mouth.underLipBottomY}
    //                 ${mouth.rightX},${mouth.rightY}
    //                 ${mouth.underLipTopX},${mouth.underLipTopY}"
    //                 stroke="red" stroke-width="1" fill="none" stroke-linejoin="round">
    //         </svg>`
    //     );
    //
    //     // Nose
    //     var nose = scope.nose;
    //     var noseSVG = angular.element(
    //         `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    //             <polygon points="
    //                 ${nose.rootLeftX},${nose.rootLeftY}
    //                 ${nose.leftAlarTopX},${nose.leftAlarTopY}
    //                 ${nose.leftAlarOutTipX},${nose.leftAlarOutTipY}
    //                 ${nose.tipX},${nose.tipY}
    //                 ${nose.rightAlarOutTipX},${nose.rightAlarOutTipY}
    //                 ${nose.rightAlarTopX},${nose.rightAlarTopY}
    //                 ${nose.rootRightX},${nose.rootRightY}
    //             "
    //             stroke="green" stroke-width="1" fill="none" stroke-linejoin="round">
    //         </svg>
    //       `
    //     );
    //
    //     element.prepend(faceRect);
    //     faceRect.append(leftEyeSVG);
    //     faceRect.append(rightEyeSVG);
    //     faceRect.append(mouthSVG);
    //     faceRect.append(noseSVG);
    //
    //     faceRect.css({
    //         'z-index': 1,
    //         border: '2px dotted black',
    //         position: 'absolute',
    //         top: face.faceRectangleTop * scale + 'px',
    //         left: face.faceRectangleLeft * scale + 'px',
    //         width: faceWidth * scale + 'px',
    //         height: faceHeight * scale + 'px'
    //     });
    // }, 1000);
}
