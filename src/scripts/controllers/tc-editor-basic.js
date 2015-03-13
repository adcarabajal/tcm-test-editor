(function () {
  'use strict';

  angular.module('testCasesEditor')
    .controller('tcEditorBasic', function ($scope, $rootScope, $timeout, $window, codeMirror) {

      (function bootstrap() {

        $scope.selectedItem = {};

        $scope.options = {
        };

        $scope.remove = function(scope) {
          console.log(scope);
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
        $scope.availableColors = ['Red','Green','Blue','Yellow','Magenta','Maroon','Umbra','Turquoise'];
        $scope.disabled = undefined;
        $scope.multipleDemo = {};
        $scope.multipleDemo.colors = ['Blue','Red'];

      })();
    });
})();
