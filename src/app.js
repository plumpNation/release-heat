angular.module('releaseHeat', ['office.ui'])
    .value('OfficeConfig', [
        {
            'name': 'Ben',
            'releases': [
                {
                    'linesAdded': 102,
                    'linesRemoved': 34,
                    'timestamp': 1411896874316
                }
            ]
        }
    ])
    .controller('office', function ($scope, OfficeConfig, OfficeConfig) {
        $scope.devs = OfficeConfig;
    });
