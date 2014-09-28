/*global createWebGLHeatmap */
angular.module('office.ui', [])
    .directive('desk', function () {
        var createSize = function (n) {
                return n * 100;
            },

            /**
             * @return {array} The array of releases.
             */
            createData = function ($element, developer) {
                // This is where the business logic needs to happen
                var rdata = [],
                    padding = 50,
                    wUnits = ($element[0].clientWidth - padding) / 7;


                rdata = developer.releases.map(function (release) {
                    return {
                        x: wUnits * release.weekday + padding,
                        y: $element[0].clientHeight * 0.5,

                        size: (function () {
                            var diff = release.linesRemoved - release.linesAdded;

                            return diff;
                        }()),

                        // the higher this value, the easier it is to achieve red
                        intensity: (function () {
                            return Math.min(Math.max(release.linesAdded / 100, 0), 1)
                        }())
                    };
                });

                return rdata;
            };

        return {
            restrict: 'E',
            templateUrl: 'office/ui/desk.html',
            replace: true,

            scope: {
                developer: '='
            },

            controller: function ($scope, $element, $timeout) {
                var heatmap,
                    canvas = angular.element($element[0].querySelector('.heatmap')),

                    /**
                     * @param {null|object} dev The data for this desk.
                     */
                    init = function () {
                        var dev = $scope.developer,
                            heatData;

                        if (dev) {
                            heatData = createData($element, dev);
                            heatmap.addPoints(heatData);
                            heatmap.update();

                            $timeout(heatmap.display.bind(heatmap));
                        }
                    };

                canvas[0].style.height = $element[0].clientHeight + 'px';
                canvas[0].style.width = $element[0].clientWidth + 'px';

                try {
                    heatmap = createWebGLHeatmap({
                        'canvas': canvas[0]
                    });

                } catch (error) {
                    console.error(error);
                    return;
                }

                init();
            }
        };
    })
