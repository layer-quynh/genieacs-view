angular.module('genieacs')
    .controller('devicesCtrl', function ($scope, listDevices) {
        $scope.devices = [];

        // Get all devices
        getDeviceIDs = function () {
            listDevices.getDeviceIDs(function (data) {
                if (data) {
                    for (id in data) {
                        // console.log(data[id]._id);
                        if (data[id]._id.indexOf("_") < 0) {
                            $scope.devices.push(data[id]);
                        }
                    }
                }

            })
        }

        // Click to display ID of devices
        $scope.onClick = function () {
            getDeviceIDs();
            $scope.devices = [];
        }
    })
