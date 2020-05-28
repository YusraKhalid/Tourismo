import React, { Component } from 'react';
import {GuideBookings} from '../api/guide.js';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

class TourGuide extends Component {

    handleAccept(){
        alert("Sure you want to accept") (
            console.log("accepted")
            // Meteor.call('guideBookings.accept', this.id)
        );
    }

    handleReject(){

    }

    renderBookings(){
        const bookings = this.props.guideBookings;
        return(bookings.map((booking)=>{
            return(
                <div className='booking' >
                    destination:<b>{booking.destination}</b> <br/>
                    Days:<b>{booking.days}</b><br/>
                    hours:<b>{booking.hours}</b><br/>
                    Date:<b>{booking.date}</b><br/>
                    departure:<b>{booking.departure}</b><br/>
                    additionalInformation:<b>{booking.additionalInformation}</b><br/>
                    <div className='accept' float='left'>
                        <button type='button' onClick={this.handleAccept.bind(booking)}>Accept Offer</button>
                    </div>
                    {/* <div className='reject' float='right'>
                        <button type='button' onClick={this.handleReject.bind(booking)}>Reject Offer</button>
                    </div> */}
                </div>
            )
        })
        )
    }

    render() {
        //const { url } = this.props.match
        return(
            <div>
                <h1>Tour Guide</h1>
                <ul>
                    {this.renderBookings()}
                </ul>
            </div> 
        )
    };
};
export default withTracker(() => {
    Meteor.subscribe('guideBookings');
    // console.log("sub: ",Meteor.subscribe('Meteor.users'));
    return {
        guideBookings: GuideBookings.find({}, { sort: { createdAt: 1 } }).fetch(),
        // trips: Trips.find({}, { sort: { createdAt: -1 } }).fetch(),
        currentUser: Meteor.user(),
    };
  })(TourGuide);
