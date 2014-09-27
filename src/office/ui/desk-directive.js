angular.module('office.ui', [])
    .service('RandomNum', function () {
        this.clamp = function (min, max) {
            var max = max - min + 1;

            return Math.floor((Math.random() * max) + min);
        };
    })
    .directive('desk', function () {
        return {
            restrict: 'E',
            templateUrl: 'office/ui/desk.html',
            replace: true,

            scope: {
                developer: '='
            },

            controller: function ($scope, $element, $timeout, DeskHelper, RandomNum) {
                var heatmap,
                    canvas = angular.element($element[0].querySelector('.heatmap')),

                    createSize = function (n) {
                        return n * 100;
                    },

                    /**
                     * @return {array} The array of releases.
                     */
                    createData = function (dev) {
                        // This is where the business logic needs to happen
                        var rdata = [];

                        dev.releases.forEach(function (release) {
                            rdata.push({
                                x: RandomNum.clamp(50, $element[0].clientWidth - 50),
                                y: RandomNum.clamp(50, $element[0].clientHeight - 50),
                                size: createSize(release),
                                intensity: 0.5
                            });
                        });

                        return rdata;
                    },

                    /**
                     * @param {null|object} dev The data for this desk.
                     */
                    init = function () {
                        var dev = $scope.developer,
                            heatData;

                        if (dev) {
                            heatData = createData(dev);
                            console.log(heatData);

                            $timeout(function () {
                                DeskHelper.getPos($element);

                                heatmap.addPoints(heatData);
                                heatmap.update();
                                heatmap.display();
                            });
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
