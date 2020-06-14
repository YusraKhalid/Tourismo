import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
// import { check } from 'meteor/check';


export const HomeLinks = new Mongo.Collection('homeLinks');

if (Meteor.isServer) {
    // This code only runs on the server
  Meteor.publish('homeLinks', () => {
    if (Roles.userIsInRole(Meteor.userId(), 'guide')){
        return HomeLinks.find({link:"TourGuide"});
    }
    if (Roles.userIsInRole(Meteor.userId(), 'customer')){
        return HomeLinks.find({link:"BookGuide"});
    }
    if (Roles.userIsInRole(Meteor.userId(), 'company')){
        return HomeLinks.find({link:"TripCompany"});
    }
    });

    
}
