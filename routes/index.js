const express = require('express');
const router = express.Router();
require('dotenv').config();
const https = require('https');
router.get('/', function(req, res, next) {
    res.sendStatus(200);
});
router.get('/test', function(req, res, next) {
    console.log('hit route');
    // var apiBaseUrl = 'https://api.projectoxford.ai/face/v1.0/detect';
    var hostName = 'api.projectoxford.ai';
    var queryParams = '?returnFaceId=false&returnFaceLandmarks=true&returnFaceAttributes=age,gender,facialHair,glasses';
    var faceUrl = 'http://nerdist.com/wp-content/uploads/2015/02/DavidLynch-970x545.jpg';

    var options = {
        hostname: hostName,
        path: '/face/v1.0/detect' + queryParams,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': process.env.FACE_API_KEY
        }
    };

    // console.log(options);

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
module.exports = router;
