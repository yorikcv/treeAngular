'use strict';

angular.module('treeUiApp')
    .directive('treeItem', function() {
        return {
            templateUrl: 'views/treeItem.html',
            restrict: 'E',
            scope: {},
            controller: 'treeController',
            link: function postLink(scope, element, attrs) {
                // все з контроллера буде тут, там будуть тільки основні речі які кидають у скоуп дані і так далі
            }
        };
    });
