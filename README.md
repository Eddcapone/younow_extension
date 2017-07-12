# YouNow Extension Script
<center><h2>Features</h2></center>
<b>Dark Theme</b>
This script adds a button to the top left at younow which allows the user to switch between the original younow theme and a dark theme.

<img src="https://raw.githubusercontent.com/Eddcapone/younow_extension/master/images/example1.png">
<img src="https://raw.githubusercontent.com/Eddcapone/younow_extension/master/images/example2.png">


<b>Rotate Buttons:</b>
It happens often that streamers are streaming with their camera or smartphone rotated, e.g. because they have to charge the smartphone.
This extension adds two buttons above the video which allows you to rotate the video.

<img src="https://raw.githubusercontent.com/Eddcapone/younow_extension/master/images/example2.png">

<h3>How To</h3>
<b>Hide annoying users in the chat (Only for advanced users)</b>

You can hide people in the chat completly or just hide their profile picture if it is annoying.
The integrated block function from younow is a joke and only enables streamers to block people in the chat,
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
  <code>{username: "Blitzlicht", onlyRemovePicture: true},</code> just duplicate this line and use it as template
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
  
  
