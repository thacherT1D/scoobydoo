Trackee version: scoobydoo
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

  Building this project
=====================

Make sure the `ionic` utility is installed:
```bash
$ npm install -g ionic
```
Make sure the `cordova` is installed:
npm install -g cordova OR check version (cordova -v)

ionic start [app_name] [ionic starter type: blank, tabs, or sidemenu]

cd [app_name]

open the js/app.js file:
add `window.cordova.plugins &&` to the run block, so your full run block in your app.js file looks like this:
```
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
```
npm init -y

git init
touch .gitignore
bower install ngCordova
+ add ngCordva script to index.html file above the cordova.js
<script src="lib/ngCordova/dist/ng-cordova.js"></script>



cordova plugin add (see docs for .git addresses)
SQLite: cordova plugin add https://github.com/litehelpers/Cordova-sqlite-storage.git
EmailComposerL cordova plugin add https://github.com/katzer/cordova-plugin-email-composer.git

npm install moment --save #momentjs
+ add script to index.html file
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.9.0/moment.min.js"></script>

npm install angular-momentjs --save #angular-moment
+ add script to index.html file
<script src="http://cdnjs.cloudflare.com/ajax/libs/angular-moment/0.9.0/angular-moment.min.js"></script>

----
npm install pouchdb --save
+ add script to index.html file

npm install ionic-modal-component
+ add script to index.html file
<script src="dist/ionic-modal-component.js"></script>
