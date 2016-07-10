(function() {
  'use strict';
  var db;

  angular
    .module('scoobydoo', ['ionic', 'ngCordova', 'angularMoment'])
    .config(routeHandler)
    .run(runBlock);

    routeHandler.$inject = ['$stateProvider', '$urlRouterProvider'];
    runBlock.$inject = ['$ionicPlatform', '$cordovaSQLite'];

    function routeHandler($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/tab/home')
      $stateProvider
      // setup an abstract state for the tabs directive
        .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })

      // Each tab has its own nav history stack:
      .state('tab.home', {
        url: '/home',
        views: {
          'tab-home': {
            templateUrl: 'templates/tab-home.html',
            controller: 'HomeCtrl as ctrl'
          }
        }
      })

      .state('tab.data', {
          url: '/data',
          views: {
            'tab-data': {
              templateUrl: 'templates/tab-data.html',
              controller: 'DataCtrl as ctrl'
            }
          }
        })

      .state('tab.about', {
        url: '/about',
        views: {
          'tab-about': {
            templateUrl: 'templates/tab-about.html',
            controller: 'AboutCtrl as ctrl'
          }
        }
      })

      .state('tab.sqliteTest', {
        url: '/sqliteTest',
        views: {
          'tab-sqliteTest': {
            templateUrl: 'templates/tab-sqliteTest.html',
            controller: ''
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
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
        }

        try {
          db = $cordovaSQLite.openDB({name:"scoobydoo.db",iosDatabaseLocation: 'Library'});
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
        // $cordovaSQLite.execute(db, "INSERT INTO ITEM_1 (item_id, event_timeStamp) VALUES (1, DateTime('now'))"
        // $cordovaSQLite.execute(db, "INSERT INTO ITEM_1 (item_id, event_timeStamp) VALUES (1, DateTime('now'))"

      });
    }
  })();
