(function() {
  'use strict';
  var db;
  angular
    .module('scoobydoo')
      .controller('DataCtrl', DataCtrl)

  DataCtrl.$inject = ['$scope', '$ionicPlatform', '$cordovaEmailComposer', '$cordovaSQLite']

  function DataCtrl($scope, $ionicPlatform, $cordovaEmailComposer, $cordovaSQLite) {
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
                console.log(res.rows.item(i).item_name);
              }
            }
          })

      } catch (error) {
        alert(error);
      }
      // $cordovaEmailComposer.isAvailable().then(function() {
      //    // is available
      //    alert("available");
      //  }, function () {
      //    // not available
      //    alert("not available");
      //  });
       $scope.sendEmail = function(){
         console.log('email button pressed')
        var email = {
           to: 'teste@example.com',
           attachments: [],
           subject: 'Mail subject',
           body: 'How are you? Nice greetings from Leipzig',
           isHtml: true
        };

       $cordovaEmailComposer.open(email).then(null, function () {
         // user cancelled email
        });
       }
    })
        // $timeout(function() {}, 1000);
        $scope.createDataDump = function() {
          // $cordovaSQLite.execute(db, "SELECT tbl_name FROM sqlite_master WHERE type = 'table' AND tbl_name not like 'sqlite_%'")
          // .then(
          //   function(res) {
          //     console.log('success!');
          //     if(res.rows.length > 0) {
          //       $scope.sqlTables = [];
          //       for (var i = 0; i < res.rows.length; i++) {
          //         if (res.rows.item(i).tbl_name) {
          //           $scope.sqlTables.push(res.rows.item(i).tbl_name);
          //           console.log(res.rows.item(i).tbl_name);
          //         } else {
          //           return;
          //         }
          //       }
          //     } else {
          //       return;
          //     }
          //   },
          //   function(error) {
          //     console.log('error ' + error.message );
          //   }
          // );
          $cordovaSQLite.execute(db, "SELECT tbl_name FROM sqlite_master WHERE tbl_name = 'Items'")
          .then(
            function(res) {
              console.log('success!');
              if(res.rows.length > 0) {
                $scope.sqlTables = [];
                for (var i = 0; i < res.rows.length; i++) {
                  if (res.rows.item(i).tbl_name) {
                    $scope.sqlTables.push(res.rows.item(i).tbl_name);
                    console.log(res.rows.item(i).tbl_name);
                  } else {
                    return;
                  }
                }
              } else {
                return;
              }
            },
            function(error) {
              console.log('error ' + error.message );
            }
          );
          var TS;
          $cordovaSQLite.execute(db, TS="SELECT tbl_name FROM sqlite_master WHERE tbl_name = 'Items'")



        }
  }

})();
