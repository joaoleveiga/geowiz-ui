(function (angular) {
  "use strict";

  angular.module('gw-ui.select', []).
    directive('gwSelect', [function() {
      return {
        scope: {gwSelected: '=', gwElements: '=', gwFilter: '=', gwShow: '='},
        restrict: 'AE',
        template: '<div class="btn-group gw-select" ng-style="fixedWidth">' +
            '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">' +
              '<span class="current">{{ gwSelected[label] }}</span> <span class="caret"></span>' +
            '</button>' +
            '<ul class="dropdown-menu" role="menu" ng-class="{show: gwShow}">' +
              '<li ng-repeat="element in gwElements | filter: gwFilter"><a ng-click="select(element)">{{ element[label] }}</a></li>' +
            '</ul>' +
          '</div>',
        replace: true,
        link: function($scope, iElm, iAttrs) {
          $scope.label = iAttrs.gwLabel;
          if (parseInt(iAttrs.gwWidth, 10) > 10) {
            iElm.addClass("fixed-width");
            iElm.find('span.current').addClass('pull-left');
            $scope.fixedWidth = {width: iAttrs.gwWidth + 'px'};
          }
          $scope.select = function (element) {
            $scope.gwSelected = element;
          };
        }
      };
    }]);
})(angular);
