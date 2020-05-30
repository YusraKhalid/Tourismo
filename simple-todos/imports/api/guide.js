import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';


export const GuideBookings = new Mongo.Collection('guideBookings');
export const AcceptedRequests = new Mongo.Collection('acceptedRequests');

if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish trips that are public or belong to the current user
  Meteor.publish('guideBookings', () => {
    if (Roles.userIsInRole(Meteor.userId(), 'guide')){
    return GuideBookings.find({
      // $or: [
      //   { private: { $ne: true } },
      //   { owner: this.userId },
      // ],
    });
  }
  if (Roles.userIsInRole(Meteor.userId(), 'customer')){
    return GuideBookings.find({
        owner:Meteor.userId()
      // $or: [
      //   { private: { $ne: true } },
      //   { owner: this.userId },
      // ],
    });
  }
    });
}
if (Meteor.isServer) {
  Meteor.publish('acceptedRequests', () => {
    if (Roles.userIsInRole(Meteor.userId(), 'guide')){
      console.log("Accepted at server", GuideBookings.find({guide_id: Meteor.userId()}));
      return AcceptedRequests.find({
        guide_id: Meteor.userId()});
    }
    if (Roles.userIsInRole(Meteor.userId(), 'customer')){
      return AcceptedRequests.find({
        customer_id:Meteor.userId()});
    }
    });
}
   
Meteor.methods({

    // 'trips.findOne'(tripId){
    //   console.log(Trips.find({ _id: new Mongo.ObjectID(toString(tripId)) }));
    //   return (Trips.findOne({_id: new Mongo.ObjectID(tripId)}));
    // },
    
    'guideBookings.book'(guide){
      // Make sure the user is logged in before inserting a trip
      if (! Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }
      if (! Roles.userIsInRole(Meteor.userId(), 'customer')){
        throw new Meteor.Error('not-authorized');
      }
      // console.log("company", Meteor.user({"_id":this.userId}))
      console.log("GUIDE: ", guide);
      GuideBookings.insert({
        destination: guide.destination,
        createdAt: new Date(),
        owner: Meteor.userId(),
        days: guide.days,
        hours: guide.hours,
        date: guide.date,
        departure: guide.departure,
        additionalInformation: guide.additionalInformation,
      },function(){
                    return ("Request approved");
                  });
    },

    'guideBookings.remove'(bookingId) {
      check(bookingId, String);
      const booking = GuideBookings.findOne(bookingId);
      if (booking.owner !== Meteor.userId()) {
        // make sure only the owner can delete it
        throw new Meteor.Error('not-authorized');
      }
      GuideBookings.remove(bookingId);
    },

    'guideBookings.accept'(bookingId) {
      const booking = GuideBookings.findOne(bookingId);
      const guide = Meteor.users.findOne({_id: Meteor.userId()});
      const customer = Meteor.users.findOne({_id: booking.owner})
      console.log("guide", guide);
      console.log("customer", customer);
      console.log("booking", booking);
      if (booking){
        AcceptedRequests.insert({
          request: 'accepted',
          guide_id: guide._id,
          guide_name: guide.name,
          guide_phone: guide.phone,
          guide_age: guide.age,
          guide_cnic: guide.cnic,
          guide_city: guide.city,
          customer_id: booking.owner,
          customer_name: customer.name,
          customer_phone: customer.phone,
          destination: booking.destination,
          date: booking.date,
          days: booking.days,
          hours: booking.hours,
          departure: booking.departure,
          additionalInformation: booking.additionalInformation
        },
        GuideBookings.remove(bookingId)
      );
      }
      console.log("Booking updated", AcceptedRequests);
    }

    // can be used for filtering of trips
    // 'trips.setChecked'(tripId, setChecked) {
    //   check(tripId, String);
    //   check(setChecked, Boolean);
    //   const trip = Trips.findOne(tripId);
    //   if (trip.private && trip.owner !== this.userId) {
    //     // If the trip is private, make sure only the owner can check it off
    //     throw new Meteor.Error('not-authorized');
    //   }
    //   Trips.update(tripId, { $set: { checked: setChecked } });
    // },

    // 'trips.setPrivate'(tripId, setToPrivate) {
    //     check(tripId, String);
    //     check(setToPrivate, Boolean);    
    //     const trip = Trips.findOne(tripId);
    //     // Make sure only the trip owner can make a trip private
    //     if (trip.owner !== this.userId) {
    //       throw new Meteor.Error('not-authorized');
    //     }
    //     Trips.update(tripId, { $set: { private: setToPrivate } });
    //   },
  });