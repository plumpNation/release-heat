angular.module('office.ui', [])
    .directive('desk', function () {
        return {
            restrict: 'E',
            templateUrl: 'office/ui/desk.html',
            replace: true,

            scope: {
                point: '='
            },

            controller: function ($scope, $element, $timeout, DeskHelper) {
                var heatmap,
                    canvas = angular.element($element[0].querySelector('.heatmap')),

                    /**
                     * @param {null|object} point The data for this desk.
                     */
                    init = function (point) {
                        if (point) {
                            $timeout(function () {
                                DeskHelper.getPos($element);
                                heatmap.addPoints([point]);
                                heatmap.update();
                                heatmap.display();
                            });
                        }
                    },

                    resizeCanvas = function () {
                        $scope.windowWidth = window.innerWidth;
                        $scope.windowHeight = window.innerHeight;

                        $timeout(function () {
                            heatmap.adjustSize();
                            heatmap.update();
                            heatmap.display();
                        });
                    };

                canvas[0].style.height = $element[0].clientHeight + 'px';
                canvas[0].style.width = $element[0].clientWidth + 'px';

                try {
                    heatmap = createWebGLHeatmap({'canvas': canvas[0]});

                } catch (error) {
                    console.error(error);
                    return;
                }

                init($scope.point);
            }
        };
    })
