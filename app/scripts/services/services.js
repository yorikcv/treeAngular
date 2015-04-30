'use strict';


angular.module('treeUiApp')
    .service('treeService', ['$http', '$q', function($http, $q) {
        var deferred = $q.defer();

        //потім можна використати $resource
        $http.get('json/test.json').then(function(data) {
            deferred.resolve(data);
        });

        this.getTree = function() {
            return deferred.promise;
        };
    }]);
