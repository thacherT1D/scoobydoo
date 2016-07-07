(function() {
  'use strict';

  angular
    .module('scoobydoo')
      .controller('DataCtrl', DataCtrl)

  DataCtrl.$inject = ['$scope', '$ionicPlatform', '$cordovaEmailComposer']

  function DataCtrl($scope, $ionicPlatform, $cordovaEmailComposer) {
    $ionicPlatform.ready(function() {

      $cordovaEmailComposer.isAvailable().then(function() {
         // is available
         alert("available");
       }, function () {
         // not available
         alert("not available");
       });
       $scope.sendEmail = function(){
         console.log('email button pressed')
        var email = {
           to: 'teste@example.com',
           cc: 'teste@example.com',
           bcc: ['john@doe.com', 'jane@doe.com'],
           attachments: [
             'file://img/logo.png',
             'res://icon.png',
             'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
             'file://README.pdf'
           ],
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
  }

})();
