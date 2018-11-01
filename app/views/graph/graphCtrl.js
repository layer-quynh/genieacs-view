angular.module('genieacs')
.controller('graphCtrl', function($scope) {
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
                labels: ["10h", "11h", "12h", "13h", "14h", "15h"],
                datasets: [{
                    label: "% retries",
                    data: [40, 8.7, 9.4, 33.8, 17.7, 15.4],
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