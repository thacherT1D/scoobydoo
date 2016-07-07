(function() {
  'use strict';

  angular
  .module('scoobydoo')

  .controller('HomeCtrl', HomeCtrl)

  HomeCtrl.$inject = ['$scope', '$ionicModal', '$cordovaSQLite', '$ionicPlatform', 'HomeService', 'DataService'];

  function HomeCtrl($scope, $ionicModal, $cordovaSQLite, $ionicPlatform, $timeout) {
    $scope.add = {};
    $scope.item = {};
    $scope.event = {};
    // $scope.items = [
    //     {
    //       title: 'Change Dexcom Sensor',
    //       description: 'Should last 7+ days',
    //       date: "2016-05-06T22:27:48.035Z",
    //       events: ["2016-05-16T22:27:48.035Z", "2016-05-06T22:27:48.035Z"],
    //       notes: 'Should last 7+ days'
    //     },
    //     {
    //       title: 'Change OmniPod Pod',
    //       description: 'Should last 3 days, can stretch an additional 8 hrs',
    //       date: "2016-05-06T22:27:48.035Z",
    //       events: [],
    //       notes: 'Should last 3 days, can stretch an additional 8 hrs'
    //     }
    //   ];

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



//start of initalization for SQLite
    var db = null;
    $ionicPlatform.ready(function() {
      try {
        db = $cordovaSQLite.openDB({name:"scoobydoo.db",iosDatabaseLocation: 'Library'});
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
                    $scope.statusMessage = "Error on loading: " + error.message;
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
              $scope.statusMessage = "item saved successful, cheers!";
              $scope.newitem_name = "";

          }, function(error) {
              $scope.statusMessage = "Error on saving: " + error.message;
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

                        // $scope.statusMessage = "Message loaded successful, cheers!";
                        // console.log("SELECTED -> " + res.rows.item(0).item_id + " item Name: " + res.rows.item(0).item_name + " item Desc: " + res.rows.item(0).item_description);

                    }

                },
                function(error) {
                    $scope.statusMessage = "Error on loading: " + error.message;
                }
            );
      console.log('additem running');
      $scope.itemModal.hide();
    }
    $scope.deleteItem = function(item) {
      // $scope.items.splice($scope.items.indexOf(item),1);
      console.log(item.item_id);
      // var x = item.item_id
      var query = "DELETE FROM Items WHERE item_id =" + item.item_id;
      console.log(query);
      $cordovaSQLite.execute(db, query)
        .then(
          function(res) {
            console.log('yes!')
          },
          function(error) {
            console.log('no!')
          }
        );
    }
  }
})();
