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
                console.log(scope.face.faceRectangleTop);
                faceRect.css({
                    height: '1px',
                    border: '1px dotted black',
                    position: 'relative',
                    top: scope.face.faceRectangleTop + 'px'
                });
            }, 1000);
        }
    };
});
