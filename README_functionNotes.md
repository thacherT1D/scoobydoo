
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

  // $scope.statusMessage = "Message loaded successful, cheers!";
  // console.log("SELECTED -> " + res.rows.item(0).item_id + " item Name: " + res.rows.item(0).item_name + " item Desc: " + res.rows.item(0).item_description);

  #### Put into home.controller.js in the ```$ionicPlatform.ready(function() {``` section

  $cordovaSQLite.execute(db, "SELECT tbl_name FROM sqlite_master WHERE type = 'table'")
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

    ###Load Items function from home.controller.js
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
    ###Delete Events Table function for when there is a single events table
    $scope.deleteEvent = function(event) {
      var event_query = "DELETE FROM Events WHERE event_id =" + event.event_id;
      console.log(event_query);
      $cordovaSQLite.execute(db, event_query);

      $cordovaSQLite.execute(db, 'SELECT * FROM Events ORDER BY event_id DESC')
      .then(
        function(res) {
          if (res.rows.length > 0) {
            $scope.events = [];
            for(var i=0;i<res.rows.length -1; i++) {
              $scope.events.push({
                event_id: res.rows.item(i).event_id,
                event_timeStamp: res.rows.item(i).event_timeStamp,
                event_note: res.rows.item(i).event_note
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


  #### Show history function
  // $scope.showHistory = function(item) {
  //   $cordovaSQLite.execute(db, 'SELECT * FROM ITEM_' + item.item_id)
  //     .then(
  //       function(res) {
  //         var currentEvent = 'event_' + item.item_id;
  //         if(res.rows.length > 0) {
  //           item.currentEvent = [];
  //           // console.log(item.currentEvent);
  //           for(var i=0;i<res.rows.length-1; i++) {
  //             item.currentEvent.push({
  //               event_id: res.rows.item(i).event_id,
  //               item_id: res.rows.item(i).item_id,
  //               event_timeStamp: res.rows.item(i).event_timeStamp
  //             })
  //           }
  //         }
  //       }, function (error) {
  //         console.log('error ' + error.message);
  //       }
  //     );
  // }

  ### Delete Everything from Items table function
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
