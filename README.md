# CMPT350


== Assignemnt 1 - A Simple HTTP Webserver == 
First assignment for 350. This is a simple server in java 
that connects to port 80 (localhost). Initially, when connected 
to localhost it displays a hyperlink that says 'hello', linking to 
the usask homepage. A user can also use the commands 'echo' and 'log' 
(by typing localhost/echo or localhost/log), which display page info 
or a log of all commands entered, respectively. If a user tries to 
navigate to a page that does not exist, such as 
localhost/this_page_does_not_exist_sorry, it will display a plaintext
404 error.
