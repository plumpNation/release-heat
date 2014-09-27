angular.module('office.ui', [])
    .directive('desk', function () {
        return {
            restrict: 'E',
            templateUrl: 'office/ui/desk.html',
            replace: true,

            scope: {
                developer: '='
            },

            controller: function ($scope, $element, $timeout, DeskHelper) {
                var heatmap,
                    canvas = angular.element($element[0].querySelector('.heatmap')),

                    heatData = {
                        x: 200,
                        y: 200,
                        intensity: 0.5
                    },

                    adjustData = function (dev) {
                        // This is where the business logic needs to happen
                        heatData.size = 100 || dev.releases[0];
                    },

                    /**
                     * @param {null|object} dev The data for this desk.
                     */
                    init = function () {
                        var dev = $scope.developer;

                        if (dev) {
                            adjustData(dev);

                            console.log(heatData);

                            $timeout(function () {
                                DeskHelper.getPos($element);

                                heatmap.addPoints([heatData]);
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
