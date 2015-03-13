(function () {
  'use strict';

  angular.module('testCasesEditor')
    .controller('tcEditorAdvanced', function ($scope, $rootScope, $timeout, $window, codeMirror) {
      var editor;


      (function bootstrap() {
        $scope.currentError    = undefined;
        $scope.editor          = editor = codeMirror.initEditor();

        $scope.editor.setValue(jsyaml.dump($scope.list));

        $scope.selectedItem = {};

        $scope.options = {
        };

      })();
    });
})();
