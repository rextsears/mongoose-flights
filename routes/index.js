const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flight');
const ticketsController = require('../controllers/tickets');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Route for displaying the flight creation form
router.get('/flights/new', flightController.displayNewForm);

// Route for handling the form submission for creating a new flight
router.post('/flights', flightController.createFlight);

// Route for displaying the list of all flights
router.get('/flights', flightController.displayAllFlights);

// Route for displaying flight details
router.get('/flights/:id', flightController.displayFlightDetails);

// Route for adding a destination to a flight
router.post('/flights/:id/destinations', flightController.addDestination);

// Route to show the form for creating a new ticket
router.get('/flights/:id/tickets/new', ticketsController.new);

// Route to handle the creation of a new ticket
router.post('/flights/:id/tickets', ticketsController.create);

module.exports = router;