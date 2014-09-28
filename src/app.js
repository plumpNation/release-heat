angular.module('releaseHeat', ['office.ui'])
    .value('OfficeConfig', [
        {
            'name': 'Ben',
            'releases': [1, 2, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1]
        }
    ])
    .controller('office', function ($scope, OfficeConfig, OfficeConfig) {
        $scope.devs = OfficeConfig;
    });
