(function() {
  'use strict'
  var db;
  angular
  .module('trackee', ['ionic', 'ngCordova'])
  .config(routeHandler)
  .run(runBlock);

  routeHandler.$inject = ['$stateProvider', '$urlRouterProvider'];
  runBlock.$inject = ['$ionicPlatform', '$cordovaSQLite'];

  function routeHandler($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/app/tasks')
    $stateProvider
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'TaskCtrl'
    })
    .state('app.about', {
      url: '/about',
      views: {
        'menuContent': {
          templateUrl: 'templates/about.html',
          controller: 'TaskCtrl'
        }
      }
    })
    .state('app.exportData', {
      url: '/exportData',
      views: {
        'menuContent': {
          templateUrl: 'templates/exportData.html',
          controller: 'DataCtrl'
        }
      }
    })
    .state('app.tasks', {
      url: '/tasks',
      views: {
        'menuContent': {
          templateUrl: 'templates/tasks.html',
          controller: 'TaskCtrl'

        }
      }
    })
  }

    function runBlock($ionicPlatform, $cordovaSQLite) {
      $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
          StatusBar.styleDefault();
        }

        try {
          db = $cordovaSQLite.openDB({name:"trackee.db",iosDatabaseLocation: 'Library'});
        } catch (error) {
          alert(error);
        }

        $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS Items (item_id INTEGER PRIMARY KEY AUTOINCREMENT, item_name TEXT, item_description TEXT)');

        // ALTER TABLE recipes ADD COLUMN timestamp DATE DEFAULT (datetime('now','localtime'));

//Drop Tables as needed
      // $cordovaSQLite.execute(db, 'DROP TABLE IF EXISTS Items');
      // $cordovaSQLite.execute(db, 'DROP TABLE IF EXISTS ITEM_');

//Seed Data
        // $cordovaSQLite.execute(db, "INSERT INTO Items(item_name, item_description) VALUES ('Change Dexcom Sensor', 'should last 7-10 days')");
        //
        // $cordovaSQLite.execute(db, "INSERT INTO Items(item_name, item_description) VALUES ('New OmniPod', '3 days with 8 hours')");
//Seed Event Data for the about Items
    //ITEM 1 - Dexcom
        // $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS ITEM_1 (event_id INTEGER PRIMARY KEY AUTOINCREMENT, item_id INTEGER, event_timeStamp DATETIME)');
        // $cordovaSQLite.execute(db, "INSERT INTO ITEM_1 (item_id, event_timeStamp) VALUES (1, DateTime('now'))");
        // $cordovaSQLite.execute(db, "INSERT INTO ITEM_1 (item_id, event_timeStamp) VALUES (1, DateTime('now'))");

      });
    }
  })();
