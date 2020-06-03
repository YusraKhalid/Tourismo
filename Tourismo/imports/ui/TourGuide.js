import React, { Component } from 'react';
import {GuideBookings, AcceptedRequests} from '../api/guide.js';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Account from './Account';
import { render } from 'react-dom';
import {HomeLinks} from '../api/home.js'


class TourGuide extends Component {

    handleAccept(){
        alert("Sure you want to accept") (
            console.log("accepted", this._id),
            Meteor.call('guideBookings.accept', this._id)
        );
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
                </div>
            )
        })
        )
    }

    renderAcceptedRequests(){
        const acceptedRequests = this.props.acceptedRequests;
        return(acceptedRequests.map((acceptedRequest)=>{
            return(
                <div className='acceptedRequest' >
                    Your Request you accepted is by <b>{acceptedRequest.customer_name}</b><br/>
                    The Contact Number is <b>{acceptedRequest.customer_phone}</b><br/>
                    For the following booking<br/>
                    <div>
                    destination:<b>{acceptedRequest.destination}</b> <br/>
                    Days:<b>{acceptedRequest.days}</b><br/>
                    hours:<b>{acceptedRequest.hours}</b><br/>
                    Date:<b>{acceptedRequest.date}</b><br/>
                    departure:<b>{acceptedRequest.departure}</b><br/>
                    additionalInformation:<b>{acceptedRequest.additionalInformation}</b><br/>
                    </div>
                </div>
            )
        })
        )
    }

    render() {
        render(<div>
            <Account /><br/>
            </div>,
            document.getElementById('signin')
            );
        const requiredLink = this.props.homeLink;
        if (requiredLink){
            render(<li><a href={'../'+requiredLink.link}>{requiredLink.text}</a></li>,
                document.getElementById('link')
                );
        }
        document.getElementById('only-home').innerHTML = '<span></span>';
        return(
            <div>
                <h1>Tour Guide</h1>
                <center><h3>The requests you accepted</h3></center>
                <ul>
                    {this.renderAcceptedRequests()}
                </ul>
                <center><h3>The requests Available</h3></center>
                <ul>
                    {this.renderBookings()}
                </ul>
                <div className='clear-end'></div>
            </div> 
        )
    };
};
export default withTracker(() => {
    Meteor.subscribe('guideBookings');
    Meteor.subscribe('acceptedRequests');
    Meteor.subscribe('homeLinks');
    return {
        homeLink: HomeLinks.findOne({}),
        guideBookings: GuideBookings.find({owner: { $ne: Meteor.userId() }}, { sort: { createdAt: 1 } }).fetch(),
        acceptedRequests: AcceptedRequests.find({}, { sort: { createdAt: 1 } }).fetch(),
        currentUser: Meteor.user(),
    };
  })(TourGuide);
