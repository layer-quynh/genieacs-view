angular.module('genieacs')
.controller('devicesCtrl', function($scope, $http) {
    $scope.devices = [];

    $scope.getDeviceIDs = function() {
        $http.get('http://192.168.0.20:7557/devices/')
        .then(function successCallback(data) {
           //if(d.code == '200') {
               $scope.devices = data.data;
               console.log($scope.devices);
               //console.log(data.data);
           //}
        }, function errorCallback(err) {
           console.log(err);
        });
    }
})
