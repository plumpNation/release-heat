var createReleases = function () {
    var rdata = ('xxxxx').split(''),
        weekday = 0;

    rdata = rdata.map(function () {
        return {
            'linesAdded': Math.random() * 100 | 0,
            'linesRemoved': Math.random() * 100 | 0,
            'weekday': weekday++
        };
    });

    return rdata;
};

angular.module('releaseHeat', ['office.ui'])
    .value('OfficeConfig', [
        {
            'name': 'Jonas Arseberg',
            'releases': createReleases()
        }
    ])
    .controller('office', function ($scope, OfficeConfig, OfficeConfig) {
        $scope.devs = OfficeConfig;
    });
