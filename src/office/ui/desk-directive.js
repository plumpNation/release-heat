/*global createWebGLHeatmap */
angular.module('office.ui', [])
    .service('RandomNum', function () {
        this.clamp = function (min, max) {
            var max = max - min + 1;

            return Math.floor((Math.random() * max) + min);
        };
    })
    .directive('desk', function (RandomNum) {
        var createSize = function (n) {
                return n * 100;
            },

            /**
             * @return {array} The array of releases.
             */
            createData = function ($element, developer) {
                // This is where the business logic needs to happen
                var rdata = [];

                rdata.push({
                    x: RandomNum.clamp(75, $element[0].clientWidth - 175),
                    y: RandomNum.clamp(100, $element[0].clientHeight - 100),
                    size: createSize(developer.releases.length),
                    intensity: 1 // the higher this value, the easier it is to achieve red
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
