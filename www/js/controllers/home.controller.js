(function() {
  'use strict';

  angular
  .module('scoobydoo')

  .controller('HomeCtrl', HomeCtrl)

  HomeCtrl.$inject = ['$scope', '$ionicModal', '$cordovaSQLite', '$ionicPlatform', 'HomeService', 'DataService'];

  function HomeCtrl($scope, $ionicModal, $cordovaSQLite, $ionicPlatform) {
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

    var db = null;
    $ionicPlatform.ready(function() {
      try {
        db = $cordovaSQLite.openDB({name:"nextflow.db",iosDatabaseLocation: 'Library'});
      } catch (error) {
        alert(error);
      }
    })
    $scope.save = function(newMessage) {

        // execute INSERT statement with parameter
        $cordovaSQLite.execute(db, 'INSERT INTO Messages (message) VALUES (?)', [newMessage])
            .then(function(result) {
                $scope.statusMessage = "Message saved successful, cheers!";
            }, function(error) {
                $scope.statusMessage = "Error on saving: " + error.message;
            })

    }

    $scope.load = function() {
        // Execute SELECT statement to load message from database.
        $cordovaSQLite.execute(db, 'SELECT * FROM Messages ORDER BY id DESC')
            .then(
                function(res) {

                    if (res.rows.length > 0) {
                        $scope.newMessage = res.rows.item(0).message;
                        $scope.statusMessage = "Message loaded successful, cheers!";
                        console.log("SELECTED -> " + res.rows.item(0).message);
                    }
                },
                function(error) {
                    $scope.statusMessage = "Error on loading: " + error.message;
                }
            );
    }

    // $scope.createNewTask = function(db) {
    //   console.log('yes!');
    //   db.executeSql('INSERT INTO tasks VALUES (task_name, task_description)' ['Dexcom Sensor', 'dexcom decription'], function(resultSet) {
    //     console.log('resultSet.insertId: ' + resultSet.insertId);
    //     console.log('resultSet.rowsAffected: ' + resultSet.rowsAffected);
    //   }, function(error) {
    //     console.log('SELECT error: ' + error.message);
    //   });
    //   // console.log(db.tasks);
    // }
  }
})();
