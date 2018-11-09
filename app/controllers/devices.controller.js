angular.module('genieacs')
.controller('devicesCtrl', function($scope, $http) {
    $scope.onSubmit = function () {
        getID();
    }

    getID = function() {
    $http.post('localhost:7557/devices', data)
    .then(function successCallback(data) {
        if(data.res.code == '200') {
            console.log(data);
        }
    }, function errorCallback(err) {
        console.log(err);
        console.log('12344');
    });
}
})