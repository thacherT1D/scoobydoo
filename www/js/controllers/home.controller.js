(function() {
  'use strict';
  var db;

  angular
  .module('scoobydoo')

  .controller('HomeCtrl', HomeCtrl)

  HomeCtrl.$inject = ['$scope', '$ionicModal', '$cordovaSQLite', '$ionicPlatform'];

  function HomeCtrl($scope, $ionicModal, $cordovaSQLite, $ionicPlatform) {
    $scope.item = {};
    $scope.events = [];

    // Attempts at Services
    // $scope.printAThing = function() {
    //   HomeService.printAThing();
    // };
    // $scope.loadItems = function() {
    //   HomeService.loadItems();
    // }
    // $scope.getSomeThings = function() {
    //   HomeService.getSomeThings();
    // }

    //start of initalization for SQLite

    $ionicPlatform.ready(function() {
      try {
        db = $cordovaSQLite.openDB({name:"scoobydoo.db",iosDatabaseLocation: 'Library'});
        $cordovaSQLite.execute(db, 'SELECT * FROM Items ORDER BY item_id DESC')
        .then(
          //Loads the List of Items when the app first loads
          function(res) {
            if (res.rows.length > 0) {
              $scope.items = [];
              for(var i=0;i<res.rows.length -1; i++) {
                $scope.items.push({
                  item_id: res.rows.item(i).item_id,
                  item_name: res.rows.item(i).item_name,
                  item_description: res.rows.item(i).item_description
                })
              }
            }
          })

      } catch (error) {
        alert(error);
      }
    })

    $ionicModal.fromTemplateUrl('new-item.html', function(modal) {
      $scope.itemModal = modal;
    }, {
      scope: $scope
    });

    $scope.newItem = function() {
      $scope.itemModal.show();
    }

    $scope.closeNewItem = function() {
      $scope.itemModal.hide();
    }

    $scope.toggleHistory = function(item) {
      if(item.showEventList == true) {
        item.showEventList = false;
      } else {
        item.showEventList = true;
      }
    }

    $scope.deleteEverything = function() {
      $cordovaSQLite.execute(db, 'DELETE FROM Items')
      .then(
        function(res) {
          console.log('you deleted everything?!');
        },
        function(error) {
          console.log('What is your problem??? oh yeah, this is your problem  ' + error.message);
        });
      }

      $scope.addEvent = function(item) {
        // create event table for each new item
        var newEventTablePerItemQuery = "CREATE TABLE IF NOT EXISTS ITEM_" + item.item_id + "(event_id INTEGER PRIMARY KEY AUTOINCREMENT, item_id INTEGER, event_timeStamp DATETIME)";
        $cordovaSQLite.execute(db, newEventTablePerItemQuery)

        var addNewEventInstanceQuery = ("INSERT INTO ITEM_"
          + item.item_id
          + " (item_id, event_timeStamp) VALUES ("
          + item.item_id
          + ", DateTime('now'))"
        );

        $cordovaSQLite.execute(db, addNewEventInstanceQuery)

        $cordovaSQLite.execute(db, 'SELECT * FROM ITEM_' + item.item_id)
          .then(
            function(res) {
              if(res.rows.length > 0) {
                var currentEvent = 'event' + item.item_id;
                $scope.currentEvent = [];
                for(var i=0;i<res.rows.length-1; i++) {
                  $scope.currentEvent.push({
                    event_id: res.rows.item(i).event_id,
                    item_id: res.rows.item(i).item_id,
                    event_timeStamp: res.rows.item(i).event_timeStamp
                  })
                  console.log(res.rows.item(i).event_id);
                  console.log(res.rows.item(i).item_id);
                  console.log(res.rows.item(i).event_timeStamp);
                }
              }
            }, function (error) {
              console.log('error ' + error.message);
            }
          );
      }

      $scope.addItem = function(newitem_name, newitem_description) {
        $cordovaSQLite.execute(db, 'INSERT INTO Items (item_name, item_description) VALUES (?,?)', [newitem_name, newitem_description])
        .then(function(res) {
          console.log('saved');
        }, function(error) {
          console.log('error ' + error.message);
        });

        $cordovaSQLite.execute(db, 'SELECT * FROM Items ORDER BY item_id DESC')
        .then(
          function(res) {
            if (res.rows.length > 0) {
              $scope.items = [];
              for(var i=0;i<res.rows.length -1; i++) {
                $scope.items.push({
                  item_id: res.rows.item(i).item_id,
                  item_name: res.rows.item(i).item_name,
                  item_description: res.rows.item(i).item_description
                })
              }
            }
          },
          function(error) {
            console.log('error ' + error.message);
          }
        );
        $scope.itemModal.hide();
      }

      $scope.deleteItem = function(item) {
        var query = "DELETE FROM Items WHERE item_id =" + item.item_id;
        $cordovaSQLite.execute(db, query);

        $cordovaSQLite.execute(db, 'SELECT * FROM Items ORDER BY item_id DESC')
        .then(
          function(res) {
            if (res.rows.length > 0) {
              $scope.items = [];
              for(var i=0;i<res.rows.length -1; i++) {
                $scope.items.push({
                  item_id: res.rows.item(i).item_id,
                  item_name: res.rows.item(i).item_name,
                  item_description: res.rows.item(i).item_description
                })
              }
            } else {
              return;
            }
          },
          function(error) {
            console.log('error ' + error.message);
          }
        );
      }
    }
  })();
