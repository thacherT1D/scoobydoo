(function() {
  'use strict';

  angular
    .module('scoobydoo')
    .factory('HomeService', HomeService);

    HomeService.$inject = ['$ionicModal', '$cordovaSQLite', '$ionicPlatform', 'DataService'];

  function HomeService($scope, $ionicModal, $cordovaSQLite, $ionicPlatform) {
    var db = null;

    return {
      printAThing: function() {
        console.log("I printed a thing")
      },
      getSomeThings: function() {
        $cordovaSQLite.execute(db, 'SELECT * FROM Items ORDER BY item_id DESC')
            .then(
              console.log('got a thing')
            );
      }
    }
  }
})();
