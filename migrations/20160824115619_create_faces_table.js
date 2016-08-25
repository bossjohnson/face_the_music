exports.up = function(knex, Promise) {
    return knex.schema.createTable('faces', function(table) {
        table.increments();
        table.string('url');
        // Face Attributes
        table.decimal('smile');
        table.string('gender');
        table.decimal('age');
        table.decimal('moustache');
        table.decimal('beard');
        table.decimal('sideburns');
        table.string('glasses');
        // Face Landmarks
        table.decimal('pupilLeftX');
        table.decimal('pupilLeftY');
        table.decimal('pupilRightX');
        table.decimal('pupilRightY');
        table.decimal('noseTipX');
        table.decimal('noseTipY');
        table.decimal('mouthLeftX');
        table.decimal('mouthLeftY');
        table.decimal('mouthRightX');
        table.decimal('mouthRightY');
        table.decimal('eyebrowLeftOuterX');
        table.decimal('eyebrowLeftOuterY');
        table.decimal('eyebrowLeftInnerX');
        table.decimal('eyebrowLeftInnerY');
        table.decimal('eyeLeftOuterX');
        table.decimal('eyeLeftOuterY');
        table.decimal('eyeLeftTopX');
        table.decimal('eyeLeftTopY');
        table.decimal('eyeLeftBottomX');
        table.decimal('eyeLeftBottomY');
        table.decimal('eyeLeftInnerX');
        table.decimal('eyeLeftInnerY');
        table.decimal('eyebrowRightOuterX');
        table.decimal('eyebrowRightOuterY');
        table.decimal('eyebrowRightInnerX');
        table.decimal('eyebrowRightInnerY');
        table.decimal('eyeRightOuterX');
        table.decimal('eyeRightOuterY');
        table.decimal('eyeRightTopX');
        table.decimal('eyeRightTopY');
        table.decimal('eyeRightBottomX');
        table.decimal('eyeRightBottomY');
        table.decimal('eyeRightInnerX');
        table.decimal('eyeRightInnerY');
        table.decimal('noseRootLeftX');
        table.decimal('noseRootLeftY');
        table.decimal('noseRootRightX');
        table.decimal('noseRootRightY');
        table.decimal('noseLeftAlarTopX');
        table.decimal('noseLeftAlarTopY');
        table.decimal('noseRightAlarTopX');
        table.decimal('noseRightAlarTopY');
        table.decimal('noseLeftAlarOutTipX');
        table.decimal('noseLeftAlarOutTipY');
        table.decimal('noseRightAlarOutTipX');
        table.decimal('noseRightAlarOutTipY');
        table.decimal('upperLipTopX');
        table.decimal('upperLipTopY');
        table.decimal('upperLipBottomX');
        table.decimal('upperLipBottomY');
        table.decimal('underLipTopX');
        table.decimal('underLipTopY');
        table.decimal('underLipBottomX');
        table.decimal('underLipBottomY');
        // Face Rectangle
        table.decimal('faceRectangleTop');
        table.decimal('faceRectangleLeft');
        table.decimal('faceRectangleWidth');
        table.decimal('faceRectangleHeight');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('faces');
};
