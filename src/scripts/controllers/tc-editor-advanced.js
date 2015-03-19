(function () {
  'use strict';

  angular.module('testCasesEditor')
    .controller('tcEditorAdvanced', function ($scope, $rootScope, $timeout, $window, codeMirror, safeApplyWrapper) {
      var editor;

      (function bootstrap() {
        $scope.currentError = undefined;
        $scope.editor = editor = codeMirror.initEditor();

        $scope.editor.setValue(jsyaml.safeDump($scope.list));

        $scope.selectedItem = {};

        editor.on('change', function onChange() {
          $scope.loadCode();
        });

        $scope.$on('event:basic-editor-edited', safeApplyWrapper($scope, function wrapAdvancedEdition(event, doc) {
					$scope.editor.setValue(jsyaml.safeDump(parseDoc($scope.list)));
				}));

				function parseDoc(obj) {
					return _.transform(obj, function(r, v, k){
						r[v.testName] = {
							tags: v.values.tags,
							steps: v.values.steps,
							description: v.values.description,
						}


						r[v.testName].steps = _.transform(r[v.testName].steps,
							function(r2, v2, k2){
								if(_.isObject(v2)){
									r2.push(parseDoc(v2));
								}else{
									r2.push(v2);
								}
							});
					});
				};

        $scope.loadCode = function loadCode() {

          try {
            var doc = jsyaml.safeLoad(editor.getValue());
            $scope.$emit('event:advanced-editor-parsed', doc);

          } catch (e) {
            console.log(e);
          }

          return doc;

        };

      })();
    });
})();
