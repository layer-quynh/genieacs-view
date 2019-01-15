angular.module('genieacs')
    .controller('deviceDetailsCtrl', function ($scope, $routeParams, $http) {
        $scope.deviceID = $routeParams.device
        $scope.devices = []
        $scope.device = {}
        $scope.dataEdit = {}

        // Selection setting
        $scope.selectionSettings = {
            selectionType: "ej.TreeGrid.SelectionType.Checkbox",
            selectionMode: "ej.TreeGrid.SelectionType.Row",
        };

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
        $scope.getDeviceIDs = function () {
            $http.get('http://fit5.fit-uet.tk:7557/devices/')
                .then(function successCallback(data) {
                    $scope.devices = data.data;
                    //console.log($scope.devices);
                    // console.log($scope.device)
                }, function errorCallback(err) {
                    console.log(err);
                });
        }

        // Get device by its ID
        $http.get('http://fit5.fit-uet.tk:7557/devices/?query=%7B%22_id%22%3A%22' + $scope.deviceID + '%22%7D')
            .then(function successCallback(data) {
                $scope.Device = data.data[0];
                $scope.device = [flatData("Device", $scope.Device)];
                // dataCanEdit($scope.device[0]);
                // console.log($scope.device)
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

        // Check the lowest object for processed object
        function isNewLowestLevel(obj) {
            if (obj.subtasks) {
                return false;
            }
            return true;
        }

        $("#TreeGridContainer").ejTreeGrid({
            endEdit: function (args) {
                // console.log(args.data)
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
        // function dataCanEdit(obj) {
        //     if (obj){
        //         if (isNewLowestLevel(obj)) {
        //             if (obj.writable) {
        //                 console.log(obj);
        //                 $scope.editSettings.allowEditing = true;
        //             }
        //             return;
        //         } else {
        //             for (let child in obj.subtasks) {
        //                 dataCanEdit(obj.subtasks[child]);
        //             }
        //         }
        //     }
        // }
    })
