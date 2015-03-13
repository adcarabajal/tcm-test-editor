(function () {
  'use strict';

  angular.module('testCasesEditor')
    .directive('tcEditorBasic', function () {
      return {
        restrict:    'E',
        templateUrl: 'views/tc-editor-basic.html',
        controller:  'tcEditorBasic'
      };
    })
  ;
})();
