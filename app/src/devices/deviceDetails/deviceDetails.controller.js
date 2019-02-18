angular.module('genieacs')
    .controller('deviceDetailsCtrl', function ($scope, $routeParams, $http, listDevices) {
        $scope.deviceID = $routeParams.device
        $scope.devices = []
        $scope.device = {}
        $scope.dataEdit = {}

        // Create columns
        var columns = [
            { field: "taskName", headerText: "Device", showCheckbox: true },
            { field: "value", headerText: "Value" },
            { field: "writable", headerText: "Writable" }
        ];
        $scope.columns = columns;
        $scope.editSettings = { allowAdding: true, allowEditing: true, allowDeleting: false, editMode: "cellEditing" };

        // Toolbar item
        var toolbarItems = [ej.TreeGrid.ToolbarItems.Add,
        // ej.TreeGrid.ToolbarItems.Edit,
        // ej.TreeGrid.ToolbarItems.Delete,
        ej.TreeGrid.ToolbarItems.Update,
        ej.TreeGrid.ToolbarItems.Cancel,
        ej.TreeGrid.ToolbarItems.ExpandAll,
        ej.TreeGrid.ToolbarItems.CollapseAll
        ];
        $scope.toolbarSettings = { showToolbar: true, toolbarItems: toolbarItems };

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
        $scope.onClick = function() {
            getDeviceIDs();
            $scope.devices = [];
        }

        // Get params by its ID
        $http.get('http://fit5.fit-uet.tk:7557/devices/?query=%7B%22_id%22%3A%22' + $scope.deviceID + '%22%7D')
            .then(function successCallback(data) {
                $scope.Device = data.data[0];
                $scope.device = [flatData("Device", $scope.Device)];
                console.log($scope.Device);
            }, function errCallback(err) {
                console.log(err);
            })

        // Modify the lowest object level
        function translate(taskName, obj) {
            if (typeof obj !== 'object') {
                obj = {}
            }
            return {
                taskName: taskName,
                value: obj._value === undefined ? null : obj._value,
                writable: obj._writable === undefined ? null : obj._writable,
                type: obj._type === undefined ? null : obj._type
            };
        };

        // Modify json data into data which to load into table
        function flatData(key, obj) {
            if (isLowestLevel(obj)) {
                return translate(key, obj);
            } else {
                const result = translate(key, obj);
                result.subtasks = [];
                for (let k in obj) {
                    if (typeof obj[k] === 'object') {
                        result.subtasks.push(flatData(k, obj[k]));
                    }
                }
                //console.log(result);
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

        // Load data into table
        $("#TreeGridContainer").ejTreeGrid({
            endEdit: function (args) {
                console.log(args.data)
                //console.log(compareSubtask(args.data));
                let name = compareSubtask(args.data).join(".");
                let value = args.data.value;
                let type = args.data.type;
                // console.log(type);
                $scope.dataEdit = {
                    "name":"setParameterValues",
                    "parameterValues":[[name, value, type]]
                }
                //console.log($scope.dataEdit)
                $http.post('http://fit5.fit-uet.tk:7557/devices/' + $scope.deviceID + '/tasks?connection_request', $scope.dataEdit)
                .then(function successCallback(data) {
                    console.log(data)
                }, function(err) {
                    console.log(err)
                })
            }
        }); 

        // Compare data in table with data from server
        function compareSubtask(taskData){
            let trancer = [];
            trancer.push(taskData.taskName);
            while(true){
                let parentItem = taskData.parentItem;
                if(parentItem){
                    trancer.push(parentItem.taskName);
                    taskData = taskData.parentItem;
                } else {
                    break;
                }
            }
            let result = trancer.reverse();
            result.splice(0,1);
            return result;
        }
    })
