angular.module('genieacs')
    .service('listDevices', ['$http', function ($http) {
        var getDeviceIDs = function(callback) {
            return $http.get('http://fit5.fit-uet.tk:7557/devices/?projection=_id/')
                .then(function successCallback(data) {
                    callback(data.data);
                }, function errCallback(err) {
                    console.log(err);
                })
        }

        return {
            getDeviceIDs: getDeviceIDs
        };
    }])