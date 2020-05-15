import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

if (Meteor.isServer) {
// This code only runs on the server
// Only publish trips that are public or belong to the current user
    Meteor.publish('Meteor.users.age', function ({ userIds }) {
        // Validate the arguments to be what we expect
        new SimpleSchema({
        userIds: { type: [String] }
        }).validate({ userIds });
    
        // Select only the users that match the array of IDs passed in
        const selector = {
            _id: { $in: userIds }
        };
    
        // Only return one field
        const options = {
            fields: { age: 1 }
        };
        return Meteor.users.find(selector, options, role);
    });

    // Meteor.publish('role',() => {
    //     if (Roles.userIsInRole(Meteor.user(), 'customer')){
    //         return 'customer'
    //     }
    //     else if (Roles.userIsInRole(Meteor.user(), 'company')){
    //         return 'company'
    //     }
    //     else if (Roles.userIsInRole(Meteor.user(), 'guide')){
    //         return 'guide'
    //     }
    // })
}

Meteor.methods({

    'user.addFields'(userId, fields){
        console.log("user who sent data: ", Meteor.userId())
        console.log("**********", userId, fields);
        if (Roles.userIsInRole(userId, 'company')){
            Meteor.users.update(userId, {
                $set: {
                name: fields.name,
                phone: fields.phone,
                address: fields.address,
                cnic: fields.cnic,
                link: fields.link,
                company: fields.company,
                city: fields.city,
                license: fields.license,
                }
            });
        }
        if (Roles.userIsInRole(userId, 'customer')){
            Meteor.users.update(userId, {
                $set: {
                name: fields.name,
                phone: fields.phone,
                age: fields.age,
                cnic: fields.cnic,
                city: fields.city,
                }
            });
        }
        if (Roles.userIsInRole(userId, 'guide')){
            Meteor.users.update(userId, {
                $set: {
                name: fields.name,
                age: fields.age,
                phone: fields.phone,
                address: fields.address,
                cnic: fields.cnic,
                expertise: fields.expertise,
                city: fields.city,
                experience: fields.experience,
                }
            });
        }
    },

    'user.role'(userId, role){
        console.log("user.role:     ",userId, role);
        if (Meteor.isServer) {
            Roles.addUsersToRoles(userId, role, null);
        }
    },

    'user.checkrole'(userId, role){
        console.log("checkuser: ", userId, role);
        const check = Roles.userIsInRole(userId, role);
        console.log("check", check);
        return check;
    },

    // 'user.username'(userId){
    //     const username = Meteor.user({"'_id":userId}).username;
    //     console.log('username', username);
    //     return username;
    // }
})