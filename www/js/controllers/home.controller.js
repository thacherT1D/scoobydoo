(function() {
  'use strict';
  var db;

  angular
  .module('scoobydoo')

  .controller('HomeCtrl', HomeCtrl)

  HomeCtrl.$inject = ['$scope', '$ionicModal', '$cordovaSQLite', '$ionicPlatform'];

  function HomeCtrl($scope, $ionicModal, $cordovaSQLite, $ionicPlatform) {
    $scope.item = {};

    $scope.toggleHistory = function(item) {
      if(item.showEventList == true) {
        item.showEventList = false;
      } else {
        item.showEventList = true;
      }
    };
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
    };

    $scope.closeNewItem = function() {
      $scope.itemModal.hide();
    };

    $scope.loadItems = function() {
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
          console.log('error ' + error.message );
        }
      );
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

      $scope.addItem = function(newitem_name, newitem_description) {
        $cordovaSQLite.execute(db, 'INSERT INTO Items (item_name, item_description) VALUES (?,?)', [newitem_name, newitem_description])
        .then(function(res) {
          console.log('saved');
        }, function(error) {
          console.log('error ' + error.message );
        });
      }

        $scope.addEvent = function() {
          $cordovaSQLite.execute(db, 'INSERT INTO Events (event_note) VALUES (?)', [event_note])
          .then(function(res) {
            console.log('event_note saved');
          }, function(error) {
            console.log('error ' + error.message );
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
            console.log('error ' + error.message );
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
            console.log('error ' + error.message );
          }
        );
      }
    }

  })();
