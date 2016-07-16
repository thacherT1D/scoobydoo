(function() {
  'use strict';
  var db;
  angular
  .module('trackee')
  .controller('DataCtrl', DataCtrl)

  DataCtrl.$inject = ['$scope', '$ionicPlatform', '$cordovaEmailComposer', '$cordovaSQLite']

  function DataCtrl($scope, $ionicPlatform, $cordovaEmailComposer, $cordovaSQLite) {
    $ionicPlatform.ready(function() {
      try {
        db = $cordovaSQLite.openDB({name:"trackee.db",iosDatabaseLocation: 'Library'});
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
          var email = {
            to: '',
            attachments: [],
            subject: 'Your trackEE Data',
            body: 'Find your trackEE data attached.',
            isHtml: true
          };

          $cordovaEmailComposer.open(email).then(null, function () {
            // user cancelled email
          });
        }
      })
    }
  })();
