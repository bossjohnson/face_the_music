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


router.get('/', function(req, res, next) {
    res.sendStatus(200);
});

// Route for uploading images to cloudinary
router.post('/upload', upload.single('file'), function(req, res, next) {
    // upload photo to cloudinary
    var imageFile = req.file;
    cloudinary.uploader.upload(imageFile.path, function(result) {
        fs.unlink(imageFile.path, (err) => {
            if (err) console.error(err);
        });
        console.log("result:::", result.url);

        // hit face api

        var hostName = 'api.projectoxford.ai';
        var queryParams = '?returnFaceId=false&returnFaceLandmarks=true&returnFaceAttributes=age,gender,facialHair,glasses';
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
                res.send(finished);
            })
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

module.exports = router;
