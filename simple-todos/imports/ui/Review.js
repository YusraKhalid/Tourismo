import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Reviews } from '../api/reviews.js';
import classnames from 'classnames';
// Trip component - represents a single trip item

export default class Trip extends Component {
    // toggleChecked() {
    //   Meteor.call('trips.setChecked', this.props.trip._id, !this.props.trip.checked);
    //   }
     
    //   deleteThisTrip() {
    //     Meteor.call('trips.remove', this.props.trip._id);
    //   }
    //   togglePrivate() {
    //     Meteor.call('trips.setPrivate', this.props.trip._id, ! this.props.trip.private);
    //   }
     
  render() {
    // Give trips a different className when they are checked off,
    // so that we can style them nicely in CSS
    const reviewClassName = classnames({
        review: this.props.review
    //   checked: this.props.trip.checked,
    //   private: this.props.trip.private,
    });
    return (
        <li className={reviewClassName}>
        <span className="text">
            <h4>Reviewer: {this.props.review.username}</h4>
            <strong>Rating: </strong> <br/>
                {this.props.review.rating == '1' ? <img width='5%' height='5%' id='star'src='/img/star.png' ></img> : ""}
                {this.props.review.rating == '2' ? <div>
                    <img width='5%' height='5%' id='star'src='/img/star.png' ></img>
                    <img width='5%' height='5%' id='star'src='/img/star.png' ></img>
                    </div> : ""}
                {this.props.review.rating == '3' ? <div>
                    <img width='5%' height='5%' id='star'src='/img/star.png' ></img>
                    <img width='5%' height='5%' id='star'src='/img/star.png' ></img>
                    <img width='5%' height='5%' id='star'src='/img/star.png' ></img>
                    </div> : ""}
                {this.props.review.rating == '4' ? <div>
                    <img width='5%' height='5%' id='star'src='/img/star.png' ></img>
                    <img width='5%' height='5%' id='star'src='/img/star.png' ></img>
                    <img width='5%' height='5%' id='star'src='/img/star.png' ></img>
                    <img width='5%' height='5%' id='star'src='/img/star.png' ></img>
                    </div> : ""}
                {this.props.review.rating == '5' ? <div>
                    <img width='5%' height='5%' id='star'src='/img/star.png' ></img>
                    <img width='5%' height='5%' id='star'src='/img/star.png' ></img>
                    <img width='5%' height='5%' id='star'src='/img/star.png' ></img>
                    <img width='5%' height='5%' id='star'src='/img/star.png' ></img>
                    <img width='5%' height='5%' id='star'src='/img/star.png' ></img>
                    </div> : ""}
            <br/>
            <strong>Review: {this.props.review.remarks} </strong><br/>
        </span>
       </li>
    );
  }
}
