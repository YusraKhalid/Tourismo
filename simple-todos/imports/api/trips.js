import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';


export const Trips = new Mongo.Collection('trips');

if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish trips that are public or belong to the current user
  Meteor.publish('trips', () => {
    return Trips.find({
      // $or: [
      //   { private: { $ne: true } },
      //   { owner: this.userId },
      // ],
    });
    });
}
   
Meteor.methods({

    'trips.findOne'(tripId){
      console.log(Trips.find({ _id: new Mongo.ObjectID(toString(tripId)) }));
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
        // username: trip.userId, //Meteor.users.findOne(this.userId).username,
        days: trip.days,
        startDate: trip.startDate,
        endDate: trip.endDate,
        departure: trip.departure,
        destinationInformation: trip.destinationInformation,
        image: image,
        detail: trip.detail
        /*function (id) {
          // console.log(id);
          var imageBook = Images.findOne({_id:id});
          // console.log("img: "+imageBook);
          var imageUrl = imageBook.url();
          return imageUrl; // Where Images is an FS.Collection instance
      }*/
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

    // can be used for filtering of trips
    'trips.setChecked'(tripId, setChecked) {
      check(tripId, String);
      check(setChecked, Boolean);
      const trip = Trips.findOne(tripId);
      if (trip.private && trip.owner !== this.userId) {
        // If the trip is private, make sure only the owner can check it off
        throw new Meteor.Error('not-authorized');
      }
      Trips.update(tripId, { $set: { checked: setChecked } });
    },

    'trips.setPrivate'(tripId, setToPrivate) {
        check(tripId, String);
        check(setToPrivate, Boolean);    
        const trip = Trips.findOne(tripId);
        // Make sure only the trip owner can make a trip private
        if (trip.owner !== this.userId) {
          throw new Meteor.Error('not-authorized');
        }
        Trips.update(tripId, { $set: { private: setToPrivate } });
      },
  });