(function () {
  'use strict';

  angular.module('testCasesEditor')
    .controller('tcEditorAdvanced', function ($scope, $rootScope, $timeout, $window, codeMirror) {
      var editor;

      (function bootstrap() {
        $scope.currentError = undefined;
        $scope.editor = editor = codeMirror.initEditor();

        $scope.editor.setValue(jsyaml.safeDump($rootScope.list));

        $scope.selectedItem = {};

        editor.on('change', function onChange() {
          $scope.loadCode();
        });

        $scope.$on('event:basic-editor-edited', function(){
          console.log('event:basic-editor-edited')
        });

        $scope.loadCode = function loadCode() {

          try {
            var doc = jsyaml.safeLoad(editor.getValue());
            $rootScope.$broadcast('event:advanced-editor-edited', doc);

          } catch (e) {
            console.log(e);
          }

          return doc;

        };

      })();
    });
})();
