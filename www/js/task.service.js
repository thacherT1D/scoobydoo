(function() {
  'use strict';

  angular
    .module('trackee')
    .service('HomeService', HomeService);

    // HomeService.$inject = ['$ionicModal', '$cordovaSQLite', '$ionicPlatform'];

    function HomeService($cordovaSQLite, $ionicPlatform) {

    $ionicPlatform.ready(function() {
      try {
        db = $cordovaSQLite.openDB({name:"trackee.db",iosDatabaseLocation: 'Library'});
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
          })
      } catch (error) {
        alert(error);
      }
    })
    return {
      printAThing: function() {
        console.log("I printed a thing")
      },
      getSomeThings: function() {
        $cordovaSQLite.execute(db, 'SELECT * FROM Items ORDER BY item_id DESC')
            .then(
              console.log('got a thing')
            );
      },
      loadItems: function() {
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
  }
})();
