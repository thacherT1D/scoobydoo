(function() {
  'use strict';

  angular
    .module('scoobydoo')
      .controller('DataCtrl', DataCtrl)

  DataCtrl.$inject = ['$cordovaEmailComposer']

  function DataCtrl($cordovaEmailComposer) {
    var ctrl = this;

    // var email = {
    //   to: 'thachert1d@gmail.com',
    //   subject: 'Does this work?',
    //   body: 'what up?',
    //   isHTML: true
    // };
    //
    // ctrl.sendEmail = function($cordovaEmailComposer) {
    //
    // }

  }
})();
