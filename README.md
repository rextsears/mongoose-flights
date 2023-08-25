# Mongoose “Flights” Lab - Part 1

## Intro

Today in the Intro to Mongoose lesson you Created and Read documents using a Movie Model.

In this lab, you’ll do the same, except you’ll create and use a Flight model.

You’ll begin by creating a mongoose-flights project.

FYI, future lessons will expand upon the mongoose-movies project, and the labs will expand upon the mongoose-flights project!

The final version of mongoose-flights (parts 1 thru 3 combined) will be a deliverable, so do each part and don’t fall behind.

## Exercises

1. Refer to the Express Routers and Controllers lesson as necessary on how to use Express Generator to set up a new Express project named mongoose-flights.

### Hint: Don’t forget the -e option to ensure that EJS templating is configured.

2. Be sure to install the Node modules after you cd into the project.

3. Rename app.js to server.js and make the necessary change inside of bin/www.

4. Install the dotenv module and

 // server.js

 var logger = require('morgan');
 // Add the line below
 require('dotenv').config();

5. Create a .env file in the root of the project file.

6. Copy your DATABASE_URL=... from your .env file in mongoose-movies and change the name of the database to something like flights.

7. Create a config/database.js module that connects to a database.

8. Be sure to require the config/database.js AFTER dotenv in server.js.

9. Verify that starting the Express server with nodemon console.logs out a successful connection to the database.

10. Set up partial templates.

### Hint: Reference the EJS Partial Templates lesson as needed.

11. Create a Flight Model with the following properties:

Property	Type	Validations	Default Value
airline	String	enum to include ‘American’, ‘Southwest’ & ‘United’
(or your choices)	n/a
airport	String	enum to include
‘AUS’, ‘DFW’, ‘DEN’, ‘LAX’ & ‘SAN’
(or your choices)	‘DEN’
(or your choice)
flightNo	Number	Required
Between 10 and 9999	n/a
departs	Date	n/a	One year from date created

12. Implement the following User Stories:

### AAU, I want to view a list of all flights (index functionality) that displays each flight’s airline, airport, flight no., and departure date/time (consider formatting the departs property).

### AAU, I want to create flights by entering the information on a page (new functionality) that has a form and submitting it.

### AAU, I want to be able to access each view via a navigation bar at the top of the page with links to:

ALL FLIGHTS, and
ADD FLIGHT
Hints:
Checkout the <input type="datetime-local"> to assist users in entering valid date/time values.

In the form for adding a new Flight, use a <select name="airport"> to assign the flight’s airport. Since they don’t change, it’s okay to hard-code the <option> elements, e.g., <option value="DEN" selected>. Same for the airline property (use a <select>).

## Bonuses
Display the default departure date when displaying the new flight form.

## Hints:

In the flight controller’s new action, you could create an in-memory flight like this:
const newFlight = new Flight();
This in-memory flight doc would have the default departure date set properly based on the logic in the function you assigned to default.
Just like any other data you want to access/display in a view template, that data needs to be passed by the controller action when it calls res.render, however…
Although an input of type="datetime-local" will display a date assigned to its value attribute, that date value needs to be formatted as a string matching this format: yyyy-MM-ddThh:mm (yes, a “T” character is used to separate the date portion from the time portion). One way of obtaining the properly formatted string is to use the following approach:
const newFlight = new Flight();
// Obtain the default date
const dt = newFlight.departs;
// Format the date for the value attribute of the input
let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
departsDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
res.render('flights/new', { departsDate });
Code these additional User Stories:
AAU, I want to view the list of flights by departure date in ascending order.

AAU, I want the flights in the list to be displayed using red text if the flight’s departure date has passed.

Style the index and new views.


# Mongoose “Flights” Lab - Part 2

## Intro

Today in the Mongoose - Embedding Related Data lesson you:

Created a schema used to embed review subdocuments in a movie document.

Created routes and a controller for the reviews data resource.

Created UI for creating and displaying the reviews on the show view of a movie.

Wrote a create action that retrieved a movie document, pushed the review (req.body) into the document’s reviews array, saved the movie doc, and redirected back to the show view for that movie.

Similar to what we did in the lesson, in this lab you’ll be adding functionality to the mongoose-flights project you created in the part 1 lab.

The final version of mongoose-flights will be a deliverable, so do each part and don’t fall behind.

## Goal

The goal of this lab is to add the ability to specify a list (array) of destinations for the flight - if the flight is non-stop, then there will be only one destination sub-doc in the array.

Styling is secondary, spend time on it only after the functionality has been implemented.

## Exercises

1. Create a destinationSchema that will provide the structure for destination subdocuments with the following properties:

Property	Type	Validations	Default Value
airport	String	enum to include
‘AUS’, ‘DFW’, ‘DEN’, ‘LAX’ & ‘SAN’
(your choice)	n/a
arrival	Date	n/a	n/a

2. Add the following property to the Flight Model:

Property	Type	Validations	Default Value
destinations	[destinationSchema]	n/a	n/a
Implement the following User Story:
AAU, when viewing the list of flights, I want to click on a “detail” link displayed next to each flight to view all of the properties for that flight (show view)

3. Implement the following User Story:

