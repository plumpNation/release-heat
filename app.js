angular.module('releaseHeat', [])
    .directive('desk', function () {
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="desk"></div>'
        };
    })
    .directive('heatmap', function () {
        return {
            restrict: 'E',
            template: '<div class="heatmap-container"><canvas class="heatmap"></canvas></div>',
            replace: true,
            controller: function ($element) {
                var canvas = $element[0].querySelector('.heatmap');

                try {
                    var heatmap = createWebGLHeatmap({'canvas': canvas});

                } catch (error) {
                    // handle the error
                }
            }
        };
    })
    .service('Store', function ($window) {
        this.get = function (key, value) {
            $window.localStorage.getItem(key, value);
        };

        this.set = function (key, value) {
            $window.localStorage.setItem(key, value);
        };
    });
