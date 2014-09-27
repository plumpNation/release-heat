angular.module('releaseHeat', [])
    .controller('office', function ($scope, MockData) {
        $scope.points = MockData;
    })
    .directive('desk', function () {
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="desk"></div>'
        };
    })
    .service('MockData', function () {
        var num = Math.round(Math.random() * 10),
            data = [];

        for (var i = 0; i <= num; i += 1) {
            data.push({
                x: Math.round(Math.random() * 1000),
                y: Math.round(Math.random() * 500),
                size: Math.round(Math.random() * 500),
                intensity: Math.round(Math.random() * 10)
            });
        }

        return data;
    })
    .directive('heatmap', function () {
        return {
            restrict: 'E',
            template: '<canvas class="heatmap" width="{{windowWidth}}" height="{{windowHeight}}"></canvas>',
            replace: true,
            scope: {
                points: '='
            },
            controller: function ($scope, $element, Store) {
                var heatmap,
                    canvas = $element[0],
                    /**
                     * @param {null|array} points
                     */
                    addPoints = function (points) {
                        if (points) {
                            heatmap.addPoints(points);
                            heatmap.update();
                            heatmap.display();
                        }
                    },

                    resizeCanvas = function () {
                        $scope.windowWidth = window.innerWidth;
                        $scope.windowHeight = window.innerHeight;
                        heatmap.update();
                        heatmap.display();
                    };

                // resize the canvas to fill browser window dynamically
                window.addEventListener('resize', resizeCanvas, false);

                try {
                    heatmap = createWebGLHeatmap({'canvas': canvas});

                } catch (error) {
                    console.error(error);
                    return;
                }

                addPoints(Store.get('heatpoints') || $scope.points);
                resizeCanvas();
            }
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
