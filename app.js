'use strict';

angular.module('genieacs', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {

        $routeProvider.when('/', {
            templateUrl: 'app/src/auth/login/login.view.html'
        });

        $routeProvider.when('/register', {
            templateUrl: 'app/src/auth/register/register.view.html'
        });

        $routeProvider.when('/home', {
            templateUrl: 'app/src/layout/application.view.html'
        });

        $routeProvider.when('/devices', {
            templateUrl: 'app/src/devices/devices.view.html',
            controller: 'devicesCtrl'
        });

        $routeProvider.when('/graph', {
            templateUrl: 'app/src/graph/graph.view.html',
            controller: 'graphCtrl'
        });

        $routeProvider.when('/devices/:device', {
            templateUrl: 'app/src/devices/deviceDetails/deviceDetails.view.html',
            controller: 'deviceDetailsCtrl'
        });
    }])
