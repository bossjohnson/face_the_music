app.service('faceService', faceService);

function faceService() {
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
}
