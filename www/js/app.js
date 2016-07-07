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

    function runBlock($ionicPlatform, $cordovaSQLite, $timeout) {
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

        $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS Events (event_id INTEGER PRIMARY KEY AUTOINCREMENT, event_timeStamp TIMESTAMP, item_id)');
      });
    }
  })();