### AAU, when viewing the details page (show view) for a flight, I want to be able to add a destination for that flight, including its arrival date/time & one of the established airport codes

4. Implement the following User Story:

### AAU, when viewing the details page (show view) for a flight, I want to see a list of that flight’s destinations (airport & arrival)

## Bonuses
1. Sort the list of destinations for a flight by the arrival date/time in ascending order.

2. Style the views.

3. When adding a destination for a flight, exclude the airports listed in the <select> that have already been used by other destinations and/or the flight’s airport.


# Mongoose “Flights” Lab - Part 3

## Intro

Today in the Mongoose - Referencing Related Data lesson you:

Created a Performer Model.

Created a many-to-many relationship, movie >--< performer by adding a cast property in the Movie Model that references performer documents.

Created routes and a controller for the performers data resource.

Implemented functionality for creating performers.

Populated the cast property with performer docs and displayed them with the movie on the movie’s show view.

Implemented functionality for adding performers to a movie’s cast (if the don’t already exist in the cast).

Similar to what we did in the lesson, in this lab you’ll be adding functionality to the mongoose-flights project you created in part 1 and have continued to work on in part 2 of the lab.

The final version of mongoose-flights, as a result of completing parts 1 - 3 of this lab, is a DELIVERABLE.

## Goal

The goal of this lab is to practice referencing related data.

You will add the ability to create tickets for a given flight in the mongoose-flight project.

The relationship between the data entities is:
Flight --< Ticket
A flight has many tickets / A ticket belongs to a flight

Styling is secondary, spend time on it only after the functionality has been implemented.

## Exercises

1. Create a ticketSchema that will be compiled into a Ticket Model with the following properties:

Property	Type	Validations	Default Value
seat	String	Must be ‘A1’ thru ‘F99’ (see hints)	n/a
price	Number	Minimum of 0	n/a
flight	ObjectId	Include ref: 'Flight' to enable population	n/a

### Hints

Notice how we don’t have to use an array to implement the 1:M relationship between Flight and Ticket. Instead, referencing the ObjectId of the flight in the flight property of a ticket enables the relationship. FYI, to implement this 1:M relationship, we could have put a tickets array on the Flight model instead. Yup, unlike M:M relationships, 1:M doesn’t require the use of an array property - just an ObjectId on the “belongs to” side (child side) of the relationship.

Define the seat property as follows:
seat: {type: String, match: /[A-F][1-9]\d?/} - that’s what we call a regular expression that’s being assigned to the match validator. Now for the best part, which just might blow your mind! You ready? Here it is… HTML <input> tags have a pattern attribute that accept a regex pattern; and if what’s typed in the <input> doesn’t match the pattern, the form can’t be submitted! Here’s what your <input> should look like for entering the seat:

 <input name="seat" required pattern="[A-F][1-9]\d?">
That regex pattern will match the following characters:

An A thru F character, followed by
a 1 thru 9 character, followed by
zero or one 0 thru 9 character.
We’ll cover more about regular expressions soon enough in SEI, but this opportunity to preview them was too hard to pass up! Combined with the HTML pattern attribute, they provide an excellent way to perform client-side validation of inputs.

2. Implement the following user story:

### AAU, when viewing the detail page for a flight, I want to view a list of the tickets that have been created for that flight

## Hints

To show a list of tickets that belong to a flight in the flights/show.ejs, the flight controller’s show action is going to have pass that array of tickets to be rendered. This is going to require the show action to make a separate query (inside of the callback of the Flight.findById call) to retrieve the tickets as follows:

 Flight.findById(req.params.id, function(err, flight) {
     Ticket.find({flight: flight._id}, function(err, tickets) {
       // Now you can pass both the flight and tickets in the res.render call
         ...
     });
 });
Note that there’s no reason to populate the flight property because in this case, you already have obtained the flight using Flight.findById.

For future reference though, here’s how to populate a ticket’s flight property:

 Ticket.findById(req.params.id)
   .populate('flight')
   .exec(function(err, ticket) {...

3. Also on the flight’s show view, display a New Ticket link (perhaps styled to look like a button) that when clicked, shows the ticket’s new view used to create a ticket for the flight. When the form is submitted, create the ticket on the server and redirect back to the flight’s show view.

## Hints

To display the view with the form for adding a ticket, the path of the href for the New Ticket link will need to include the flight’s _id. The path should match this route defined on the server: /flights/:id/tickets/new. The req.params.id can now be passed to the tickets/new.ejs and used for the ticket form’s action attribute…

If you use the “proper” route for the ticket form’s action attribute, the ticketsCtrl.create action will have access to the _id of the flight the ticket is being created for - you got this!

In the controller action, there will not be a flight property on the req.body object. You must add that property yourself before using req.body to create the ticket. Failure to do so will result in the ticket being created without a flight property that references the flight it belongs to - so if newly added tickets are not showing up with the flight, this is probably the cause.

## More Hints
Learn it, know it, live it… When adding functionality to the app:
Identify the “proper” Route (Verb + Path)
Create the UI that issues a request that matches that route.
Define the route on the server and map it to a controller action.
Code and export the controller action.
res.render a view in the case of a GET request, or res.redirect if data was changed.

## Bonuses
1. Style the app.

2. Add a feature to delete a flight’s ticket.