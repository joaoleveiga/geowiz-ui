(function () {
  angular.module('gw-ui.select', []).
    directive('gwSelect', [function() {
      return {
        scope: {gwSelected: '=', gwElements: '='},
        restrict: 'AE',
        template: '<div class="btn-group gw-select">' +
            '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">' +
              '<span class="current">{{ gwSelected[label] }}</span> <span class="caret"></span>' +
            '</button>' +
            '<ul class="dropdown-menu" role="menu">' +
              '<li ng-repeat="element in gwElements"><a ng-click="select(element)">{{ element[label] }}</a></li>' +
            '</ul>' +
          '</div>',
        replace: true,
        link: function($scope, iElm, iAttrs) {
          $scope.label = iAttrs.gwLabel;
          $scope.select = function (element) {
            $scope.gwSelected = element;
          };
        }
      };
    }]);
})();
