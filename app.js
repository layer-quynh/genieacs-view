'use strict';

angular.module('genieacs', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {

        $routeProvider.when('/', {
            templateUrl: 'app/views/auth/login.html'
        });

        $routeProvider.when('/register', {
            templateUrl: 'app/views/auth/register.html'
        });

        $routeProvider.when('/home', {
            templateUrl: 'app/views/layout/application.html'
        });

        $routeProvider.when('/devices', {
            templateUrl: 'app/views/devices/params.html',
            controller: 'devicesCtrl'
        });

        $routeProvider.when('/graph', {
            templateUrl: 'app/views/graph/graph.view.html',
            controller: 'graphCtrl'
        });
    }])