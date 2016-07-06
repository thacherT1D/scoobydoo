(function() {
  'use strict';

  angular
  .module('scoobydoo')

  .controller('HomeCtrl', function($scope, $ionicModal) {
    $scope.add = {};
    $scope.item = {};
    $scope.event = {};
    $scope.items = [
        {
          title: 'Change Dexcom Sensor',
          description: 'Should last 7+ days',
          date: "2016-05-06T22:27:48.035Z",
          events: ["2016-05-16T22:27:48.035Z", "2016-05-06T22:27:48.035Z"],
          notes: 'Should last 7+ days'
        },
        {
          title: 'Change OmniPod Pod',
          description: 'Should last 3 days, can stretch an additional 8 hrs',
          date: "2016-05-06T22:27:48.035Z",
          events: [],
          notes: 'Should last 3 days, can stretch an additional 8 hrs'
        }
      ];
    $scope.add.addItem = function() {
      $scope.items.push({
        title: $scope.item.title,
        description: $scope.item.description,
        date: 0,
        events: []
      });
      $scope.item = {};
    };
    $scope.doIt = function(item) {
      item.events.splice(0,0,new Date);
      item.date = new Date;
    };
    $scope.toggleHistory = function(item) {
      if(item.showEventList == true) {
        item.showEventList = false;
      } else {
        item.showEventList = true;
      }
    };
    $scope.deleteItem = function(item) {
      $scope.items.splice($scope.items.indexOf(item),1);
    };
    //Modal
    $ionicModal.fromTemplateUrl('new-item.html', function(modal) {
      $scope.itemModal = modal;
    }, {
      scope: $scope
    });
    $scope.createItem = function(item) {
      if(!item) {
        return;
      }
      $scope.items.push({
        title: item.title,
        description: item.description,
        date: 0,
        events: []
      });
      $scope.itemModal.hide();
      item.title = "";
      item.description = "";
    };
    $scope.newItem = function() {
      $scope.itemModal.show();
    };
    $scope.closeNewItem = function() {
      $scope.itemModal.hide();
    };
  })
})();
