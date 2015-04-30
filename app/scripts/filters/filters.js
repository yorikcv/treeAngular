'use strict';

angular.module('treeUiApp')
    .filter('getChildrenTree', function() {
        return function(array, parent) {
            var result = [];
            if (typeof parent === 'string') {
                if (parent === 'null') {
                    parent = null;
                } else {
                    parent = +parent;
                }
            }

            angular.forEach(array, function(val, key) {
                if (val.ParentId === parent) {
                    result.push(val);
                }
            });

            return result;
        };
    })
    .filter('getChildrenRows', function() {
        return function(array, parent) {
            var result = [];
            if (typeof parent === 'string') {
                if (parent === 'null') {
                    parent = null;
                } else {
                    parent = +parent;
                }
            }

            angular.forEach(array, function(val, key) {
                if (val.parentId === parent) {
                    result.push(val);
                }
            });

            return result;
        };
    })
    .filter('getRowByNodeId', function() {
        return function(array, id) {
            var result;

            angular.forEach(array, function(val, key) {
                if (val.id === id) {
                    result = key;
                }
            });

            return result;
        }
    });
