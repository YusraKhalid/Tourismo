import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';


export const GuideBookings = new Mongo.Collection('guideBookings');
export const AcceptedRequests = new Mongo.Collection('acceptedRequests');

if (Meteor.isServer) {
    // This code only runs on the server
  Meteor.publish('guideBookings', () => {
    if (Roles.userIsInRole(Meteor.userId(), 'guide')){
    return GuideBookings.find({
      destination: { $ne: Meteor.users.findOne({_id: Meteor.userId()}).city }
    });
  }
  if (Roles.userIsInRole(Meteor.userId(), 'customer')){
    return GuideBookings.find({
        owner:Meteor.userId()
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

    'guideBookings.book'(guide){
      console.log("GUIDE: ", guide);
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
        pickup: guide.pickup,
        time: guide.time
      })
      return ("Request approved");
      
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
    },

    'guideBookings.matching'(userId){
      const guide = Meteor.users.findOne({_id: userId});
      console.log("user ", guide);
      return(
        GuideBookings.find({destination: guide.city}).fetch()
      )
    }



  });