(function () {
  'use strict';

  // Shoppinglists controller
  angular
    .module('shoppinglists')
    .controller('ShoppinglistsController', ShoppinglistsController);

  ShoppinglistsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'shoppinglistResolve'];

  function ShoppinglistsController ($scope, $state, $window, Authentication, shoppinglist) {
    var vm = this;

    vm.authentication = Authentication;
    vm.shoppinglist = shoppinglist;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.removeItem = removeItem;
    vm.deleteChecked = deleteChecked;
    vm.save = save;
    vm.addItem = addItem;
    vm.items = [];
    // vm.listColor = '#000000';
    // Remove existing Shoppinglist

    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.shoppinglist.$remove($state.go('shoppinglists.list'));
      }
    }

    function addItem() {
      vm.items = vm.shoppinglist.items;
      vm.items.push({
        name: vm.name,
        quantity: vm.quantity,
        priority: vm.priority,
        isChecked: vm.isChecked
      });

      vm.name = '';
      vm.quantity = '';
      vm.priority = '';
      vm.isChecked = false;
    }

    function removeItem(item) {
      vm.items = vm.shoppinglist.items;
      var itemToDelete = vm.items.indexOf(item);
      vm.items.splice(itemToDelete, 1);
    }

    function deleteChecked() {
      vm.items = vm.shoppinglist.items;
      for (var i = 0; i < vm.items.length; i++) {
        if (vm.items[i].isChecked) {
          console.log(vm.items[i]);
          vm.items.splice(i,1);
        }
      }
    }

    // Save Shoppinglist
    function save(isValid) {
      vm.shoppinglist.items = vm.items;
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.shoppinglistForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.shoppinglist._id) {
        vm.shoppinglist.items = vm.items;

        vm.shoppinglist.$update(successCallback, errorCallback);
      } else {
        vm.shoppinglist.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('shoppinglists.view', {
          shoppinglistId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
