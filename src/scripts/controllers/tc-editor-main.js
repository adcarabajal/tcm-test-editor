(function () {
  'use strict';

  angular.module('testCasesEditor')
    .controller('tcEditorMain', function ($scope, $rootScope) {
      (function bootstrap() {
        $rootScope.list = {
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


      })();
    });
})();
