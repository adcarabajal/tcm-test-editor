(function () {
  'use strict';

  angular.module('testCasesEditor')
    .controller('tcEditorMain', function ($scope, $rootScope, $timeout, $window, codeMirror) {
      var editor;


      (function bootstrap() {
        $scope.currentError    = undefined;
        $scope.editor          = editor = codeMirror.initEditor();

        $scope.radioModel = 'Advanced';

        $scope.list = {
            "Test-Hybrid": {
                "steps": [
                    "sadasdsd",
                    "dasdasdasd",
                    {
                        "Test 1.A ": {
                            "steps": [
                                "asdfasdfasdf"
                            ],
                            "description": "aslkjasdlfslkjfasdf"
                        }
                    },
                    {
                        "Test 1.B ": {
                            "steps": [
                                "asdfasdfasdf"
                            ],
                            "description": "aslkjasdlfslkjfasdf"
                        }
                    }
                ],
                "description": "Test Hybrid API"
            },
            "bla bla bla": {
                "steps": [
                    "asdadsa",
                    "asfdafd"
                ],
                "description": "adfljkafldskj"
            }
        };

        $scope.editor.setValue(jsyaml.dump($scope.list));

        $scope.selectedItem = {};

        $scope.options = {
        };

        $scope.remove = function(scope) {
          scope.remove();
        };

        $scope.toggle = function(scope) {
          scope.toggle();
        };

        $scope.newSubItem = function(scope) {
          var nodeData = scope.$modelValue;
          nodeData.items.push({
              "dflkjasdlkjdas": {
                  "steps": [
                      "asdadsa",
                      "asfdafd"
                  ],
                  "description": "adfljkafldskj"
              }
          });
        };

        $scope.isObject = function(item){
           return typeof item === 'object';
        }
      })();
    });
})();
