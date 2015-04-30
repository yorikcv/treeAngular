'use strict';

angular.module('treeUiApp')
    .controller('treeController', ['$scope', '$filter', 'treeService', function($scope, $filter, treeService) {

        $scope.treeRows = [];

        treeService.getTree().then(function(data) {
            $scope.dataTree = data.data;

            var rootArray = $filter('getChildrenTree')($scope.dataTree, 'null');

            angular.forEach(rootArray, function(val, key) {
                $scope.treeRows.push(createTreeRow(val, 1));
            });
        });

        // $scope.$watch('dataTree', function(data) {
        //     var tree = unflatten( data );
        //     console.log(tree);
        // });

        function createTreeRow(data, level) {
            return {
                label: data.Name,
                level: level,
                id: data.ServiceId,
                parentId: data.ParentId,
                children: false,
                visible: true,
                expanded: false,
                loaded: false,
                icon: 'glyphicon glyphicon-plus',
                data: data
            }
        };

        function setAttrParent(id, level) {
            return {
                keyParent: $filter('getRowByNodeId')($scope.treeRows, id) + 1,
                parent: $scope.treeRows[$filter('getRowByNodeId')($scope.treeRows, id)],
                childrensArrayTree: $filter('getChildrenTree')($scope.dataTree, id),
                childrensArrayRows: $filter('getChildrenRows')($scope.treeRows, id),
                level: level
            }
        };

        function loadChildren(attrParent) {
            if (attrParent.childrensArrayTree) {
                angular.forEach(attrParent.childrensArrayTree, function(val, key) {
                    var keyRowSplice = attrParent.keyParent + key,
                        treeRow = createTreeRow(val, attrParent.level + 1);

                    $scope.treeRows.splice(keyRowSplice, 0, treeRow);
                });

                attrParent.parent.loaded = true;
                attrParent.parent.children = true;
            }
        };

        function hideOrShowChildren(attrParent, attrShow) {
            angular.forEach(attrParent.childrensArrayRows, function(val, key) {
                val.visible = attrShow;
            });
        };

        $scope.showChildren = function(nodeId, level) {

            var attrParent = setAttrParent(nodeId, level),
                loaded = attrParent.parent.loaded,
                expanded = attrParent.parent.expanded;
            console.log(attrParent.parent);


            if (loaded === true) {
                if (expanded === true) {
                    hideOrShowChildren(attrParent, false);
                    console.log("hide");
                } else {
                    hideOrShowChildren(attrParent, true);
                    console.log("show");
                }
            } else {
                loadChildren(attrParent);
                console.log("load");
            }

            attrParent.parent.expanded = !attrParent.parent.expanded;
            // console.log($scope.treeRows);
        };

    }]);
