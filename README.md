# CMPT350

Repository for Web Development

Assignments are listed in order of what I think is practical.

To run projects 2 through 4, 
1) install required dependencies with 'npm i'
2) run 'node index.js' from the command line
3) go to 'localhost:[portNo]' in a browser, where [portNo] is 3000 for a2, a3, and a4.

### Project - A Very Basic Date Scheduler
For this class, I wanted to make a project using one of Google's APIs and I wanted to do something with geolocation. So I made this very basic date scheduler using the Google Maps and Places APIs. What the app does is it allows a user to sign in, click certain buttons to see which shops/movie theaters/etc. are open right now, add some of those items to a list, and send that list to another user.

### Assignment 4 - A Simple Messageboard Conencts to a SQL Database, but in JQuery Mobile
An exact copy of Assignment 3, but the front end utilizes JQuery Mobile. 

### Assignment 3 - A Simple Messageboard Connects to a SQL Database
Similar to Assignment 2 (but significantly better), this is a simple messageboard that allows the user to create messageboards and post to them. A user may delete previously created messageboards, which deletes all associated messages. The latest post made by a user in a single session (w/o reloading the webpage) is displayed at the top, and on load the board select menu displays the messageboards in order of popularity (that is, number of messages). It also makes use of authorization, using the express-basic-auth middleware (so base64 encoding), which is just hard coded in for convenience's sake. 

This project delved into SQL databases, which I found very intuitive to use. The front end utilized axios, a Promise based HTTP client for node, which was excellent to use. GET, POST, and DELETE was all the functionality I had to use for this project, all of which was very simple.

The project uses nodejs, sqlite3, axios, express, and +express-basic-auth.

### Assignment 2 - A Simple Messageboard using AJAX and DOM Tree Manipulation

This assignment covers building a (very) simple messageboard. The project allows the user to create a new messageboard by giving it a name, and then a user can post to the created messageboards. Messages will remain associated with whatever messageboard they were originally posted in.

I decided to switch to JavaScript here instead of sticking with Java like many others in the class. I wasn't appreciating Java servlets, thought they were more difficult to use, and didn't have the versatility JS could offer me. This assignment was particualarly frustrating, which explains the lengthy series of commits, because of certain restrictions placed on it, and because of the amount of learning I had to do from scratch (JSON, http, basically everything about JavaScript, nodejs, and expressjs), but it was a great learning experience and I'm appreciative of that.

The project uses nodejs and expressjs.

### Assignemnt 1 - A Simple HTTP Webserver

First assignment for 350. This is a simple server in java that connects to port 80 (localhost). Initially, when connected to localhost it displays a hyperlink that says 'hello', linking to the usask homepage. A user can also use the commands 'echo' and 'log' (by typing localhost/echo or localhost/log), which display page info or a log of all commands entered, respectively. If a user tries to navigate to a page that does not exist, such as localhost/this_page_does_not_exist_sorry, it will display a plaintext 404 error.
