import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';


export const Trips = new Mongo.Collection('trips');
export const UserTripBookings = new Mongo.Collection('userTripBookings');

if (Meteor.isServer) {
    // This code only runs on the server
    const today = new Date();
  Meteor.publish('trips', () => {
    return Trips.find({},{
      fields: {
        bookings: 0
      }
    });
    });
    Meteor.publish('tripsBookings', () => {
      return Trips.find({
        owner: Meteor.userId()
      });
      });
    Meteor.publish('userTripBookings', () => {
      return UserTripBookings.find({
        customer: Meteor.userId()
      });
      });
}
   
Meteor.methods({

    'trips.findOne'(tripId){
      return (Trips.findOne({_id: new Mongo.ObjectID(tripId)}));
    },
    
    'trips.insert'(trip, image) {
      check(trip.destination, String);
      //check(days, Int);
      //check(startDate, Date);
      //check(endDate, Date);
      check(trip.departure, String);
      check(trip.destinationInformation, String);
      // Make sure the user is logged in before inserting a trip
      if (! this.userId) {
        throw new Meteor.Error('not-authorized');
      }
      if (! Roles.userIsInRole(this.userId, 'company')){
        throw new Meteor.Error('not-authorized');
      }
      console.log("company", Meteor.user({"_id":this.userId}))
      Trips.insert({
        destination: trip.destination,
        createdAt: new Date(),
        owner: this.userId,
        company: Meteor.user({"_id":this.userId}).company,
        days: trip.days,
        startDate: trip.startDate,
        endDate: trip.endDate,
        departure: trip.departure,
        destinationInformation: trip.destinationInformation,
        image: image,
        detail: trip.detail,
        price: trip.price,
        seats: 0,
        bookings: []
      });
    },

    'trips.remove'(tripId) {
      check(tripId, String);
      const trip = Trips.findOne(tripId);
      if (trip.owner !== this.userId) {
        // make sure only the owner can delete it
        throw new Meteor.Error('not-authorized');
      }
      Trips.remove(tripId);
    },

    'trips.book'(tripId, seats){
      if (Roles.userIsInRole(Meteor.userId(), 'customer')){
        const customer = Meteor.users.findOne({_id: Meteor.userId()});
        const trip = Trips.findOne(tripId);
        var bookings = [];
        console.log("prev bookings: ", trip.bookings)
        if (trip.bookings){
          bookings = trip.bookings;
          totalSeats = seats + trip.seats;
        }
          bookings.push({
            customer_id: customer._id,
            customer_name: customer.name,
            customer_phone: customer.phone,
            seats: seats,
          });
        if (!customer.phone){
          throw new Meteor.Error('not-registered', "Phone not found");
          // this.props.history.push('/SignupCustomer');
        }
        console.log("Bookings", bookings);
        Trips.update(tripId, { $set: { bookings: bookings , seats: totalSeats} });
        UserTripBookings.insert({
          customer: Meteor.userId(),
          trip_id: tripId,
          trip_name: trip.destination,
          trip_startDate: trip.startDate,
          seats: seats
        })
        console.log("booked: ", Trips.findOne(tripId));
        return ("Booked");
      }
    },

    'trips.search'(search){
      console.log('tripsearch: ', search);
      const today = new Date();
      console.log("today: ", today);
      if ((search.date)&&(search.location)&&(search.price != 0)){
        console.log("return trip: ", Trips.find({destination:search.location, price: { $lte: search.price }, startDate: { $lte: search.date}, endDate: {$gte: search.date}}).fetch()
        )
        return(
          Trips.find({destination:search.location, price: { $lte: search.price }, startDate: { $lte: search.date}, endDate: {$gte: search.date}}).fetch()
        )
      }
      if ((search.date)&&(search.location)){
        console.log("return trip: ", Trips.find({destination:search.location, startDate: { $lte: search.date}, endDate: {$gte: search.date}}).fetch()
        )

        return(
          Trips.find({destination:search.location, startDate: { $lte: search.date}, endDate: {$gte: search.date}}).fetch()
        )
      }
      if ((search.location)&&(search.price != 0)){
        console.log("return trip: ", Trips.find({destination:search.location, price: { $lte: search.price }}).fetch()
        )

        return(
          Trips.find({destination:search.location, price: { $lte: search.price }}).fetch()
        )
      }
      if ((search.date)&&(search.price != 0)){
        console.log("return trip: ", Trips.find({price: { $lte: search.price }, startDate: { $lte: search.date}, endDate: {$gte: search.date}}).fetch()
        )
        return(
          Trips.find({price: { $lte: search.price }, startDate: { $lte: search.date}, endDate: {$gte: search.date}}).fetch()
        )
      }
      if ((search.date)){
        console.log("return trip: ", Trips.find({ startDate: { $lte: search.date}, endDate: {$gte: search.date}}).fetch()
        )
        return(
          Trips.find({ startDate: { $lte: search.date}, endDate: {$gte: search.date}}).fetch()
        )
      }
      if ((search.location)){
        console.log("return trip: ", Trips.find({destination:search.location}).fetch()
        )
        return(
          Trips.find({destination:search.location}).fetch()
        )
      }
      if ((search.price != 0)){
        console.log("return trip: ", Trips.find({price: { $lte: search.price }}).fetch()
        )
        return(
          Trips.find({price: { $lte: search.price }}).fetch()
        )
      }
      console.log("return trip: ", Trips.find({}).fetch()
      )
      return(
        Trips.find({}).fetch()
      )
    }


  });