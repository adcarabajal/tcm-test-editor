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

						if(!r[k].values || !r[k].values.steps){return []}

						r[k].values.steps = _.transform(r[k].values.steps, function(r2, v2, k2){
							if(_.isObject(v2)){
								r2.push(transformDoc(v2));
							}else{
								r2.push(v2);
							}
						});

					});
				}

        $scope.removeStep = function(scope, key, step) {          
          $scope.basicList = deleteStep($scope.basicList, key, step);
          $scope.$emit('event:basic-editor-parsed', $scope.basicList);
        };

        $scope.remove = function(scope, key) {
          $scope.basicList = deleteTest($scope.basicList, key);
          $scope.$emit('event:basic-editor-parsed', $scope.basicList);
        };

        function deleteStep(obj, key, step) {

          if(_.has(obj, key)){
            obj[key].values.steps = _.remove(obj[key].values.steps, function(item){
                if(!_.isObject(item)){
                  return !(item === step);
                }
                return true;
            });

            return obj;
          }

          return _.transform(obj, function(ret, item, k){
            if(item.values != null){
              item.values = _.transform(item.values, function(r2, i2, k2){
                if(k2==='steps'){

                  i2 = _.transform(i2, function(r3, i3, k3){

                    if(_.isObject(i3)){
                      var newObj = deleteStep(i3, key, step);
                      if(!_.isEmpty(newObj)){ r3.push(newObj);}

                    }else{
                      r3.push(i3);
                    }

                  });
                }

                r2[k2] = i2;

              });
            }

            ret[k] = item;

          });

        };

        function deleteTest(obj, key) {

          if(_.has(obj, key)){
            return _.omit(obj, key);
          };

          return _.transform(obj, function(ret, item, k){
            if(item.values != null){

              item.values = _.transform(item.values, function(r2, i2, k2){
                if(k2==='steps'){

                  i2 = _.transform(i2, function(r3, i3, k3){
                    if(_.isObject(i3)){
                      var newObj = deleteTest(i3, key);
                      if(!_.isEmpty(newObj)){ r3.push(newObj);}
                    }else{
                      r3.push(i3);
                    }

                  });
                }

                r2[k2] = i2;

              });

            }

            ret[k] = item;

          });

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

        $scope.editTest = function(scope, testName, desc) {
          $scope.objectInEdition = {
            testName: testName,
            description: desc
          }

					scope.editingTest = true;
        };

				$scope.editStep = function(scope) {
					scope.editingStep = true;
				}

        $scope.cancelEditingTest = function(scope, tstName, desc) {
          $scope.basicList[$scope.objectInEdition.testName].testName = $scope.objectInEdition.testName;
          $scope.basicList[$scope.objectInEdition.testName].values.description = $scope.objectInEdition.testName;

          $scope.objectInEdition = {}

          scope.editingTest = false;
        };

        $scope.saveTest = function(scope) {
          $scope.objectInEdition = {}
					$scope.$emit('event:basic-editor-parsed', $scope.basicList);
					scope.editingTest = false;
        };

      })();
    });
})();
