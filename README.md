# YouNow Extension Script
<center><h2>Installation</h2></center>
1. Add the browser Add-On <a href="http://lmgtfy.com/?q=tampermonkey">Tampermonkey</a> to your browser.<br>
2. Add this script.

<center><h2>Features</h2></center>
<h4>Mirror Button</h4>
Use the mirror button to mirror the video stream.

<img src="https://github.com/Eddcapone/younow_extension/blob/master/images/mirror.JPG?raw=true">

<h4>Dark Theme</h4>
Adds a button to the top left at younow which allows the user to switch between the original younow theme and a dark theme.

<img src="https://raw.githubusercontent.com/Eddcapone/younow_extension/master/images/example.png">

<b>Note:</b> Does still need improvement and does not fully support the website because younow changed their CSS a while ago.

<h4>Rotate Buttons:</h4>
Streamers are sometimes streaming with their camera or smartphone rotated, e.g. because they have to charge the smartphone.
This extension adds two buttons above the video which allows you to rotate the video.

<img src="https://raw.githubusercontent.com/Eddcapone/younow_extension/master/images/example2.png">

<h4>Ban user or pic</h4>
<b>Hide annoying users in the chat</b> (Only for advanced users)

You can hide people in the chat completly or just hide their profile picture if it is annoying.
The integrated block function from younow is a joke and only enables streamers to ban people,
however, if you are watching a stream and block an annoying user, then you can still see his messages and interact with him,
even though you blocked him. Blocking will just ban people from your own stream.

<b>How to block users:</b>
  
  At the top at the page (line 35) you will find an array called "ban"
  
  <pre>
  <code>
  var ban = [
    {username: "Blitzlicht", onlyRemovePicture: true},
  ];
  </code>
  </pre>
  
  You can see it already contains an object of a user. It is a user with a really annoying flashing profile picture.
  
  <br><code>{username: "Blitzlicht", onlyRemovePicture: true},</code></br>
  
  just duplicate this line and use it as template
  for the user you want to block, just enter his exact username (case-sensitive!) to username like shown below:
  
  <pre>
  <code>
  var ban = [
    {username: "Blitzlicht", onlyRemovePicture: true},
    {username: "AngryLord", onlyRemovePicture: false},
  ];
  </code>
  </pre>
  
  <b>Ban profile picture only:</b>
  
  If you would like to only block someones profile picture, then set <code>onlyRemovePicture</code> to <code>true</code>
  
  <b>Ban user and message:</b>
  
  If you like to completly ban a user, then set <code>onlyRemovePicture</code> to <code>false</code>
  
  Now save the script and reload the younow page.
  
  <b>Note</b>: Unfortunatelly I found no other way yet to solve this problem at the moment, since we cannot use webstorage with tampermonkey afaik. I plan to add a button at the report button which will make the array entry automatically, but therefore I need to store the array permanently by using webstorage after it gets properly implementet to tampermonkey. Maybe I could also store the array serialized in a cookie. I will give it a try as soon as I have time.
  
  
