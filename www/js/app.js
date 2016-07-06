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
              controller: 'HomeCtrl as ctrl'
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
          db = $cordovaSQLite.openDB({name:"nextflow.db",iosDatabaseLocation: 'Library'});
        } catch (error) {
          alert(error);
        }

        $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS Messages (id INTEGER PRIMARY KEY AUTOINCREMENT, message TEXT)');

        console.log('working');

        // db = $cordovaSQLite.openDB({name: 'scooby.db', iosDatabaseLocation: 'Library'});
        // $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS tasks (task_id integer primary key AUTOINCREMENT, task_name text, task_description text)");
        //
        // db.executeSql('INSERT INTO tasks VALUES (?)', ['Dexcom Sensor'],['dexcom decription'], function(resultSet) {
        //   console.log(db.tasks);
        //   console.log('resultSet.insertId: ' + resultSet.insertId);
        //   console.log('resultSet.rowsAffected: ' + resultSet.rowsAffected);
        // }, function(error) {
        //   console.log('SELECT error: ' + error.message);
        // });
        //
        // db.executeSql("SELECT LENGTH('tenletters') AS stringlength", [], function (resultSet) {
        //   console.log('got stringlength: ' + resultSet.rows.item(0).stringlength);
        // }, function(error) {
        //   console.log('SELECT error: ' + error.message);
        // });

      });


    }




})();
