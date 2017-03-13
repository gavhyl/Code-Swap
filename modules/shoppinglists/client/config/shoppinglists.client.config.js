(function () {
  'use strict';

  angular
    .module('shoppinglists')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Shoppinglists',
      state: 'shoppinglists',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'shoppinglists', {
      title: 'List Shoppinglists',
      state: 'shoppinglists.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'shoppinglists', {
      title: 'Create Shoppinglist',
      state: 'shoppinglists.create',
      roles: ['user']
    });
  }
}());
