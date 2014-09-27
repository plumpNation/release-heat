angular.module('releaseHeat', ['office.ui'])
    .service('DeskHelper', function () {
        this.getPos = function (desk) {
            var rect = desk[0].getBoundingClientRect();

            return {
                x: rect.left + desk.innerWidth * 0.5,
                y: rect.top + desk.innerHeight * 0.5
            };
        };
    })
    .value('OfficeConfig', [
        {
            'name': 'Ben',
            'releases': [1, 2, 1, 0, 0]
        }
    ])
    .controller('office', function ($scope, OfficeConfig, OfficeConfig) {
        $scope.devs = OfficeConfig;
    })
    .service('DeskReleaseData', function () {
        this.get = function () {
            return {
                size: Math.round(Math.random() * 500),
                intensity: Math.round(Math.random() * 1)
            };
        };
    })
    .service('Store', function ($window) {
        this.get = function (key) {
            return $window.localStorage.getItem(key);
        };

        this.set = function (key, value) {
            $window.localStorage.setItem(key, value);
        };
    });
