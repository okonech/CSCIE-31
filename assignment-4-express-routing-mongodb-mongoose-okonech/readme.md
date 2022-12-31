# Assignment #4 - Express Routing, MongoDB, and Mongoose

The description of this assignment can be found in Canvas at [Assignment #4](https://canvas.harvard.edu/courses/35096/assignments/202461) (Spring 2018)

You should build your application in this repo cloned for you in Github Classroom. You'll submit your project and github URLs in Canvas.


Once Logging in, users can create/read/update/delete decks.
Create is done through the user page,
Read is done by clicking the deck link,
Update is done on the deck page,
Delete is done on the deck page

Mongo stores users and decks.
In the future decks will have a list of cards, and users will have an array of deck object ids.
This model works since usernames are kept unique, but linking by objectid would be preferable.


