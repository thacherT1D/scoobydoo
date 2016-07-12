(function() {
  'use strict';
  var db;
  angular
  .module('scoobydoo')
  .controller('DataCtrl', DataCtrl)

  DataCtrl.$inject = ['$scope', '$ionicPlatform', '$cordovaEmailComposer', '$cordovaSQLite', '$cordovaFile', '$sqliteToJson']

  function DataCtrl($scope, $ionicPlatform, $cordovaEmailComposer, $cordovaSQLite, $cordovaFile, $sqliteToJson) {
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
        $scope.getFreeDiskSpace = function() {

          // $cordovaFile.removeDir(cordova.file.documentsDirectory, 'TestDir1')
          // //(path, directory)
          // .then(function (success) {
          //   // success
          //   console.log('directory removed');
          // }, function (error) {
          //   console.log('error ' + error.message);
          // });

          // console.log('cordova.file.documentsDirectory: ' + cordova.file.documentsDirectory);

          // $cordovaFile.createDir(cordova.file.documentsDirectory, 'TestDir1', false)
          // //(path, directory)
          // .then(function (success) {
          //   // success
          //   console.log('TestDir1 Created');
          // }, function (error) {
          //   console.log('error ' + error.message);
          // });
          var  testdirvar = 'TestDir1'
          var filePath = cordova.file.documentsDirectory + testdirvar;
          console.log(filePath);

          $cordovaFile.checkDir(filePath, "")
          .then(function (success) {
            // success
            console.log("Found Dir1");
          }, function (error) {
            // error
            console.log('Error');
          });

          // $cordovaFile.createFile(filePath, "new_file.txt", true)
          // .then(function (success) {
          //   // success
          //   console.log('created file');
          // }, function (error) {
          //   // error
          //   console.log('Error creating file');
          // });

          $cordovaFile.writeExistingFile(filePath, "new_file.txt", "add this text")
          .then(function (success) {
            // success
            console.log('text added');
          }, function (error) {
            // error
            console.log('Error creating file');
          });

          // var $scope.inputs.readFile = [];
          $cordovaFile.readAsText(filePath, "new_file.txt")
          .then(function (success) {
            // success
            console.log(success);

          }, function (error) {
            // error
            console.log('Error reading');

          });


        }
      })


    }

  })();
