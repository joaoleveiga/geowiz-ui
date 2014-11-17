/**
 * @License
 *
 * gw-select-tree-nodes was based on angular.treeview. License: MIT
 * (C) 2013 AHN JAE-HA http://github.com/eu81273/angular.treeview
 */
(function (angular) {
  "use strict";

  angular.module('gw-ui.select-tree', []).
    directive('gwSelectTree', ['$compile', function ($compile) {
      return {
        scope: {
          gwSelected: '=',
          gwFilter: '=',
          gwTree: '=',
          gwShow: '=',
        },
        restrict: 'AE',
        link: function($scope, iElm, iAttrs) {
          var treeRoot  = iAttrs.gwTreeRoot,
              treeId    = iAttrs.gwTreeId,
              nodeId    = iAttrs.gwNodeId || 'id',
              nodeLabel = iAttrs.gwNodeLabel || 'label',
              template  = '<div class="btn-group gw-select gw-select-tree" ng-style="fixedWidth">' +
            '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">' +
              '<span class="current">{{ gwSelected.' + nodeLabel + ' }}</span> <span class="caret"></span>' +
            '</button>' +
            '<ul ng-style="maxHeight" class="dropdown-menu" role="menu" ng-class="{show: gwShow}" gw-tree-root="true" gw-select-tree-nodes="gwTree.' + treeRoot + '" gw-tree-id="' + treeId + '" gw-node-id="' + nodeId + '" gw-node-label="' + nodeLabel + '"></ul>' +
          '</div>';
          // Compile template only after loading attribute information
          iElm.html($compile(template)($scope));
          // DOM transformations:
          // - set fixed current label width
          if (parseInt(iAttrs.gwWidth, 10) > 10) {
            iElm.addClass("fixed-width");
            iElm.find('span.current').addClass('pull-left');
            $scope.fixedWidth = {width: iAttrs.gwWidth + 'px'};
          }
          // - set dropdown max height
          if (parseInt(iAttrs.gwHeight, 10) > 10) {
            iElm.find('ul.dropdown-menu').addClass("maxed-height");
            $scope.maxHeight = {'max-height': iAttrs.gwHeight + 'px'};
          }
        }
      };
    }]).
    directive('gwSelectTreeNodes', ['$compile', function ($compile) {
      return {
        restrict: 'A',
        link: function ($scope, iElm, iAttrs) {
          var treeId       = iAttrs.gwTreeId,
              treeModel    = iAttrs.gwSelectTreeNodes,
              nodeId       = iAttrs.gwNodeId || 'id',
              nodeLabel    = iAttrs.gwNodeLabel || 'label',
              template     = '<li ng-repeat="node in ' + treeModel + '">' +
                '<span class="glyphicon" ng-class="{\'glyphicon-plus\': !!node.collapsed, \'glyphicon-minus\': !node.collapsed, \'hide-glyph\': !node.children.length}" ng-click="' + treeId + '.toggleCollapse(node, $event)"></span>' +
                '<a ng-click="' + treeId + '.selectNode(node)">{{node.' + nodeLabel + '}}</a>' +
                '<ul ng-if="!!node.children.length" ng-hide="node.collapsed" gw-tree-id="' + treeId + '" gw-select-tree-nodes="node.children" gw-node-id="' + nodeId + '" gw-node-label="' + nodeLabel + '"></div>' +
              '</li>',
              _toggleCollapse = function (node, $event) {
                $event.preventDefault();
                $event.stopPropagation();
                node.collapsed = !node.collapsed;
              },
              _selectNode = function (node, $event) {
                if ($scope[treeId].currentNode && $scope[treeId].currentNode.selected) {
                  $scope[treeId].currentNode.selected = undefined;
                }
                node.selected = 'selected';
                $scope[treeId].currentNode = node;
                $scope.gwSelected = node;
              };

          // Do we have a tree?
          if( treeId && treeModel ) {
            // Create tree object in this scope and bind the node methods
            if( iAttrs.gwTreeRoot ) {
              $scope[treeId] = $scope[treeId] || {};
              $scope[treeId].toggleCollapse = $scope[treeId].toggleCollapse || _toggleCollapse;
              $scope[treeId].selectNode     = $scope[treeId].selectNode || _selectNode;
            }
            iElm.html($compile(template)($scope));
          }
        }
      };
    }]);
})(angular);
