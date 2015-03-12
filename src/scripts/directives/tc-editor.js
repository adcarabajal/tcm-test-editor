(function () {
  'use strict';

  angular.module('testCasesEditor')
    .directive('tcEditor', function () {
      return {
        restrict:    'E',
        templateUrl: 'views/tc-editor-main.html',
        controller:  'tcEditorMain'
      };
    })
  ;
})();
