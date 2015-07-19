var app = angular.module('toDoApp', []);

app.controller('toDoController', ['$scope', function($scope) {

    $scope.tasks = [];
    $scope.completed = [];
    $scope.newTaskName = '';

    $scope.addTask = function() {
      var name = $scope.newTaskName;
      if (name && $scope.tasks.indexOf(name) == -1 && $scope.completed.indexOf(name)) {
        $scope.tasks.push(name);
        $scope.newTaskName = '';
      }
    };

    $scope.transferToCompleted = function(index, start, end) {
      end.push(start[index]);
      start.splice(index, 1);
    }

    $scope.deleteTask = function(task) {
      var index = $scope.tasks.indexOf(task);
      $scope.tasks.splice(index, 1);
    }

}]);

app.directive('editInPlace', function() {
  return {
    restrict: 'E',
    scope: { value: '=', list: '=' }, //2 way binding
    template: '<span ng-click="edit()" ng-bind="value"></span><input ng-model="value"></input>',
    link: function ( $scope, element, attrs ) {
      // Let's get a reference to the input element, as we'll want to reference it.
      var inputElement = angular.element( element.children()[1] );
      // index for changing the parent array
      var index;
      element.addClass( 'edit-in-place' );
      $scope.editing = false;
      
      // ng-click handler to activate edit-in-place
      $scope.edit = function () {
        $scope.editing = true;
        element.addClass( 'active' );
        inputElement[0].focus();
        index = $scope.list.indexOf(inputElement[0].value);
      };

      // When we press enter or on blur, we're done editing.
      inputElement.on('keypress onblur', function(e) {
          var code = e.keyCode || e.which;
          if(code == 13) {
            $scope.editing = false;
            element.removeClass('active');
            $scope.list[index] = inputElement[0].value;             
          }
      });
    }
  };
});
