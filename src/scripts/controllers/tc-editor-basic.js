(function () {
  'use strict';

  angular.module('testCasesEditor')
    .controller('tcEditorBasic', function ($scope, safeApplyWrapper) {

      (function bootstrap() {
        $scope.selectedItem = {};

        $scope.basicList = transformDoc($scope.list);

				$scope.objectInEdition = {};

        $scope.$on('event:advanced-editor-edited', safeApplyWrapper($scope, function bla(event, doc) {
          $scope.basicList = transformDoc(doc);
        }));

				$scope.$on('event:main-editor-list-updated', safeApplyWrapper($scope, function bla(event, doc) {
					$scope.basicList = transformDoc(doc);
					console.log($scope.basicList);
				}));

				function transformDoc(obj) {

					return _.transform(obj, function(r, v, k){
						r[k] = {
							testName: k,
							values: v
						};

						r[k].values.steps = _.transform(r[k].values.steps, function(r2, v2, k2){
							if(_.isObject(v2)){
								r2.push(transformDoc(v2));
							}else{
								r2.push(v2);
							}
						});

					});
				}

        $scope.remove = function(scope) {
          console.log(scope);
          scope.remove();
        };

        $scope.toggle = function(scope) {
          scope.collapsed = !scope.collapsed;
        };


        $scope.isObject = function(item){
           return typeof item === 'object';
        }


        $scope.treeOptions = {
          accept: function(sourceNode, destNodes, destIndex) {
            console.log("accept");
          },
          dropped: function(event) {
            console.log("droppped");
          },
          beforeDrop: function(event) {
            console.log("beforedrop");
          },
          dragStart: function(event){
            console.log("dragStart");
          }
        };

        $scope.editTest = function(scope, key) {
					scope.editing = true;
        };

        $scope.cancelEditingTest = function(scope, key) {
          scope.editing = false;
        };

        $scope.saveTest = function(scope) {
					$scope.$emit('event:basic-editor-parsed', $scope.basicList);
					scope.editing = false;
        };

      })();
    });
})();
