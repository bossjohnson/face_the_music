app.controller('testController', testController);

function testController($scope, $http) {
    var url = 'http://nerdist.com/wp-content/uploads/2015/02/DavidLynch-970x545.jpg';
    var request = {
        method: 'POST',
        url: 'https://api.projectoxford.ai/face/v1.0/detect?returnFaceId=false&returnFaceLandmarks=true&returnFaceAttributes=age,gender,facialHair,glasses',
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': // API key goes here
        },
        data: {
            url: url
        }
    }
    $http(request)
        .then(function(data) {
            console.log(data.data);
        });
}
testController.$inject = ['$scope', '$http'];
