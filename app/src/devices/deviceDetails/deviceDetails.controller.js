angular.module('genieacs')
    .controller('deviceDetailsCtrl', function ($scope, $routeParams, $http) {
        $scope.deviceID = $routeParams.device;
        $scope.devices = [];
        $scope.device = {};

        var editSettings = { allowEditing: true,
            editMode: "cellEditing"}

        var columns = [
            { field: "taskName", headerText: "Device" },
            { field: "value", headerText: "Value" },
            { field: "writable", headerText: "Writable" }
        ];
        $scope.columns = columns;
        $scope.editSettings = editSettings;

        // Get all devices
        $scope.getDeviceIDs = function () {
            $http.get('http://fit5.fit-uet.tk:7557/devices/')
                .then(function successCallback(data) {
                    $scope.devices = data.data;
                    //console.log($scope.devices);
                }, function errorCallback(err) {
                    console.log(err);
                });
        }

        // Get device by its ID
        $http.get('http://fit5.fit-uet.tk:7557/devices/?query=%7B%22_id%22%3A%22' + $scope.deviceID + '%22%7D')
            .then(function successCallback(data) {
                $scope.Device = data.data[0];
                $scope.device = [makeData("Device", $scope.Device)];
            }, function errCallback(err) {
                console.log(err);
            })
        
        function translate(taskName, obj) {
            if (typeof obj !== 'object') {
                obj = {}
            }
            return {
                taskName: taskName,
                value: obj._value === undefined ? null : obj._value,
                writable: obj._writable === undefined ? null : obj._writable,
            };
        };

        // Modify json data into data which to load into table
        function makeData(key, obj) {
            if (isLowestLevel(obj)) {
                return translate(key, obj);
            } else {
                const result = translate(key, obj);
                result.subtasks = [];
                for (let k in obj) {
                    if (typeof obj[k] === 'object') {
                        result.subtasks.push(makeData(k, obj[k]));
                    }
                }
                // console.log(result);
                return result;
            }
        };

        // Check the lowest object
        function isLowestLevel(obj) {
            for (let key in obj) {
                if (typeof obj[key] === 'object') {
                    return false;
                }
            }
            return true;
        };
    })
