import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';


export const Reviews = new Mongo.Collection('reviews');

if (Meteor.isServer) {
    // This code only runs on the server
  Meteor.publish('reviews', () => {
    return Reviews.find({});
    });
}
   
Meteor.methods({
    'reviews.insert'(review){
        console.log(Meteor.userId)
        console.log("inserting: ", review);
        if (review.company){
            Reviews.insert({
                company: review.company,
                rating: review.rating,
                reviewer: Meteor.userId,
                remarks: review.remarks,
                username: Meteor.users.findOne({_id: Meteor.userId()}).username
            });
        }
        if (review.guide) {
            Reviews.insert({
                company: review.company,
                rating: review.rating,
                reviewer: Meteor.userId,
                remarks: review.remarks,
                username: Meteor.users.findOne({_id: Meteor.userId()}).username
            });
        }
    },

    'reviews.delete'(id){
        if (Meteor.userId == Reviews.findOne({_id:id}).reviewer){
            Reviews.remove({_id:id});
        }
    },

    'reviews.companyRate'(companyId){
        // console.log("Company********************************", companyId);
        rates = Reviews.find({company: companyId}).map((company) => { return parseFloat(company.rating); });
        if (rates.length == 0){
            return 0;
        }
        // console.log("review rate^^^^^^^^^^^^^^^^: ", rates);
        const sum = rates.reduce((total, value) => { return total + value; });
        const avg = sum/(rates.length);
        console.log("avg: ", avg);
        return (avg.toFixed(1));
        
    }
  });