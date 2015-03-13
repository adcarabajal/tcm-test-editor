(function () {
  'use strict';

  angular.module('testCasesEditor')
    .directive('tcEditorAdvanced', function () {
      return {
        restrict:    'E',
        templateUrl: 'views/tc-editor-advanced.html',
        controller:  'tcEditorAdvanced'
      };
    })
  ;
})();
