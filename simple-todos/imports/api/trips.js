import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
//*******import {Images} from '../../lib/ImageCollection';
//*******import {BOOK} from '../../lib/ImageCollection';

export const Trips = new Mongo.Collection('trips');

if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish trips that are public or belong to the current user
  Meteor.publish('trips', function tripsPublication() {
    return Trips.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
    });
}
   
Meteor.methods({

    'trips.insert'(destination, days, startDate, endDate, departure, destinationInformation) {
      check(destination, String);
      //check(days, Int);
      //check(startDate, Date);
      //check(endDate, Date);
      check(departure, String);
      check(destinationInformation, String);
      // Make sure the user is logged in before inserting a trip
      if (! this.userId) {
        throw new Meteor.Error('not-authorized');
      }
      Trips.insert({
        destination: destination,
        createdAt: new Date(),
        owner: this.userId,
        username: Meteor.users.findOne(this.userId).username,
        days: days,
        startDate: startDate,
        endDate: endDate,
        departure: departure,
        destinationInformation: destinationInformation,
        /******************image: function (id) {
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