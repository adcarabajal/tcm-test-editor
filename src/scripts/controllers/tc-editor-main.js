(function () {
  'use strict';

  angular.module('testCasesEditor')
    .controller('tcEditorMain', function ($scope, safeApplyWrapper) {
      (function bootstrap() {
        $scope.list = {
          "Test-Hybrid": {
            "tags": ["sanity", "regression", "ui"],
            "steps": [
              "step 1",
              "step 2",
              {
                "Test 1.A ": {
                  "tags": ["regression", "ui"],
                  "steps": [
                    "step 1"
                  ],
                  "description": "descripcion del test 1a"
                }
              },
              {
                "Test 1.B ": {
                  "tags": ["regression", "ui"],
                  "steps": [
                    "step 1",
                    "step 2"
                  ],
                  "description": "Descripcion para el test 1b"
                }
              }
            ],
            "description": "Test Hybrid API test description andbla bla bla"
          },
          "Test cloudhub mas complejo": {
            "tags": ["regression", "backend"],
            "steps": [
              "Step1",
              "step 2"
            ],
            "description": "una descripcion para el test mas complejo"
          },
          "test environments": {
            "tags": ["regression", "environments"],
            "steps": [
              "Step1",
              "step 2"
            ],
            "description": "una descripcion para el test mas complejo"
          }
        };

        $scope.availableTags = ['sanity', 'regression', 'ui'];

        $scope.$on('event:advanced-editor-parsed', safeApplyWrapper($scope, function wrapAdvancedEdition(event, doc) {
          updateAvailableTags(doc);
          //$scope.$broadcast('event:advanced-editor-edited', doc);
        }));

        function updateAvailableTags(doc){

          console.log(getUniqueTags(doc));
          $scope.availableTags = ['sanity', 'regression', 'ui'];
        };

        function pickDeep(collection, identity, thisArg) {
          var picked = _.pick(collection, identity, thisArg);
          var collections = _.pick(collection, _.isObject, thisArg);

          _.each(collections, function(item, key, collection) {
            var object;
            if (_.isArray(item)) {
              object = _.reduce(item, function(result, value) {
                var picked = pickDeep(value, identity, thisArg);
                if (!_.isEmpty(picked)) {
                  result.push(picked);
                }
                return result;
              }, []);
            } else {
              object = pickDeep(item, identity, thisArg);
            }

            if (!_.isEmpty(object)) {
              picked[key] = object;
            }

          });

          return picked;
        }


      })();
    });
})();
