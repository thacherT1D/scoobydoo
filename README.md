Track Everything Else
=====================
<h3><small>Helping you track more and worry less.</small></h3>
  <p><strong>Built by a patient for other patients and caregivers.</strong></p>
  <p>We all know the feeling -- taking inventory of supplies and you can't quite remember how many of everything you actually have been using... is it time for a reorder? How much do I need to keep on hand for an emergency? To pack for a trip? Trackee was built to answer these questions</p>
  <p><strong>Key Features</strong></p>
  <ul>
    <li> Determine your actual wear/use time for anything</li>
    <li> Track tasks or devices with the push of a button</li>
    <li> Simple to setup for as many things as you need</li>
  </ul>

----------------------------------

![application screenshots](https://raw.githubusercontent.com/thacherT1D/trackEE/master/trackEE-screens.png)

----------------------------------

<h4>Retrospective and Next Steps</h4>
This project was built as my capstone project for a six-month full-stack web development program. We had two weeks to design and build a project that demonstrated what we had learned. This app was something that I personally wanted to have to track my own medical devices and felt it would address a need in the patient community.

**Things I did well:**
<ul>
  <li>Conducted Though Pre-Project Research - I reached out to two patient groups to validate my concept and get feedback on priority of features. </li>
  <li>Learned and Implemented Ionic and ngCordova Plugins - using available documentation and stackoverflow/google research, I built a working application based on the initial project design</li>

</ul>

**What I would do differently next time:**
<ul>
  <li>Make key decisions earlier - mobile was the right platform for my project, but we were not taught mobile in this course. I wavered on whether or not to use Ionic or build it as a NEAP app that we were taught. I'm glad I chose Ionic because it better fits the mission of the app, but I could have saved time if I had made that decision sooner</li>
  <li>Design for the best structure - I designed my data as I would have for a PostGres database, while very similar to the ngCordova SQLite plugin, it is not exactly the same. Rather than retrofitting PostGres design, next time I would spend more time understanding and designing in SQLite, even if that meant spending more time in the planning phase.</li>
</ul>

**Next Steps:**
<ul>
  <li>Add feature to exported patient data OUT of the app for use and analysis with other applications by your or your doctor</li>
  <li>Straighten Up SQLite Tables to be more efficient</li>
  <li>Clean up Controllers, Services, and their relationships to work more efficiently </li>
</ul>

----------------------------------

**To view this project locally:**
These steps are approximate -- running ionic locally can be fussy and there may be additional configuration steps for ionic to run on your computer

`git clone https://github.com/thacherT1D/trackEE.git`

`cd trackEE`

`npm install`

To view the project:
- Browser: `ionic serve`
- iOS Simulator: `ionic cordova build ios` then `ionic cordova emulate ios`

Due to the short timeline of this project and the development lag android studio was presenting at the time, testing was only done on iOS.

To run on android, first android studio must be configured and a virtual device added -- with the virtual device open, return to your terminal and enter:
- `ionic cordova build android` then `ionic cordova emulate android`


To open an iOS emulator on an iPhone 8 (and using livereload):
`ionic cordova emulate ios --target="iPhone-8" --livereload`
