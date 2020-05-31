import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';


export const Trips = new Mongo.Collection('trips');

if (Meteor.isServer) {
    // This code only runs on the server
  Meteor.publish('trips', () => {
    return Trips.find({
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
        detail: trip.detail
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
  });