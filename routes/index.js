var express = require('express');
var router = express.Router();
var https = require('https');
var cloudinary = require('cloudinary');
var multer = require('multer');
var upload = multer({
    dest: 'uploads/'
});
require('dotenv').config();
var knexConfig = require('../knexfile')[process.env.NODE_ENV];
var knex = require('knex')(knexConfig);
var fs = require('fs');

// Pull in environment variables
require('dotenv').config(); // NOTE: delete or comment out for Heroku deploy

// Configure cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

// Route for uploading images to cloudinary
router.post('/upload', upload.single('file'), function(req, res, next) {
    // upload photo to cloudinary
    var imageFile = req.file;
    cloudinary.uploader.upload(imageFile.path, function(result) {
        fs.unlink(imageFile.path, (err) => {
            if (err) console.error(err);
        });

        // hit face api with data from cloudinary upload
        var hostName = 'api.projectoxford.ai';
        var queryParams = '?returnFaceId=false&returnFaceLandmarks=true&returnFaceAttributes=age,gender,facialHair,glasses,smile';
        var faceUrl = result.url;

        var options = {
            hostname: hostName,
            path: '/face/v1.0/detect' + queryParams,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': process.env.FACE_API_KEY
            }
        };

        var request = https.request(options, function(response) {
            var finished = '';
            response.on('data', function(data) {
                finished += data.toString();
            });
            response.on('end', function() {
                var faceData = JSON.parse(finished)[0];
                res.send({
                    faceUrl: faceUrl,
                    faceData: faceData
                });

                if (!faceData) {
                    console.log('NO FACE DETECTED');
                    return;
                }
                knex('faces')
                    .insert({
                        url: faceUrl,
                        smile: faceData.faceAttributes.smile,
                        gender: faceData.faceAttributes.gender,
                        age: faceData.faceAttributes.age,
                        moustache: faceData.faceAttributes.facialHair.moustache,
                        beard: faceData.faceAttributes.facialHair.beard,
                        sideburns: faceData.faceAttributes.facialHair.sideburns,
                        glasses: faceData.faceAttributes.glasses,
                        pupilLeftX: faceData.faceLandmarks.pupilLeft.x,
                        pupilLeftY: faceData.faceLandmarks.pupilLeft.y,
                        pupilRightX: faceData.faceLandmarks.pupilRight.x,
                        pupilRightY: faceData.faceLandmarks.pupilRight.y,
                        noseTipX: faceData.faceLandmarks.noseTip.x,
                        noseTipY: faceData.faceLandmarks.noseTip.y,
                        mouthLeftX: faceData.faceLandmarks.mouthLeft.x,
                        mouthLeftY: faceData.faceLandmarks.mouthLeft.y,
                        mouthRightX: faceData.faceLandmarks.mouthRight.x,
                        mouthRightY: faceData.faceLandmarks.mouthRight.y,
                        eyebrowLeftOuterX: faceData.faceLandmarks.eyebrowLeftOuter.x,
                        eyebrowLeftOuterY: faceData.faceLandmarks.eyebrowLeftOuter.y,
                        eyebrowLeftInnerX: faceData.faceLandmarks.eyebrowLeftInner.x,
                        eyebrowLeftInnerY: faceData.faceLandmarks.eyebrowLeftInner.y,
                        eyeLeftOuterX: faceData.faceLandmarks.eyeLeftOuter.x,
                        eyeLeftOuterY: faceData.faceLandmarks.eyeLeftOuter.y,
                        eyeLeftTopX: faceData.faceLandmarks.eyeLeftTop.x,
                        eyeLeftTopY: faceData.faceLandmarks.eyeLeftTop.y,
                        eyeLeftBottomX: faceData.faceLandmarks.eyeLeftBottom.x,
                        eyeLeftBottomY: faceData.faceLandmarks.eyeLeftBottom.y,
                        eyeLeftInnerX: faceData.faceLandmarks.eyeLeftInner.x,
                        eyeLeftInnerY: faceData.faceLandmarks.eyeLeftInner.y,
                        eyebrowRightOuterX: faceData.faceLandmarks.eyebrowRightOuter.x,
                        eyebrowRightOuterY: faceData.faceLandmarks.eyebrowRightOuter.y,
                        eyebrowRightInnerX: faceData.faceLandmarks.eyebrowRightInner.x,
                        eyebrowRightInnerY: faceData.faceLandmarks.eyebrowRightInner.y,
                        eyeRightOuterX: faceData.faceLandmarks.eyeRightOuter.x,
                        eyeRightOuterY: faceData.faceLandmarks.eyeRightOuter.y,
                        eyeRightTopX: faceData.faceLandmarks.eyeRightTop.x,
                        eyeRightTopY: faceData.faceLandmarks.eyeRightTop.y,
                        eyeRightBottomX: faceData.faceLandmarks.eyeRightBottom.x,
                        eyeRightBottomY: faceData.faceLandmarks.eyeRightBottom.y,
                        eyeRightInnerX: faceData.faceLandmarks.eyeRightInner.x,
                        eyeRightInnerY: faceData.faceLandmarks.eyeRightInner.y,
                        noseRootLeftX: faceData.faceLandmarks.noseRootLeft.x,
                        noseRootLeftY: faceData.faceLandmarks.noseRootLeft.y,
                        noseRootRightX: faceData.faceLandmarks.noseRootRight.x,
                        noseRootRightY: faceData.faceLandmarks.noseRootRight.y,
                        noseLeftAlarTopX: faceData.faceLandmarks.noseLeftAlarTop.x,
                        noseLeftAlarTopY: faceData.faceLandmarks.noseLeftAlarTop.y,
                        noseRightAlarTopX: faceData.faceLandmarks.noseRightAlarTop.x,
                        noseRightAlarTopY: faceData.faceLandmarks.noseRightAlarTop.y,
                        noseLeftAlarOutTipX: faceData.faceLandmarks.noseLeftAlarOutTip.x,
                        noseLeftAlarOutTipY: faceData.faceLandmarks.noseLeftAlarOutTip.y,
                        noseRightAlarOutTipX: faceData.faceLandmarks.noseRightAlarOutTip.x,
                        noseRightAlarOutTipY: faceData.faceLandmarks.noseRightAlarOutTip.y,
                        upperLipTopX: faceData.faceLandmarks.upperLipTop.x,
                        upperLipTopY: faceData.faceLandmarks.upperLipTop.y,
                        upperLipBottomX: faceData.faceLandmarks.upperLipBottom.x,
                        upperLipBottomY: faceData.faceLandmarks.upperLipBottom.y,
                        underLipTopX: faceData.faceLandmarks.underLipTop.x,
                        underLipTopY: faceData.faceLandmarks.underLipTop.y,
                        underLipBottomX: faceData.faceLandmarks.underLipBottom.x,
                        underLipBottomY: faceData.faceLandmarks.underLipBottom.y,
                        faceRectangleTop: faceData.faceRectangle.top,
                        faceRectangleLeft: faceData.faceRectangle.left,
                        faceRectangleWidth: faceData.faceRectangle.width,
                        faceRectangleHeight: faceData.faceRectangle.height,
                        originalHeight: result.height,
                        originalWidth: result.width
                    })
                    .then(() => {
                        console.log("INSERT SUCCESSFUL");
                    });
            });
        });

        request.on('error', function(error) {
            console.log(error);
        });
        request.write(JSON.stringify({
            url: faceUrl
        }));
        request.end();
    });
});

router.get('/faces/all', function(req, res, next) {
    knex('faces')
        .select('id')
        .then(function(data) {
            res.send(data);
        });
});

router.get('/faces/:id', function(req, res, next) {
    knex('faces').where('id', req.params.id)
        .then(function(data) {
            res.send(data);
        });
});

module.exports = router;
