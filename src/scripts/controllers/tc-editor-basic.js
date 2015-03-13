(function () {
  'use strict';

  angular.module('testCasesEditor')
    .controller('tcEditorBasic', function ($scope, safeApplyWrapper) {

      (function bootstrap() {
        $scope.selectedItem = {};

        $scope.basic = {}

        $scope.$on('event:advanced-editor-edited', safeApplyWrapper($scope, function bla(event, doc) {
          $scope.basic = doc;
          console.log(doc);
        }));

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
