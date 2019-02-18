angular.module('genieacs')
    .controller('graphCtrl', function ($scope, $http, $routeParams) {
        $scope.deviceID = $routeParams.device;
        params = [];
        deviceParams = [];

        // Modify object into an array with params are strings
        const keyify = (obj, prefix = '') =>
            Object.keys(obj).reduce((res, el) => {
                if (Array.isArray(obj[el])) {
                    return res;
                } else if (typeof obj[el] === 'object' && obj[el] !== null) {
                    return [...res, ...keyify(obj[el], prefix + el + '.')];
                } else {
                    return [...res, prefix + el];
                }
            }, []);

        // Compare a string with dot notation and object
        function index(obj, is, value) {
            if (typeof is == 'string')
                return index(obj, is.split('.'), value);
            else if (is.length == 1 && value !== undefined)
                return obj[is[0]] = value;
            else if (is.length == 0)
                return obj;
            else
                return index(obj[is[0]], is.slice(1), value);
        }

        $http.get('http://fit5.fit-uet.tk:7557/devices/?query=%7B%22_id%22%3A%22' + $scope.deviceID + '%22%7D')
            .then(function successCallback(data) {
                if (data.data[0] !== null) {
                    obj = data.data[0];
                    params = keyify(data.data[0]);
                    for (let i = 0; i < params.length; i++) {
                        if (params[i].indexOf("_value") >= 0 && typeof index(obj, params[i]) == "number") {
                            deviceParams.push(params[i]);
                        }
                    }
                    $scope.model.entities = deviceParams.map(val => ({ value: val }));
                }
            }, function errCallback(err) {
                console.log(err);
            })

        // Table
        $scope.model = {};
        $scope.itemChecked = [];

        // This property will be bound to checkbox in table header
        $scope.model.allItemsSelected = false;

        // This executes when entity in table is checked
        $scope.selectEntity = function () {
            $scope.itemChecked = [];
            // If any entity is not checked, then uncheck the "allItemsSelected" checkbox
            for (var i = 0; i < $scope.model.entities.length; i++) {
                if (!$scope.model.entities[i].isChecked) {
                    $scope.model.allItemsSelected = false;
                    return;
                } else {
                    $scope.itemChecked.push($scope.model.entities[i]);
                }
            }
            //If not the check the "allItemsSelected" checkbox
            $scope.model.allItemsSelected = true;
        };

        $scope.selectSome = function () {
            $scope.itemChecked = [];
            // Loop through all the entities and set their isChecked property
            for (var i = 0; i < $scope.model.entities.length; i++) {
                if ($scope.model.entities[i].isChecked) {
                    $scope.itemChecked.push($scope.model.entities[i]);
                }
            }
            console.log($scope.itemChecked[0].value);
        };

        // This executes when checkbox in table header is checked
        $scope.selectAll = function () {
            $scope.itemChecked = [];
            // Loop through all the entities and set their isChecked property
            for (var i = 0; i < $scope.model.entities.length; i++) {
                $scope.model.entities[i].isChecked = $scope.model.allItemsSelected;
                if ($scope.model.entities[i].isChecked) {
                    $scope.itemChecked.push($scope.model.entities[i]);
                }
            }
            // console.log($scope.itemChecked);
        };

        $scope.barChart = document.getElementById("barChart").getContext('2d');
        $scope.myBarChart = new Chart(barChart, {
            type: 'bar',
            data: {
                labels: ["10h", "11h", "12h", "13h", "14h", "15h"],
                datasets: [{
                    label: "% retries1",
                    data: [40, 8.7, 9.4, 33.8, 17.7, 15.4],
                    fill: true,
                    borderColor: 'white',
                    borderWidth: 2,
                    backgroundColor: '#00c6d7'
                }, {
                    label: "% retries2",
                    data: [40, 8.7, 9.4, 33.8, 17.7, 15.4],
                    fill: true,
                    borderColor: 'white',
                    borderWidth: 2,
                    backgroundColor: 'yellow'
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            max: 100,
                            min: 0,
                            stepSize: 20
                        }
                    }]
                },
                legend: {
                    display: true,
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Column Chart'
                }
            }
        });

        $scope.lineChart = document.getElementById("lineChart").getContext('2d');
        $scope.myChart = new Chart(lineChart, {
            type: 'line',
            data: {
                labels: ["10h"],
                datasets: [{
                    label: "% retries",
                    data: [40],
                    fill: true,
                    borderColor: [
                        '#58FAF4',
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            max: 100,
                            min: 0,
                            stepSize: 20
                        }
                    }]
                },
                legend: {
                    display: true,
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Line Chart'
                }
            }
        });
    })