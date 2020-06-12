// import { Meteor } from 'meteor/meteor';
// import { Mongo } from 'meteor/mongo';
// import { check } from 'meteor/check';


// export const TripBookings = new Mongo.Collection('tripBookings');
// // export const AcceptedRequests = new Mongo.Collection('acceptedRequests');

// if (Meteor.isServer) {
//     // This code only runs on the server
//   Meteor.publish('tripBookings', () => {
//     if (Roles.userIsInRole(Meteor.userId(), 'company')){
//       return TripBookings.find({
//       });
//     }
//     if (Roles.userIsInRole(Meteor.userId(), 'customer')){
//       return TripBookings.find({
//           owner:Meteor.userId()
//       });
//     }
//   });
// }
// if (Meteor.isServer) {
//   Meteor.publish('acceptedRequests', () => {
//     if (Roles.userIsInRole(Meteor.userId(), 'guide')){
//       console.log("Accepted at server", GuideBookings.find({guide_id: Meteor.userId()}));
//       return AcceptedRequests.find({
//         guide_id: Meteor.userId()});
//     }
//     if (Roles.userIsInRole(Meteor.userId(), 'customer')){
//       return AcceptedRequests.find({
//         customer_id:Meteor.userId()});
//     }
//     });
// }
   
// Meteor.methods({

//     'guideBookings.book'(guide){
//       // Make sure the user is logged in before inserting a trip
//       if (! Meteor.userId()) {
//         throw new Meteor.Error('not-authorized');
//       }
//       if (! Roles.userIsInRole(Meteor.userId(), 'customer')){
//         throw new Meteor.Error('not-authorized');
//       }
//       // console.log("company", Meteor.user({"_id":this.userId}))
//       console.log("GUIDE: ", guide);
//       GuideBookings.insert({
//         destination: guide.destination,
//         createdAt: new Date(),
//         owner: Meteor.userId(),
//         days: guide.days,
//         hours: guide.hours,
//         date: guide.date,
//         departure: guide.departure,
//         additionalInformation: guide.additionalInformation,
//       },function(){
//                     return ("Request approved");
//                   });
//     },

//     'guideBookings.remove'(bookingId) {
//       check(bookingId, String);
//       const booking = GuideBookings.findOne(bookingId);
//       if (booking.owner !== Meteor.userId()) {
//         // make sure only the owner can delete it
//         throw new Meteor.Error('not-authorized');
//       }
//       GuideBookings.remove(bookingId);
//     },

//     'guideBookings.accept'(bookingId) {
//       const booking = GuideBookings.findOne(bookingId);
//       const guide = Meteor.users.findOne({_id: Meteor.userId()});
//       const customer = Meteor.users.findOne({_id: booking.owner})
//       if (booking){
//         AcceptedRequests.insert({
//           request: 'accepted',
//           guide_id: guide._id,
//           guide_name: guide.name,
//           guide_phone: guide.phone,
//           guide_age: guide.age,
//           guide_cnic: guide.cnic,
//           guide_city: guide.city,
//           customer_id: booking.owner,
//           customer_name: customer.name,
//           customer_phone: customer.phone,
//           destination: booking.destination,
//           date: booking.date,
//           days: booking.days,
//           hours: booking.hours,
//           departure: booking.departure,
//           additionalInformation: booking.additionalInformation
//         },
//         GuideBookings.remove(bookingId)
//       );
//       }
//       console.log("Booking updated", AcceptedRequests);
//     }
//   });

{/* <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js" integrity="sha256-pQBbLkFHcP1cy0C8IhoSdxlm0CtcH5yJ2ki9jjgR03c=" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/owl-carousel/1.3.3/owl.carousel.min.js" integrity="sha256-4OK8Th0+5QJMThqlimytmqQvxjqMic4YATocjyuUh1w=" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.7/jquery.fancybox.min.js" integrity="sha256-yt2kYMy0w8AbtF89WXb2P1rfjcP/HTHLT7097U8Y5b8=" crossorigin="anonymous"></script>
<script src="./dist/js/animsition.min.js"></script>  */}

{/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.0/animate.min.css" integrity="sha256-6hqHMqXTVEds1R8HgKisLm3l/doneQs+rS1a5NLmwwo=" crossorigin="anonymous" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/owl-carousel/1.3.3/owl.carousel.css" integrity="sha256-Tcd+6Q3CIltXsx0o/gYhPNbEkb3HJJpucOvQA7csVwI=" crossorigin="anonymous" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery.fancytree/2.35.0/skin-awesome/ui.fancytree.min.css" integrity="sha256-CWXSK+Eq2EkiGqIp23eebieR1dkqBZ6MCUu+Kai4cTU=" crossorigin="anonymous" />
  <link rel="stylesheet" href="./dist/css/animsition.min.css">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
  <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet"></link> */}