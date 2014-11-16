(function () {
  angular.module('gw-ui.select', []).
    directive('gwSelect', [function() {
      return {
        scope: {gwSelected: '=', gwElements: '=', gwFilter: '='},
        restrict: 'AE',
        template: '<div class="btn-group gw-select">' +
            '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">' +
              '<span class="current">{{ gwSelected[label] }}</span> <span class="caret"></span>' +
            '</button>' +
            '<ul class="dropdown-menu" role="menu">' +
              '<li ng-repeat="element in gwElements | filter: gwFilter"><a ng-click="select(element)">{{ element[label] }}</a></li>' +
            '</ul>' +
          '</div>',
        replace: true,
        link: function($scope, iElm, iAttrs) {
          $scope.label = iAttrs.gwLabel;
          if (iAttrs.gwShow) iElm.find('ul').addClass("show");
          $scope.select = function (element) {
            $scope.gwSelected = element;
          };
        }
      };
    }]);
})();
