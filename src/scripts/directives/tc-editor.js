(function () {
  'use strict';

  angular.module('testCasesEditor')
    .directive('tcEditor', function () {
      return {
        restrict:    'E',
        transclude: true,
        templateUrl: 'views/tc-editor-main.html',
        controller:  'tcEditorMain'
      };
    })
  ;
})();
