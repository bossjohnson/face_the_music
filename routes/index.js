var express = require('express');
var router = express.Router();
require('dotenv').config();
var https = require('https');
var fs = require('fs');
var os = require('os');
var path = require('path');
// var formidable = require('formidable');


router.get('/', function(req, res, next) {
    res.sendStatus(200);
});
//
// router.post('/upload', function(req, res, next) {
//     console.log('preparing to parse form...');
//     var form = new formidable.IncomingForm();
//     var tempUploadDir = __dirname + '/../uploads';
//     form.uploadDir = tempUploadDir;
//     // console.log("FORM:::", form);
//     form.parse(req, function(err, fields, files) {
//       // console.log('file:', files.file);
//         if (err) {
//             console.error(err);
//         }
//         fs.readFile(files.file.path, function(err, data) {
//             if (err) {
//                 throw err;
//             }
//             console.log(data.toString());
//             res.sendStatus(200);
//         });
//     });
// });

router.post('/test', function(req, res, next) {
    console.log(req.body);
    // var apiBaseUrl = 'https://api.projectoxford.ai/face/v1.0/detect';
    // var hostName = 'api.projectoxford.ai';
    // var queryParams = '?returnFaceId=false&returnFaceLandmarks=true&returnFaceAttributes=age,gender,facialHair,glasses';
    // var faceUrl = 'http://nerdist.com/wp-content/uploads/2015/02/DavidLynch-970x545.jpg';
    //
    // var options = {
    //     hostname: hostName,
    //     path: '/face/v1.0/detect' + queryParams,
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Ocp-Apim-Subscription-Key': process.env.FACE_API_KEY
    //     }
    // };

    // console.log(options);

    // var request = https.request(options, function(response) {
    //     var finished = '';
    //     response.on('data', function(data) {
    //         finished += data.toString();
    //     });
    //     response.on('end', function() {
    //         res.send(finished);
    //     })
    // });
    //
    // request.on('error', function(error) {
    //     console.log(error);
    // });
    // request.write(JSON.stringify({
    //     url: faceUrl
    // }));
    // request.end();

});
module.exports = router;
