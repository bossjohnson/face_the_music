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
                var faceRect = angular.element('<div></div>');
                element.prepend(faceRect);
                var face = scope.face;
                var scale = 300 / face.originalHeight;
                faceRect.css({
                    'z-index': 1,
                    border: '3px dotted red',
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
