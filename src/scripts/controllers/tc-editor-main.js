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

				$scope.$broadcast('event:main-editor-list-updated', $scope.list);

        $scope.availableTags = tags($scope.list );

        $scope.$on('event:advanced-editor-parsed', safeApplyWrapper($scope, function wrapAdvancedEdition(event, doc) {
          $scope.availableTags = tags(doc);
          $scope.$broadcast('event:advanced-editor-edited', doc);
        }));

				$scope.$on('event:basic-editor-parsed', safeApplyWrapper($scope, function wrapAdvancedEdition(event, doc) {
					$scope.list = doc;
					$scope.$broadcast('event:basic-editor-edited', doc);
				}));

        function tags(obj) {
          var values = _(obj).values();

          if (values.isEmpty()){
            return [];
          }

          return _.union(
            values.pluck("tags").flatten().value(),
            values.pluck("steps").flatten().map(tags).flatten().value()
          );
        }



      })();
    });
})();
