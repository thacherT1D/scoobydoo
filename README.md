Trackee v.ScoobyDoo
=====================

<h3>TrackEE. <small>Track Everything Else</small></h3>
<h3><small>Helping you track more and worry less.</small></h3>
  <p><strong>Built by a patient for other patients and caregivers.</strong></p>
  <p>We all know the feeling -- taking inventory of supplies and you can't quite remember how many of everything you actually have been using... is it time for a reorder? How much do I need to keep on hand for an emergency? To pack for a trip? Trackee was built to answer these questions</p>
  <p><strong>Key Features</strong></p>
  <ul>
    <li>- Easy to use</li>
    <li>- Simple Setup</li>
    <li>- Data can be exported OUT of the app for use and analysis with other applications by your or your doctor</li>
  </ul>



  ####Answers I wish I had to questions I did have:
  Ionic App opens in simulator, but not on the device -- all script tags must have "https://" in front of them not just "//"


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

    
