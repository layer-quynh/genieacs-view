angular.module('genieacs')
.controller('devicesCtrl', function($scope, $http) {
    $scope.data = [];
    $scope.url = "";

    $scope.onSubmit = function () {
        getIDsDevice();
        //console.log('abc');
    }

    getIDsDevice = function() {
        //$http.post('http://192.168.0.20:7557/devices/')
        //.then(function successCallback(data) {
        //    //if(d.code == '200') {
        //        console.log(data);
        //    //}
        //}, function errorCallback(err) {
        //    console.log(err);
        ////     console.log('12344');
        //// console.log('12345');
        //});
    
	$http.jsonp('http://192.168.0.20:7557/devices/')

	.success(function (data, status, headers, config) {

        //$scope.details = data;
            console.log(data);

        })

        .error(function (data, status, headers, config) {

        //$scope.statusval = status;
            console.log(err);
    })
}})
