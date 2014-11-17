/**
 * @License
 *
 * Based on angular.treeview. License: MIT
 * (C) 2013 AHN JAE-HA http://github.com/eu81273/angular.treeview
 */
(function (angular) {
  "use strict";

  angular.module('gw-ui.select-tree', []).
    directive('gwSelectTree', [function () {
      return {
        scope: {gwSelected: '=', gwElements: '=', gwFilter: '=', gwTree: '=', gwShow: '='},
        restrict: 'AE',
        template: '<div class="btn-group gw-select gw-select-tree" ng-style="fixedWidth">' +
            '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">' +
              '<span class="current">{{ gwSelected[label] }}</span> <span class="caret"></span>' +
            '</button>' +
            '<ul class="dropdown-menu" role="menu" ng-class="{show: gwShow}" gw-tree-root="true" gw-select-tree-nodes="gwTree.root" gw-tree-id="gwTree.id"></ul>' +
          '</div>',
        replace: true,
        link: function($scope, iElm, iAttrs) {
          $scope.label = iAttrs.gwLabel;
          if (parseInt(iAttrs.gwWidth, 10) > 10) {
            iElm.addClass("fixed-width");
            iElm.find('span.current').addClass('pull-left');
            $scope.fixedWidth = {width: iAttrs.gwWidth + 'px'};
          }
        }
      };
    }]).
    directive('gwSelectTreeNodes', ['$compile', function ($compile) {
      return {
        restrict: 'A',
        replace: false,
        link: function ($scope, iElm, iAttrs) {
          var treeId       = iAttrs.gwTreeId,
              treeModel    = iAttrs.gwSelectTreeNodes,
              nodeId       = iAttrs.gwNodeId || 'id',
              nodeLabel    = iAttrs.gwNodeLabel || 'label',
              template     = '<li ng-repeat="node in ' + treeModel + '">' +
                '<span class="glyphicon" ng-class="{\'glyphicon-plus\': !!node.collapsed, \'glyphicon-minus\': !node.collapsed}" ng-click="' + treeId + '.toggleCollapse(node, $event)"></span>' +
                '<a ng-click="' + treeId + '.selectNode(node)">{{node.' + nodeLabel + '}}</a>' +
                '<ul ng-if="!!node.children.length" ng-hide="node.collapsed" gw-tree-id="' + treeId + '" gw-select-tree-nodes="node.children" gw-node-id=' + nodeId + ' gw-node-label=' + nodeLabel + '></div>' +
              '</li>';

          //check tree id, tree model
          if( treeId && treeModel ) {
            //root node
            if( iAttrs.gwTreeRoot ) {
              //create tree object if not exists
              $scope[treeId] = $scope[treeId] || {};
              //if node head clicks,
              $scope[treeId].toggleCollapse = $scope[treeId].toggleCollapse || function( selectedNode, $event ){
                $event.preventDefault();
                $event.stopPropagation();
                selectedNode.collapsed = !selectedNode.collapsed;
              };
              //if node label clicks,
              $scope[treeId].selectNode = $scope[treeId].selectNode || function( selectedNode, $event ){
                //remove highlight from previous node
                if( $scope[treeId].currentNode && $scope[treeId].currentNode.selected ) {
                  $scope[treeId].currentNode.selected = undefined;
                }
                selectedNode.selected = 'selected';
                $scope[treeId].currentNode = selectedNode;
              };
            }
            iElm.html('').append( $compile( template )( $scope ) );
          }
        }
      };
    }]);
})(angular);
