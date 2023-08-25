const mongoose = require('mongoose');
const destinationSchema = require('./destinationSchema');
const Ticket = require('./ticketSchema'); 

const flightSchema = new mongoose.Schema({
  airline: {
    type: String,
    enum: ['American', 'Southwest', 'United'],
  },
  airport: {
    type: String,
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
    default: 'DEN',
  },
  flightNo: {
    type: Number,
    required: true,
    min: 10,
    max: 9999,
  },
  departs: {
    type: Date,
    default: () => new Date().setFullYear(new Date().getFullYear() + 1),
  },
  destinations: [destinationSchema],
  tickets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }],
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;